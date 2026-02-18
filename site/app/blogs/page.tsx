import { getBlogs } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600;

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-8 pt-32">
       <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Technical Blogs</h1>
        <p className="text-muted-foreground max-w-2xl">
          Deep dives into web technologies, protocols, and developer tools, fetched directly from Dev.to.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link key={blog.id} href={blog.url} target="_blank" className="block h-full group">
            <Card className="flex flex-col h-full overflow-hidden rounded-2xl border-white/5 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
                {/* Cover Image */}
                <div className="relative w-full aspect-video bg-muted/30 p-4">
                {blog.cover_image ? (
                    <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="object-cover w-full h-full rounded-xl"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-secondary/20">
                        <BookOpen className="h-12 w-12 text-muted-foreground/20" />
                    </div>
                )}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
                
                {/* Reading Time and Date Badge */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-md text-[10px] font-normal flex items-center gap-1 border-white/10 text-white shadow-sm">
                        <Clock className="h-3 w-3" /> {blog.reading_time_minutes} min
                    </Badge>
                </div>
                </div>

                <CardHeader className="pb-2 pt-5 space-y-2">
                <div className="flex flex-wrap gap-2 mb-1">
                    {blog.tag_list.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0 h-5 border-primary/20 text-primary/80 bg-primary/5">
                            #{tag}
                        </Badge>
                    ))}
                </div>
                <CardTitle className="text-xl font-bold tracking-tight line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {blog.title}
                </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {blog.description}
                </p>
                </CardContent>
                
                <CardFooter className="pt-0 pb-5 text-xs text-muted-foreground flex items-center gap-2 border-t border-white/5 mt-auto pt-4 mx-6 px-0">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </CardFooter>
            </Card>
          </Link>
        ))}
         {blogs.length === 0 && (
          <div className="col-span-full text-center py-20 text-muted-foreground/50 border border-dashed rounded-lg bg-card/50">
            No blogs found. Check API key configuration.
          </div>
        )}
      </div>
    </div>
  );
}
