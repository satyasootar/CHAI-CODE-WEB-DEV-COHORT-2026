"use client";

import { ClientTweetCard } from "@/components/ui/client-tweet-card";
import { FadeInItem, StaggerContainer } from "@/components/ui/fade-in";

interface TweetGridProps {
  tweetIds: string[];
}

export function TweetGrid({ tweetIds }: TweetGridProps) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6" delay={0.2} staggerChildren={0.1}>
      {tweetIds.map((id) => (
        <FadeInItem key={id} className="h-full">
           <ClientTweetCard id={id} className="w-full h-full" />
        </FadeInItem>
      ))}
    </StaggerContainer>
  );
}
