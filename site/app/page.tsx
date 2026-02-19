import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code, Layers, Terminal, Database, ArrowRight } from "lucide-react";
import { Instructors } from "@/components/Instructors";
import { AuroraText } from "@/components/ui/aurora-text";
import { FadeIn, StaggerContainer, FadeInItem } from "@/components/ui/fade-in";
import { ClientTweetCard } from "@/components/ui/client-tweet-card";
import { tweetIds } from "@/lib/tweets";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-12 pt-20 pb-16">
        <FadeIn direction="up" duration={0.8} className="flex flex-col items-center space-y-6 text-center max-w-6xl px-4">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <span>🚀 Full Stack Journey</span>
          </div>
          <div className="w-[90%] select-none sm:mx-auto md:w-[80%]">
            <p className="font-corinthia text-4xl font-medium tracking-tight sm:text-center sm:text-5xl md:text-6xl lg:text-7xl opacity-100 transform-none">
              Web Development
            </p>
            <img
              className="-z-10 dark:flex w-full"
              alt="Cohort illustration"
              draggable="false"
              src="/assets/cohort.svg"
            />
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
  The <AuroraText className="text-primary">Premium </AuroraText> Experience
</h1>
<p className="text-xl text-muted-foreground max-w-2xl">
  A structured record of my learning, projects, and full-stack development progress.
</p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Button asChild size="lg" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs h-10 px-6 has-[>svg]:px-4 cursor-pointer rounded-none rounded-tr-lg rounded-bl-lg border border-transparent bg-neutral-900 text-white transition-colors duration-200 hover:bg-black/90 dark:bg-white dark:text-black">
              <Link href="/assignments">Explore Work</Link>
            </Button>
            <Button variant="outline" size="lg" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs h-10 px-6 has-[>svg]:px-4 cursor-pointer rounded-none rounded-tl-lg rounded-br-lg border bg-transparent text-primary hover:bg-neutral-100 dark:hover:bg-black/90" asChild>
              <Link href="https://github.com/satyasootar/CHAI-CODE-WEB-DEV-COHORT-2026" target="_blank">
                View GitHub
              </Link>
            </Button>
          </div>
        </FadeIn>

        {/* Instructors Section */}
        <FadeIn delay={0.2} duration={0.8}>
           <Instructors />
        </FadeIn>

        <section className="w-full max-w-6xl px-4 pt-16">
          <div className="mt-8">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2" delay={0.4} staggerChildren={0.15}>
              <FadeInItem data-slot="card" className="text-card-foreground flex flex-col gap-6 shadow-sm border transition-shadow hover:shadow-sm hover:border-accent-foreground/30 bg-white/70 hover:bg-orange-50 dark:bg-black/10 dark:hover:bg-accent/20 backdrop-contrast-100 backdrop-filter backdrop-blur-2xl rounded-none px-2 py-10 md:py-12 rounded-t-lg md:rounded-tr-none md:rounded-tl-lg">
                <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                  <span data-slot="badge" className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent [a&]:hover:bg-primary/90 w-fit rounded-sm bg-[#006FEE33] text-[#005bc4] dark:text-[#66aaf9]">
                    <span className="font-montserrat text-lg">JS Labs</span>
                  </span>
                </div>
                <div data-slot="card-content" className="px-6 flex-1">
                  <p className="text-lg font-medium">Mastering JavaScript core concepts through hands-on coding challenges and logic building.</p>
                </div>
                <div data-slot="card-footer" className="flex items-center px-6 [.border-t]:pt-6 pt-0">
                  <Link href="/labs" className="font-one flex items-center text-xs font-medium text-muted-foreground transition-all duration-300 hover:gap-0.5 hover:text-primary dark:hover:text-primary">
                    View Code
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="size-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </FadeInItem>
              <FadeInItem data-slot="card" className="text-card-foreground flex flex-col gap-6 shadow-sm border transition-shadow hover:shadow-sm hover:border-accent-foreground/30 bg-white/70 hover:bg-orange-50 dark:bg-black/10 dark:hover:bg-accent/20 backdrop-contrast-100 backdrop-filter backdrop-blur-2xl rounded-none px-2 py-10 md:py-12 md:rounded-tr-lg">
                <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                  <span data-slot="badge" className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent [a&]:hover:bg-primary/90 w-fit rounded-sm bg-[#7828c833] dark:bg-[#9353d333] text-[#6020a0] dark:text-[#ae7ede]">
                    <span className="font-montserrat text-lg">Assignments</span>
                  </span>
                </div>
                <div data-slot="card-content" className="px-6 flex-1">
                  <p className="text-lg font-medium">Production-ready projects and UI clones built with modern best practices.</p>
                </div>
                <div data-slot="card-footer" className="flex items-center px-6 [.border-t]:pt-6 pt-0">
                  <Link href="/assignments" className="font-one flex items-center text-xs font-medium text-muted-foreground transition-all duration-300 hover:gap-0.5 hover:text-primary dark:hover:text-primary">
                    Explore Work
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="size-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </FadeInItem>
              <FadeInItem data-slot="card" className="text-card-foreground flex flex-col gap-6 shadow-sm border transition-shadow hover:shadow-sm hover:border-accent-foreground/30 bg-white/70 hover:bg-orange-50 dark:bg-black/10 dark:hover:bg-accent/20 backdrop-contrast-100 backdrop-filter backdrop-blur-2xl rounded-none px-2 py-10 md:py-12 md:rounded-bl-lg">
                <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                  <span data-slot="badge" className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent [a&]:hover:bg-primary/90 w-fit rounded-sm bg-[#f5a52433] text-[#c4841d] dark:text-[#f9c97c]">
                    <span className="font-montserrat text-lg">Class Notes</span>
                  </span>
                </div>
                <div data-slot="card-content" className="px-6 flex-1">
                  <p className="text-lg font-medium">Detailed notes from every live session to help you revise concepts.</p>
                </div>
                <div data-slot="card-footer" className="flex items-center px-6 [.border-t]:pt-6 pt-0">
                  <Link href="/class-notes" className="font-one flex items-center text-xs font-medium text-muted-foreground transition-all duration-300 hover:gap-0.5 hover:text-primary dark:hover:text-primary">
                    Start learning
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="size-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </FadeInItem>
              <FadeInItem data-slot="card" className="text-card-foreground flex flex-col gap-6 shadow-sm border transition-shadow hover:shadow-sm hover:border-accent-foreground/30 bg-white/70 hover:bg-orange-50 dark:bg-black/10 dark:hover:bg-accent/20 backdrop-contrast-100 backdrop-filter backdrop-blur-2xl rounded-none px-2 py-10 md:py-12 rounded-b-lg md:rounded-bl-none md:rounded-br-lg">
                <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                  <span data-slot="badge" className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent [a&]:hover:bg-primary/90 w-fit rounded-sm bg-[#7828c833] dark:bg-[#9353d333] text-[#6020a0] dark:text-[#ae7ede]">
                    <span className="font-montserrat text-lg">Blogs</span>
                  </span>
                </div>
                <div data-slot="card-content" className="px-6 flex-1">
                  <p className="text-lg font-medium">Documenting technical insights and deep dives into web technologies.</p>
                </div>
                <div data-slot="card-footer" className="flex items-center px-6 [.border-t]:pt-6 pt-0">
                  <Link href="/blogs" className="font-one flex items-center text-xs font-medium text-muted-foreground transition-all duration-300 hover:gap-0.5 hover:text-primary dark:hover:text-primary">
                    Read Articles
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="size-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </FadeInItem>
            </StaggerContainer>
          </div>
        </section>
      </div>

      {/* Learning in Public Section */}
      <section className="w-full max-w-6xl px-4 py-16">
        <FadeIn delay={0.6} duration={0.8} className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-4">
             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Learning in <span className="text-primary">Public</span></h2>
             <p className="text-muted-foreground max-w-2xl mx-auto">
               Sharing my progress, insights, and small wins daily on Twitter.
             </p>
          </div>
          
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...tweetIds].sort((a, b) => b.localeCompare(a)).slice(0, 5).map((id) => (
              <FadeInItem key={id} className="h-full">
                <ClientTweetCard id={id} className="h-full w-full" />
              </FadeInItem>
            ))}
            
            <FadeInItem className="h-full min-h-[300px]">
              <Link 
                href="/learning-in-public" 
                className="group relative flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-xl border border-border bg-card p-8 text-center transition-all hover:bg-accent/50 hover:border-primary/50"
              >
                  <div className="rounded-full bg-primary/10 p-4 text-primary group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                     <ArrowRight className="size-8" />
                  </div>
                   <div className="space-y-2">
                     <h3 className="text-2xl font-bold">View All Updates</h3>
                     <p className="text-muted-foreground">Follow my daily progress and insights.</p>
                   </div>
              </Link>
            </FadeInItem>
          </div>
        </FadeIn>
      </section>
      </div>
  );
}
