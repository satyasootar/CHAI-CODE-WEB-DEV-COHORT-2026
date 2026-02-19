
import { getLabContent, getLabs } from "@/lib/data";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileCode } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    category: string;
    file: string;
  }>;
}

export const revalidate = 3600;

export default async function LabFilePage(props: PageProps) {
    const params = await props.params; // Await params
    const { category, file } = params;
    const content = await getLabContent(category, file);

    if (content.startsWith('// Error')) {
        notFound();
    }

  return (
    <div className="space-y-6 container max-w-5xl mx-auto mt-30">
      <div className="flex flex-col space-y-4">
         <Link href={`/labs/${category}`} className="text-muted-foreground hover:text-primary flex items-center text-sm">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to {category}
        </Link>
        <div className="flex items-center space-x-3">
             <div className="p-2 bg-primary/10 rounded-md">
                <FileCode className="h-6 w-6 text-primary" />
             </div>
            <h1 className="text-2xl font-bold tracking-tight">{file}</h1>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border bg-[#1e1e1e] shadow-lg">
        <div className="border-b border-white/10 px-4 py-2 bg-white/5 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">JavaScript</span>
        </div>
        <div className="overflow-x-auto text-sm">
            <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
                showLineNumbers={true}
                wrapLines={true}
            >
                {content}
            </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const labs = await getLabs();
  const params = [];
  for (const lab of labs) {
    for (const file of lab.files) {
      params.push({ category: lab.name, file });
    }
  }
  return params;
}
