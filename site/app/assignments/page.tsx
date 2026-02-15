import { getAssignments } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react"; // Import Github icon if available, or use logic
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export default async function AssignmentsPage() {
  const assignments = await getAssignments();

  return (
    <div className="space-y-8 pt-32">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground max-w-2xl">
          A showcase of practical projects built during the cohort, ranging from UI implementations to full-stack applications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="flex flex-col h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-white/5 bg-card/50 backdrop-blur-sm group">
            <div className="relative w-full aspect-video bg-muted/30 overflow-hidden border-b border-white/5">
              {assignment.screenshot ? (
                <img
                  src={assignment.screenshot}
                  alt={assignment.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-muted-foreground/20">
                   <div className="text-6xl font-bold opacity-10 uppercase tracking-widest">{assignment.title.substring(0,2)}</div>
                </div>
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
            </div>
            
            <CardHeader className="pb-3 pt-6">
              <CardTitle className="text-xl font-bold tracking-tight line-clamp-1">{assignment.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 pb-6">
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {assignment.description || "Project submission focusing on modern web development practices and clean code architecture."}
              </p>
            </CardContent>
            
            <CardFooter className="pt-0">
              {assignment.liveLink ? (
                <Button asChild className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium border border-primary/20 shadow-none hover:shadow-sm transition-all">
                  <Link href={assignment.liveLink} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Preview
                  </Link>
                </Button>
              ) : (
                 <Button variant="secondary" className="w-full opacity-50 cursor-not-allowed">
                    Preview Unavailable
                 </Button>
              )}
            </CardFooter>
          </Card>
        ))}
        {assignments.length === 0 && (
          <div className="col-span-full text-center py-20 text-muted-foreground/50 border border-dashed rounded-lg">
            No assignments found.
          </div>
        )}
      </div>
    </div>
  );
}
