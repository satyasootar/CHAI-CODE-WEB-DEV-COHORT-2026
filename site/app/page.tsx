
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, BookOpen, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 pt-12 pb-8">
      <section className="flex flex-col items-center space-y-6 text-center max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
          Web Dev Cohort Journey
        </h1>
        <p className="text-xl text-muted-foreground">
          Documenting my learning process, assignments, and experiments in full-stack web development.
        </p>
        <div className="flex space-x-4 pt-4">
          <Button asChild size="lg">
            <Link href="/assignments">View Assignments</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com/satyasootar" target="_blank">
              GitHub Profile
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8">
        <Link href="/assignments" className="group">
          <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Layers className="h-24 w-24" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Layers className="h-6 w-6 text-primary" />
                <span>Assignments</span>
              </CardTitle>
              <CardDescription>
                Showcase of completed projects and UI replications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Explore landing pages, dashboards, and interactive UI components built with HTML, CSS, and React.
              </p>
              <span className="text-primary font-medium flex items-center group-hover:underline">
                Browse Projects <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/labs" className="group">
          <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Code className="h-24 w-24" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Code className="h-6 w-6 text-primary" />
                <span>JS Labs</span>
              </CardTitle>
              <CardDescription>
                JavaScript logic building and problem solving.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Collection of JavaScript exercises covering conditionals, loops, data types, and algorithms.
              </p>
              <span className="text-primary font-medium flex items-center group-hover:underline">
                View Code <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/blogs" className="group">
          <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <BookOpen className="h-24 w-24" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <BookOpen className="h-6 w-6 text-primary" />
                <span>Technical Blogs</span>
              </CardTitle>
              <CardDescription>
                Deep dives into web technologies and internals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Articles on Git, Networking, Browser Internals, and more technical concepts.
              </p>
              <span className="text-primary font-medium flex items-center group-hover:underline">
                Read Articles <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </section>
    </div>
  );
}
