
import { getBlogContent } from "@/lib/api";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from "@/components/ui/card";

export default async function BlogsPage() {
  const content = await getBlogContent();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Technical Blogs</h1>
        <p className="text-muted-foreground">Deep dives and learnings.</p>
      </div>

      <Card>
        <CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
          {/* 
            Rendering the README content directly. 
            Since the README has some HTML and specific layouts, `react-markdown` might get tricky with raw HTML.
            But for standard markdown it should work well. 
          */}
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Customize components if needed
              img: (props) => (
                // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                <img {...props} className="rounded-lg border shadow-sm mx-auto" style={{maxWidth: '100%'}} />
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
}
