"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-background/50 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-8 flex items-center space-x-2">
              <div className="flex flex-row items-end justify-center pt-2">
             <div className="w-10">
                <svg viewBox="0 0 2000 2000" xmlns="http://www.w3.org/2000/svg" className="-ml-1.5 h-10 w-10 fill-[#B0B0B0] stroke-[#B0B0B0] dark:fill-[#ffffff] dark:stroke-[#ffffff]"><path d="M1507.79 760.427c-.65 63.101-207.62 111.366-468.81 108.688-261.194-2.678-465.548-45.025-464.901-108.125s206.05-123.061 467.241-120.383 467.11 56.719 466.47 119.82Z" fill="#FF7D0C" style={{ transform: "translateY(4.92396px) scaleX(0.980304)", transformOrigin: "50% 50%", transformBox: "fill-box" }}></path><path fillRule="evenodd" clipRule="evenodd" d="M577.01 773.174c-.451 3.527 1.81 7.818 6.331 16.401L1117.43 1803.52c2.46 4.68 3.7 7.03 5.55 8.5 1 .79 2.12 1.41 3.32 1.83 28.51 20.3 130.79 12.59 246.39-20.47 117.49-33.59 211.34-88.69 221.94-122.06.43-.72.78-1.49 1.04-2.29.73-2.24.47-4.87-.05-10.11l-88.63-893.466c-.57-5.817-.86-8.725-2.19-10.909a11.23 11.23 0 0 0-4.92-4.392c-2.32-1.066-5.25-1.02-11.09-.929l-889.797 13.95c-9.7.152-14.549.228-17.428 2.316a11.26 11.26 0 0 0-4.555 7.684Z" fill="#FE9332" style={{ transform: "translateY(0.624335px) scaleX(1.00416)", transformOrigin: "50% 50%", transformBox: "fill-box" }}></path><path fillRule="evenodd" clipRule="evenodd" d="M1550.93 228.057c-1.07-12.387-11.99-21.558-24.37-20.485-12.39 1.073-21.56 11.985-20.49 24.372l125.67 1450.336c.54 2.24.73 4.54.6 6.89l.04.49c-.03-.01-.05-.01-.08-.01-2.95 37.71-92.11 88.78-258.4 137.06-172.87 50.18-276.27 47.2-294.64 17.18-.01.01-.02.01-.03.02l-.33-.62c-.25-.44-.48-.88-.69-1.33L394.815 529.664c-5.743-11.028-19.338-15.312-30.366-9.569s-15.312 19.338-9.569 30.365l693.16 1331.05c1.11 2.13 2.51 4.01 4.13 5.61 17.18 27.88 166.06 29.99 332.52-19.31 152.93-45.29 271.73-97.49 292.19-140.5 1.46-2.59 2.43-5.49 2.77-8.55.44-2.62.47-5.2.08-7.74-.11-.7-.27-1.38-.49-2.05z"></path><path d="M932.328 283.002C1098 238.611 1247.64 214.748 1357.32 210.36c55.07-2.203 98.56.574 128.49 7.373 15.01 3.408 25.13 7.503 31.32 11.401 2.99 1.885 4.63 3.447 5.46 4.443.4.483.61.822.7 1.006.1.177.12.27.13.305s.03.1.03.245c.01.152 0 .476-.09 1.008-.2 1.101-.79 3.087-2.4 6.026-3.36 6.11-10.03 14.313-21.42 24.327-22.71 19.973-59.27 42.929-108.48 67.363-97.98 48.649-240.34 100.373-406.295 144.842-165.805 44.427-318.862 70.533-431.992 77.105-56.801 3.299-102.026 1.575-133.295-4.525-15.699-3.063-26.285-6.934-32.743-10.704-4.324-2.525-5.68-4.305-6.027-4.893.007-.683.291-2.903 2.773-7.251 3.708-6.494 10.94-15.14 23.004-25.641 24.031-20.918 62.334-45.023 113.175-70.567 101.259-50.874 246.864-104.793 412.668-149.221Z" fill="none" strokeWidth="56.281"></path><path d="m990.214 1303.45 135.216 9.56c6.4 21.56 9.38 37.25 8.94 47.06l-196.728-19.23-11.429-38.5 151.767-132.19c5.62 7.64 11.68 22.41 18.19 44.31zm338.106-50.68 108.09-81.79-137.35-16.76c-5.18-17.45-7.37-32.99-6.58-46.63l196.96 27.53 11.42 38.5-154.36 123.47c-5.72-7.99-11.78-22.76-18.18-44.32Zm-156.81 189.1 39.34-406.29 42.13-9.28-39.34 406.29z" fill="#000"></path></svg>
              </div>
             <span className="text-3xl font-bold text-foreground ml-2">
                SatyaCodes
             </span>          </div>

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
