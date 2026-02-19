"use client";

import { ClientTweetCard } from "@/components/ui/client-tweet-card";
import { FadeInItem, StaggerContainer } from "@/components/ui/fade-in";
import { useEffect, useState } from "react";

interface TweetGridProps {
  tweetIds: string[];
}

export function TweetGrid({ tweetIds }: TweetGridProps) {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) setColumns(3);      // lg
      else if (window.innerWidth >= 768) setColumns(2);  // md
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Sort tweets newest first
  const sortedTweets = [...tweetIds].sort((a, b) => b.localeCompare(a));

  // Distribute tweets into columns (Round Robin: 1->Col1, 2->Col2, 3->Col3, 4->Col1...)
  const distributedColumns: string[][] = Array.from({ length: columns }, () => []);
  sortedTweets.forEach((id, index) => {
    distributedColumns[index % columns].push(id);
  });

  return (
    <StaggerContainer className="flex gap-6 justify-center" delay={0.2} staggerChildren={0.1}>
      {distributedColumns.map((columnTweets, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-6 flex-1 min-w-0">
          {columnTweets.map((id) => (
            <FadeInItem key={id} className="break-inside-avoid">
               <ClientTweetCard id={id} className="w-full" />
            </FadeInItem>
          ))}
        </div>
      ))}
    </StaggerContainer>
  );
}
