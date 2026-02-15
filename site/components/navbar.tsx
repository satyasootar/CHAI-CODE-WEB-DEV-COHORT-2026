
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight">
            Satya's <span className="text-primary">Learnings</span>
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-6">
          <nav className="flex items-center space-x-6">
            <Link href="/assignments" className="text-sm font-medium transition-colors hover:text-primary">
              Assignments
            </Link>
            <Link href="/labs" className="text-sm font-medium transition-colors hover:text-primary">
              Labs
            </Link>
            <Link href="/blogs" className="text-sm font-medium transition-colors hover:text-primary">
              Blogs
            </Link>
            <Link href="/class-notes" className="text-sm font-medium transition-colors hover:text-primary">
              Class Notes
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
