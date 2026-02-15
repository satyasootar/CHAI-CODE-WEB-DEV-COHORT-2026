import { getAssignments } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export default async function AssignmentsPage() {
  const assignments = await getAssignments();

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">
          A collection of projects and UI replications completed during the cohort.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
            {assignment.screenshot && (
              <div className="relative w-full h-48 bg-muted overflow-hidden">
                <img
                  src={assignment.screenshot}
                  alt={assignment.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{assignment.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">
                {assignment.liveLink ? "Completed project with live demo." : "Project submission."}
              </p>
            </CardContent>
            <CardFooter>
              {assignment.liveLink ? (
                <Button asChild className="w-full">
                  <Link href={assignment.liveLink} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              ) : (
                <Button variant="secondary" disabled className="w-full">
                  No Live Link
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
        {assignments.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No assignments found.
          </div>
        )}
      </div>
    </div>
  );
}
