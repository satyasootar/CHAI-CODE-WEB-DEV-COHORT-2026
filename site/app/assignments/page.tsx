
import { getAssignments } from "@/lib/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

export default async function AssignmentsPage() {
  const assignments = await getAssignments();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">Projects and UI challenges completed during the cohort.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.slug} className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
            {assignment.image && (
              <div className="w-full aspect-video relative overflow-hidden border-b bg-muted">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img 
                  src={assignment.image} 
                  alt={assignment.title} 
                  className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-1">{assignment.title}</CardTitle>
              <CardDescription>
                {assignment.slug}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
               <p className="text-sm text-muted-foreground line-clamp-3">
                 {/*  Ideally extract description from README, for now just placeholder or title */}
                 Review `Question.md` for requirements and `Submission.md` for output.
               </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              {assignment.liveLink ? (
                <Button asChild size="sm" className="w-full">
                  <Link href={assignment.liveLink} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              ) : (
                <Button disabled size="sm" className="w-full" variant="secondary">
                  No Live Link
                </Button>
              )}
               {/* Assuming GH repo is same for all, deep link logic could be complex without specific URL. 
                   For now, maybe just link to root or specific folder if possible? 
                   We don't have the GH URL easily available unless we parse it or hardcode it.
                */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
