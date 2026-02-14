
export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by <a href="https://github.com/satyasootar" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Satya Sootar</a> for the Web Dev Cohort.
        </p>
      </div>
    </footer>
  );
}
