
import { getClassNotes } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, ChevronRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600;

export default async function ClassNotesPage() {
  const notes = await getClassNotes();

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Class Notes</h1>
        <p className="text-muted-foreground">
          Detailed notes and summaries from the cohort sessions.
        </p>
      </div>

      <div className="grid gap-4">
        {notes.map((note) => (
          <Link href={`/class-notes/${note.slug}`} key={note.slug} className="group">
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                   <div className="p-2 bg-secondary rounded-full">
                      <Book className="h-5 w-5 text-secondary-foreground" />
                   </div>
                   <div>
                      <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">{note.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {note.content.slice(0, 100).replace(/[#*`]/g, '')}...
                      </p>
                   </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
        ))}
         {notes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No class notes found.
          </div>
        )}
      </div>
    </div>
  );
}
