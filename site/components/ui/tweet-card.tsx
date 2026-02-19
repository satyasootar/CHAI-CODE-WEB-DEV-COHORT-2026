import { Suspense } from "react"
import { enrichTweet, type EnrichedTweet, type TweetProps } from "react-tweet"
import { getTweet, type Tweet } from "react-tweet/api"

import { cn } from "@/lib/utils"

interface TwitterIconProps {
  className?: string
  [key: string]: unknown
}
const Twitter = ({ className, ...props }: TwitterIconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
    </g>
  </svg>
)

const Verified = ({ className, ...props }: TwitterIconProps) => (
  <svg
    aria-label="Verified Account"
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <g fill="currentColor">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
    </g>
  </svg>
)

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length - 3)}...`
}

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("bg-primary/10 rounded-md", className)} {...props} />
  )
}

export const TweetSkeleton = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: unknown
}) => (
  <div
    className={cn(
      "flex size-full max-h-max min-w-72 flex-col gap-2 rounded-xl border p-4",
      className
    )}
    {...props}
  >
    <div className="flex flex-row gap-2">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <Skeleton className="h-10 w-full" />
    </div>
    <Skeleton className="h-20 w-full" />
  </div>
)

export const TweetNotFound = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: unknown
}) => (
  <div
    className={cn(
      "flex size-full flex-col items-center justify-center gap-2 rounded-lg border p-4",
      className
    )}
    {...props}
  >
    <h3>Tweet not found</h3>
  </div>
)

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex flex-row items-start justify-between tracking-normal">
    <div className="flex items-center space-x-3">
      <a
        href={tweet.user.url}
        target="_blank"
        rel="noreferrer"
        className="shrink-0"
      >
        <img
          title={`Profile picture of ${tweet.user.name}`}
          alt={tweet.user.screen_name}
          height={48}
          width={48}
          src={tweet.user.profile_image_url_https}
          className="border-border/50 overflow-hidden rounded-full border"
        />
      </a>
      <div className="flex flex-col gap-0.5">
        <a
          href={tweet.user.url}
          target="_blank"
          rel="noreferrer"
          className="text-foreground flex items-center font-medium whitespace-nowrap transition-opacity hover:opacity-80"
        >
          {truncate(tweet.user.name, 20)}
          {tweet.user.verified ||
            (tweet.user.is_blue_verified && (
              <Verified className="ml-1 inline size-4 text-blue-500" />
            ))}
        </a>
        <div className="flex items-center space-x-1">
          <a
            href={tweet.user.url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            @{truncate(tweet.user.screen_name, 16)}
          </a>
        </div>
      </div>
    </div>
    <a href={tweet.url} target="_blank" rel="noreferrer">
      <span className="sr-only">Link to tweet</span>
      <Twitter className="text-muted-foreground hover:text-foreground size-5 items-start transition-all ease-in-out hover:scale-105" />
    </a>
  </div>
)

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="text-[15px] leading-relaxed tracking-normal wrap-break-word">
    {tweet.entities.map((entity, idx) => {
      switch (entity.type) {
        case "url":
        case "symbol":
        case "hashtag":
        case "mention":
          return (
            <a
              key={idx}
              href={entity.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-[15px] font-normal transition-colors"
            >
              <span>{entity.text}</span>
            </a>
          )
        case "text":
          return (
            <span
              key={idx}
              className="text-foreground text-[15px] font-normal"
              dangerouslySetInnerHTML={{ __html: entity.text }}
            />
          )
      }
    })}
  </div>
)

// Helper to extract image URL from various card types
const getTweetCardImage = (card: any) => {
  if (!card?.binding_values) return null;
  const values = card.binding_values;
  
  // Try common keys for large images
  const largeImage = 
    values.thumbnail_image_large?.image_value?.url ||
    values.player_image_large?.image_value?.url ||
    values.summary_photo_image_large?.image_value?.url ||
    values.promo_image?.image_value?.url ||
    values.thumbnail_image?.image_value?.url ||
    values.event_thumbnail?.image_value?.url;
    
  return largeImage;
};

export const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => {
  const cardImage = getTweetCardImage((tweet as any).card);

  if (!tweet.video && !tweet.photos && !cardImage) return null;

  return (
    <div className="flex flex-1 items-center justify-center mt-2">
      {tweet.video && (
        <video
          poster={tweet.video.poster}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-xl border shadow-sm w-full"
        >
          <source src={tweet.video.variants[0].src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {tweet.photos && (
        <div className="relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto w-full">
          {tweet.photos.map((photo) => (
            <img
              key={photo.url}
              src={photo.url}
              width={photo.width}
              height={photo.height}
              title={"Photo by " + tweet.user.name}
              alt={tweet.text}
              className="h-64 w-full shrink-0 snap-center snap-always rounded-xl border object-cover shadow-sm"
            />
          ))}
        </div>
      )}
      {!tweet.video && !tweet.photos && cardImage && (
        <a 
          href={(tweet as any).card?.url || (tweet as any).urls?.[0]?.expanded_url} // Try to link to the card URL 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full group relative"
        >
           <img
            src={cardImage}
            className="h-64 w-full rounded-xl border object-cover shadow-sm transition-opacity group-hover:opacity-90"
            alt="Link preview"
          />
           {/* Optional: Add domain badge if available */}
           {(tweet as any).card?.binding_values?.vanity_url?.string_value && (
               <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
                   {(tweet as any).card.binding_values.vanity_url.string_value}
               </div>
           )}
        </a>
      )}
    </div>
  )
}

export const TweetInfo = ({ tweet }: { tweet: EnrichedTweet }) => {
  const date = new Date(tweet.created_at);
  const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  const formattedDate = date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  
  return (
    <div className="flex items-center justify-between text-muted-foreground text-sm mt-2 border-t pt-2 border-border/50">
      <a href={tweet.url} target="_blank" rel="noreferrer" className="hover:underline">
        {formattedTime} · {formattedDate}
      </a>

      {(tweet as any).views_count ? (
         <span>
           <span className="font-bold text-foreground">
             {new Intl.NumberFormat('en-US', { notation: "compact" }).format((tweet as any).views_count)}
           </span> Views
         </span>
      ) : (tweet as any).public_metrics?.impression_count ? (
        <span>
           <span className="font-bold text-foreground">
             {new Intl.NumberFormat('en-US', { notation: "compact" }).format((tweet as any).public_metrics.impression_count)}
           </span> Views
         </span>
      ) : null}
    </div>
  );
}

export const QuotedTweet = ({ tweet }: { tweet: EnrichedTweet }) => {
  return (
    <div className="border border-border/50 rounded-lg p-3 mt-4 hover:bg-muted/50 transition-colors cursor-pointer">
      <TweetHeader tweet={tweet} />
      <TweetBody tweet={tweet} />
      <TweetMedia tweet={tweet} />
    </div>
  )
}

export const MagicTweet = ({
  tweet,
  className,
  ...props
}: {
  tweet: Tweet
  className?: string
}) => {
  const enrichedTweet = enrichTweet(tweet)
  return (
    <div
      className={cn(
        "relative flex h-fit w-full max-w-lg flex-col gap-4 overflow-hidden rounded-xl border p-5",
        className
      )}
      {...props}
    >
      <TweetHeader tweet={enrichedTweet} />
      <TweetBody tweet={enrichedTweet} />
      <TweetMedia tweet={enrichedTweet} />
      {enrichedTweet.quoted_tweet && <QuotedTweet tweet={enrichedTweet.quoted_tweet as unknown as EnrichedTweet} />}
      <TweetInfo tweet={enrichedTweet} />
    </div>
  )
}

/**
 * TweetCard (Server Side Only)
 */
export const TweetCard = async ({
  id,
  components,
  fallback = <TweetSkeleton />,
  onError,
  ...props
}: TweetProps & {
  className?: string
}) => {
  const tweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) {
          onError(err)
        } else {
          console.error(err)
        }
      })
    : undefined

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound
    return <NotFound {...props} />
  }

  return (
    <Suspense fallback={fallback}>
      <MagicTweet tweet={tweet} {...props} />
    </Suspense>
  )
}
