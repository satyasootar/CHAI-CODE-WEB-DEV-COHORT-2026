
"use client";

import { useState } from "react";
import { Lab } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileCode, Folder, ChevronRight, Play } from "lucide-react";
// import { cn } from "@/lib/utils";

interface LabsViewerProps {
  labs: Lab[];
}

export function LabsViewer({ labs }: LabsViewerProps) {
  const [selectedLabIndex, setSelectedLabIndex] = useState(0);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  const currentLab = labs[selectedLabIndex];
  const currentFile = currentLab?.files[selectedFileIndex];

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Sidebar */}
      <Card className="w-80 flex flex-col h-full border-r">
        <CardHeader className="pb-4 border-b">
          <CardTitle className="text-lg">JS Labs</CardTitle>
          <CardDescription>Select a lab to view code</CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-1 p-2">
            {labs.map((lab, labIndex) => (
              <div key={lab.slug} className="group">
                <Button
                  variant={selectedLabIndex === labIndex ? "secondary" : "ghost"}
                  className="w-full justify-start font-normal text-sm"
                  onClick={() => {
                    setSelectedLabIndex(labIndex);
                    setSelectedFileIndex(0);
                  }}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  <span className="truncate">{lab.title}</span>
                  {selectedLabIndex === labIndex && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                </Button>
                
                {/* Nested files if lab is selected */}
                {selectedLabIndex === labIndex && (
                    <div className="ml-4 pl-2 border-l border-muted-foreground/20 mt-1 space-y-1">
                        {lab.files.map((file, fileIndex) => (
                            <Button
                                key={file.name}
                                variant={selectedFileIndex === fileIndex ? "secondary" : "ghost"}
                                size="sm"
                                className="w-full justify-start h-8 text-xs font-normal"
                                onClick={() => setSelectedFileIndex(fileIndex)}
                            >
                                <FileCode className="mr-2 h-3 w-3 text-muted-foreground" />
                                <span className="truncate">{file.name}</span>
                            </Button>
                        ))}
                    </div>
                )}
              </div>
            ))}
          </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Main Content (Code Viewer) */}
      <Card className="flex-1 flex flex-col overflow-hidden h-full">
        <CardHeader className="border-b py-4 flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-xl flex items-center gap-2">
                    <FileCode className="h-5 w-5 text-primary" />
                    {currentFile?.name || "No file selected"}
                </CardTitle>
                <CardDescription className="mt-1">
                    {currentLab?.title}
                </CardDescription>
            </div>
            
             {/* Copy button or Run button could go here */}
            {currentFile && (
                <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(currentFile.content)}>
                   Copy Code
                </Button>
            )}
        </CardHeader>
        <CardContent className="p-0 flex-1 bg-muted/30 overflow-hidden relative group">
           {currentFile ? (
             <ScrollArea className="h-full w-full">
                <pre className="p-6 text-sm font-mono overflow-auto">
                    <code>{currentFile.content}</code>
                </pre>
             </ScrollArea>
           ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    Select a file to view content
                </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
