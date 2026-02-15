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
            <Card className="h-full hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Folder className="h-5 w-5 text-primary" />
                  <span>{lab.name}</span>
                </CardTitle>
                <CardDescription>
                  {lab.files.length} exercises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  View exercises in this category <ArrowRight className="inline-block ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
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
