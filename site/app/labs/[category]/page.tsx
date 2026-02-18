import { getLabs } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCode, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export const revalidate = 3600;

export default async function LabCategoryPage(props: PageProps) {
    const params = await props.params;
  const labs = await getLabs();
  const lab = labs.find((l) => l.name === params.category);

  if (!lab) {
    notFound();
  }

  return (
    <div className="space-y-8 pt-32">
       <div className="flex flex-col space-y-4">
        <Link href="/labs" className="text-muted-foreground hover:text-primary flex items-center text-sm transition-colors w-fit">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Labs
        </Link>
        <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent w-fit">
                {lab.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </h1>
            <p className="text-muted-foreground text-lg">
            Select an exercise to view the code.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lab.files.map((file) => (
          <Link href={`/labs/${lab.name}/${file}`} key={file} className="group">
            <Card className="hover:border-primary/50 transition-all duration-300 border-white/5 bg-card/50 backdrop-blur-sm hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 rounded-md bg-blue-500/10 shrink-0">
                    <FileCode className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="font-medium truncate text-foreground/80 group-hover:text-foreground transition-colors">{file}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const labs = await getLabs();
  return labs.map((lab) => ({
    category: lab.name,
  }));
}
