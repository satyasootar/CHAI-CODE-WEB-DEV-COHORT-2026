
import { getLabs } from "@/lib/api";
import { LabsViewer } from "@/components/labs-viewer";

export default async function LabsPage() {
  const labs = await getLabs();

  return (
    <div className="h-full flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">JavaScript Labs</h1>
        <p className="text-muted-foreground">
            Algorithm challenges and logic building exercises.
        </p>
      </div>

      <div className="flex-1">
        {labs.length > 0 ? (
            <LabsViewer labs={labs} />
        ) : (
            <div className="p-12 text-center border rounded-lg bg-muted/10 border-dashed">
                <p className="text-muted-foreground">No labs found in the repository.</p>
            </div>
        )}
      </div>
    </div>
  );
}
