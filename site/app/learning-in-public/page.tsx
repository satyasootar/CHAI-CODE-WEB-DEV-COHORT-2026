import { tweetIds } from "@/lib/tweets";
import { TweetGrid } from "@/components/TweetGrid";
import { FadeIn } from "@/components/ui/fade-in";

export default function LearningInPublicPage() {
  return (
    <div className="space-y-8 pt-32 pb-16">
      <FadeIn duration={0.8} className="flex flex-col space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Learning in <span className="text-primary">Public</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          A timeline of my journey, sharing learnings, challenges, and wins as I build in public.
        </p>
      </FadeIn>

      <div className="w-full">
         <TweetGrid tweetIds={tweetIds} />
      </div>
    </div>
  );
}
