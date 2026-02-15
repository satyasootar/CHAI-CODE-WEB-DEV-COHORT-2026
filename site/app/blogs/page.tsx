import { getBlogs } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600;

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-8">
       <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Technical Blogs</h1>
        <p className="text-muted-foreground">
          Deep dives into web technologies, protocols, and developer tools.
        </p>
      </div>

      <div className="grid gap-4">
        {blogs.map((blog, index) => (
          <Card key={index} className="hover:border-primary/50 transition-colors">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4">
              <div className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {blog.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {blog.description}
                </CardDescription>
              </div>
              <Button asChild variant="outline" className="shrink-0">
                <Link href={blog.link} target="_blank">
                  Read on Dev.to <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
         {blogs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No blogs found.
          </div>
        )}
      </div>
    </div>
  );
}
