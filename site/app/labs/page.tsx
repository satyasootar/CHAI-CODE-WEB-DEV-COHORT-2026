import { getLabs } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Folder, ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600;

export default async function LabsPage() {
  const labs = await getLabs();

  return (
    <div className="space-y-8 pt-32">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">JavaScript Labs</h1>
        <p className="text-muted-foreground">
          Practice exercises and logic building challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <Link href={`/labs/${lab.name}`} key={lab.name} className="group">
            <Card className="h-full border-white/5 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300 gap-0">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="flex items-center gap-3 text-xl group-hover:text-primary transition-colors">
                  <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                    <Folder className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-semibold">{lab.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <CardDescription className="mb-4 text-base">
                  {lab.files.length} exercises available
                </CardDescription>
                <div className="text-sm font-medium text-primary flex items-center">
                  View exercises <ArrowRight className="inline-block ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
         {labs.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No labs found.
          </div>
        )}
      </div>
    </div>
  );
}
