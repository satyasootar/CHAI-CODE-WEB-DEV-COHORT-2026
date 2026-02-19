"use client";

import { useTweet } from "react-tweet";
import { MagicTweet, TweetNotFound, TweetSkeleton } from "@/components/ui/tweet-card";

export const ClientTweetCard = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const { data, error, isLoading } = useTweet(id);

  if (isLoading) return <TweetSkeleton />;
  if (error || !data) return <TweetNotFound />;

  return <MagicTweet tweet={data} className={className} />;
};
