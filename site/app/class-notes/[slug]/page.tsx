import { getClassNote, getClassNotes } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600;

export default async function ClassNotePage(props: PageProps) {
    const params = await props.params;
  const { slug } = params;
  const note = await getClassNote(slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col space-y-4">
        <Link href="/class-notes" className="text-muted-foreground hover:text-primary flex items-center text-sm w-fit">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Notes
        </Link>
        <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{note.title}</h1>
        </div>
      </div>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}: any) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={`${className} bg-muted px-1.5 py-0.5 rounded text-sm`} {...props}>
                  {children}
                </code>
              )
            },
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 border-b pb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 mb-4" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 mb-4" {...props} />,
            a: ({node, ...props}) => <a className="text-primary underline underline-offset-4 hover:no-underline" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />,
            table: ({node, ...props}) => <div className="overflow-x-auto my-6"><table className="w-full border-collapse text-sm" {...props} /></div>,
            th: ({node, ...props}) => <th className="border border-border bg-muted px-4 py-2 text-left font-bold" {...props} />,
            td: ({node, ...props}) => <td className="border border-border px-4 py-2" {...props} />,
          }}
        >
          {note.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const notes = await getClassNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}
