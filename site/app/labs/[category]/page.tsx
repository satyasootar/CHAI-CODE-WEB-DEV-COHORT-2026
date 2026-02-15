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
    <div className="space-y-8">
       <div className="flex flex-col space-y-4">
        <Link href="/labs" className="text-muted-foreground hover:text-primary flex items-center text-sm">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Labs
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{lab.name}</h1>
        <p className="text-muted-foreground">
          Select an exercise to view the code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lab.files.map((file) => (
          <Link href={`/labs/${lab.name}/${file}`} key={file} className="group">
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <FileCode className="h-5 w-5 text-blue-500 shrink-0" />
                  <span className="font-medium truncate">{file}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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
