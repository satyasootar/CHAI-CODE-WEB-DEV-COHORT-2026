
export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-6 md:py-8 bg-background/50 backdrop-blur-sm mt-30">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href="https://github.com/satyasootar"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            Satya
          </a>
          .
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
           <a
            href="https://github.com/satyasootar"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
