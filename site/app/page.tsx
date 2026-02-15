import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, BookOpen, Layers, GraduationCap, Terminal, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen">

      
      <div className="flex flex-col items-center justify-center space-y-12 pt-20 pb-16">
        <section className="flex flex-col items-center space-y-6 text-center max-w-4xl px-4">
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
              src="data:image/svg+xml,%3csvg%20width='2478'%20height='295'%20viewBox='0%200%202478%20295'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M95.5601%20295C62.229%20295%2038.0277%20287.174%2022.9562%20271.523C7.8847%20255.872%200.34896%20231.816%200.34896%20199.354V96.3174C0.34896%2063.8557%207.8847%2039.7993%2022.9562%2024.1482C38.0277%208.49704%2062.229%200.671462%2095.5601%200.671462H378.15V106.751H117.298V187.616H378.15V295H95.5601ZM493.598%20295C460.267%20295%20436.065%20287.174%20420.994%20271.523C405.922%20255.872%20398.387%20231.816%20398.387%20199.354V96.3174C398.387%2063.8557%20405.922%2039.7993%20420.994%2024.1482C436.065%208.49704%20460.267%200.671462%20493.598%200.671462H709.671C742.132%200.671462%20766.044%208.49704%20781.405%2024.1482C797.056%2039.7993%20804.882%2063.8557%20804.882%2096.3174V199.354C804.882%20231.816%20797.056%20255.872%20781.405%20271.523C766.044%20287.174%20742.132%20295%20709.671%20295H493.598ZM687.498%20106.751H515.336V187.616H687.498V106.751ZM1100.95%20295V197.18H944.438V295H827.924V0.671462H944.438V98.0564H1100.95V0.671462H1217.46V295H1100.95ZM1335.95%20295C1302.62%20295%201278.42%20287.174%201263.35%20271.523C1248.28%20255.872%201240.74%20231.816%201240.74%20199.354V96.3174C1240.74%2063.8557%201248.28%2039.7993%201263.35%2024.1482C1278.42%208.49704%201302.62%200.671462%201335.95%200.671462H1552.02C1584.49%200.671462%201608.4%208.49704%201623.76%2024.1482C1639.41%2039.7993%201647.23%2063.8557%201647.23%2096.3174V199.354C1647.23%20231.816%201639.41%20255.872%201623.76%20271.523C1608.4%20287.174%201584.49%20295%201552.02%20295H1335.95ZM1529.85%20106.751H1357.69V187.616H1529.85V106.751ZM1970.69%20295C1968.37%20293.261%201966.49%20290.797%201965.04%20287.609C1963.59%20284.421%201962.87%20280.218%201962.87%20275.001V209.353H1786.79V295H1670.28V0.671462H2002.43C2028.8%200.671462%202047.21%206.32327%202057.64%2017.6269C2068.37%2028.9305%202073.73%2045.4511%202073.73%2067.1888V108.056C2073.73%20119.649%202072.86%20128.924%202071.12%20135.88C2069.67%20142.546%202067.5%20147.908%202064.6%20151.966C2061.99%20155.734%202058.66%20158.487%202054.6%20160.226C2050.83%20161.675%202046.77%20162.835%202042.43%20163.704C2046.19%20164.284%202050.25%20165.443%202054.6%20167.182C2058.95%20168.631%202062.86%20171.24%202066.34%20175.008C2070.11%20178.776%202073.15%20183.993%202075.47%20190.659C2077.79%20197.035%202078.95%20205.586%202078.95%20216.31V275.871C2078.95%20281.088%202079.67%20285.146%202081.12%20288.044C2082.57%20290.942%202084.45%20293.261%202086.77%20295H1970.69ZM1957.65%2096.7521H1786.79V128.054H1957.65V96.7521ZM2222.8%20295V107.621H2084.11V0.671462H2478V107.621H2338.88V295H2222.8Z'%20fill='url(%23paint0_linear_1089_3083)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_1089_3083'%20x1='134.317'%20y1='154'%20x2='2429.3'%20y2='154'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FEC48C'/%3e%3cstop%20offset='0.350962'%20stop-color='%23F77628'/%3e%3cstop%20offset='1'%20stop-color='%23CC4909'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
            />
          </div>

          <div className="flex flex-row items-end justify-center pt-2">
             <div style={{ transform: 'rotate(-3.59642deg)' }}>
                <svg viewBox="0 0 2000 2000" xmlns="http://www.w3.org/2000/svg" className="-ml-1.5 h-16 w-16 fill-[#B0B0B0] stroke-[#B0B0B0] dark:fill-[#ffffff] dark:stroke-[#ffffff]"><path d="M1507.79 760.427c-.65 63.101-207.62 111.366-468.81 108.688-261.194-2.678-465.548-45.025-464.901-108.125s206.05-123.061 467.241-120.383 467.11 56.719 466.47 119.82Z" fill="#FF7D0C" style={{ transform: "translateY(4.92396px) scaleX(0.980304)", transformOrigin: "50% 50%", transformBox: "fill-box" }}></path><path fillRule="evenodd" clipRule="evenodd" d="M577.01 773.174c-.451 3.527 1.81 7.818 6.331 16.401L1117.43 1803.52c2.46 4.68 3.7 7.03 5.55 8.5 1 .79 2.12 1.41 3.32 1.83 28.51 20.3 130.79 12.59 246.39-20.47 117.49-33.59 211.34-88.69 221.94-122.06.43-.72.78-1.49 1.04-2.29.73-2.24.47-4.87-.05-10.11l-88.63-893.466c-.57-5.817-.86-8.725-2.19-10.909a11.23 11.23 0 0 0-4.92-4.392c-2.32-1.066-5.25-1.02-11.09-.929l-889.797 13.95c-9.7.152-14.549.228-17.428 2.316a11.26 11.26 0 0 0-4.555 7.684Z" fill="#FE9332" style={{ transform: "translateY(0.624335px) scaleX(1.00416)", transformOrigin: "50% 50%", transformBox: "fill-box" }}></path><path fillRule="evenodd" clipRule="evenodd" d="M1550.93 228.057c-1.07-12.387-11.99-21.558-24.37-20.485-12.39 1.073-21.56 11.985-20.49 24.372l125.67 1450.336c.54 2.24.73 4.54.6 6.89l.04.49c-.03-.01-.05-.01-.08-.01-2.95 37.71-92.11 88.78-258.4 137.06-172.87 50.18-276.27 47.2-294.64 17.18-.01.01-.02.01-.03.02l-.33-.62c-.25-.44-.48-.88-.69-1.33L394.815 529.664c-5.743-11.028-19.338-15.312-30.366-9.569s-15.312 19.338-9.569 30.365l693.16 1331.05c1.11 2.13 2.51 4.01 4.13 5.61 17.18 27.88 166.06 29.99 332.52-19.31 152.93-45.29 271.73-97.49 292.19-140.5 1.46-2.59 2.43-5.49 2.77-8.55.44-2.62.47-5.2.08-7.74-.11-.7-.27-1.38-.49-2.05z"></path><path d="M932.328 283.002C1098 238.611 1247.64 214.748 1357.32 210.36c55.07-2.203 98.56.574 128.49 7.373 15.01 3.408 25.13 7.503 31.32 11.401 2.99 1.885 4.63 3.447 5.46 4.443.4.483.61.822.7 1.006.1.177.12.27.13.305s.03.1.03.245c.01.152 0 .476-.09 1.008-.2 1.101-.79 3.087-2.4 6.026-3.36 6.11-10.03 14.313-21.42 24.327-22.71 19.973-59.27 42.929-108.48 67.363-97.98 48.649-240.34 100.373-406.295 144.842-165.805 44.427-318.862 70.533-431.992 77.105-56.801 3.299-102.026 1.575-133.295-4.525-15.699-3.063-26.285-6.934-32.743-10.704-4.324-2.525-5.68-4.305-6.027-4.893.007-.683.291-2.903 2.773-7.251 3.708-6.494 10.94-15.14 23.004-25.641 24.031-20.918 62.334-45.023 113.175-70.567 101.259-50.874 246.864-104.793 412.668-149.221Z" fill="none" strokeWidth="56.281"></path><path d="m990.214 1303.45 135.216 9.56c6.4 21.56 9.38 37.25 8.94 47.06l-196.728-19.23-11.429-38.5 151.767-132.19c5.62 7.64 11.68 22.41 18.19 44.31zm338.106-50.68 108.09-81.79-137.35-16.76c-5.18-17.45-7.37-32.99-6.58-46.63l196.96 27.53 11.42 38.5-154.36 123.47c-5.72-7.99-11.78-22.76-18.18-44.32Zm-156.81 189.1 39.34-406.29 42.13-9.28-39.34 406.29z" fill="#000"></path></svg>
             </div>
             <svg viewBox="0 -40 1210 300" xmlns="http://www.w3.org/2000/svg" className="w-52 fill-[#000000] dark:fill-[#ffffff]"><path d="M103.4 211.2q-30.25 0-50.875-12.375Q31.9 186.175 21.45 163.9T11 112.2t10.725-51.975 31.35-35.2Q73.7 12.1 103.4 12.1q22 0 38.775 7.425T169.4 40.7q10.725 13.475 13.75 33.275h-33.275q-3.85-14.025-15.675-22T103.4 44q-20.625 0-33.275 9.625T51.7 78.375q-5.5 15.125-5.5 32.45 0 17.875 5.775 33.55 6.05 15.675 18.975 25.3t33.275 9.625q12.65 0 22-3.575 9.625-3.575 15.95-10.175 6.6-6.875 9.075-15.95h34.925q-3.3 19.525-14.85 33.275-11.275 13.75-28.875 21.175-17.325 7.15-39.05 7.15m100.083-2.2V14.575h33.55v68.2q5.774-7.425 13.475-12.1t16.225-6.6q8.524-2.2 16.225-2.2 20.624 0 32.45 9.075 11.825 9.075 16.5 24.2 4.95 15.125 4.95 34.1V209h-33.55v-73.975q0-7.425-1.1-15.125t-4.4-13.75q-3.026-6.325-9.35-10.175-6.05-3.85-16.225-3.85-9.625 0-16.5 4.125-6.875 3.85-11 10.725-3.85 6.875-5.775 15.125t-1.925 16.5V209zm202.842 1.925q-10.175 0-19.25-2.75T370.85 200.2q-7.149-5.5-11.55-13.475-4.125-8.25-4.125-19.25 0-14.025 5.5-22.825 5.5-9.075 14.85-13.75 9.626-4.675 21.725-6.325 12.1-1.925 25.3-1.925h28.325q0-9.626-3.025-16.5-3.025-7.15-9.625-11.275-6.324-4.125-16.5-4.125-6.6 0-12.375 1.65-5.5 1.375-9.625 4.675-3.85 3.025-5.5 7.975H359.85q1.926-11.275 7.7-19.25 6.05-8.25 14.575-13.475 8.8-5.225 19.25-7.7a83 83 0 0 1 21.175-2.75q31.626 0 45.925 18.15 14.575 18.15 14.575 50.875V209h-29.7l-.825-18.7q-6.324 9.35-15.125 13.75t-17.05 5.5q-8.25 1.375-14.025 1.375m6.6-27.225q11 0 19.525-4.125 8.526-4.125 13.475-11.55 5.225-7.425 5.225-17.05V146.3h-26.4q-6.6 0-13.2.55-6.324.275-11.55 2.2-5.225 1.65-8.525 5.225-3.024 3.575-3.025 10.175t3.3 10.725q3.576 4.125 9.075 6.325 5.776 2.2 12.1 2.2m249.37 27.5q-30.25 0-50.875-12.375-20.626-12.65-31.075-34.925-10.45-22.275-10.45-51.7t10.725-51.975 31.35-35.2Q632.595 12.1 662.295 12.1q21.999 0 38.775 7.425 16.774 7.425 27.225 21.175 10.725 13.475 13.75 33.275H708.77q-3.85-14.025-15.675-22T662.295 44q-20.625 0-33.275 9.625t-18.425 24.75q-5.5 15.125-5.5 32.45 0 17.875 5.775 33.55 6.05 15.675 18.975 25.3 12.924 9.625 33.275 9.625 12.65 0 22-3.575 9.624-3.575 15.95-10.175 6.6-6.875 9.075-15.95h34.925q-3.3 19.525-14.85 33.275-11.276 13.75-28.875 21.175-17.325 7.15-39.05 7.15m166.357-.275q-22.275 0-38.5-9.075-15.95-9.075-24.75-25.85-8.525-16.775-8.525-39.325 0-22.825 8.8-39.325 8.8-16.775 24.75-26.125t38.225-9.35q22 0 37.95 9.35t24.475 26.4q8.525 16.774 8.525 39.6 0 22.275-8.525 39.05-8.25 16.5-24.2 25.575t-38.225 9.075m-.275-30.525q13.75 0 22-6.05 8.526-6.05 12.375-15.95t3.85-21.45-3.85-21.725Q858.903 105.05 850.377 99q-8.25-6.325-22-6.325T806.102 99q-8.524 6.05-12.375 16.225-3.85 9.9-3.85 21.725 0 11.55 3.85 21.725 4.125 9.9 12.375 15.95 8.526 5.775 22.275 5.775m148.962 30.525q-21.999 0-36.3-9.9-14.3-10.175-21.45-26.95-6.875-16.775-6.875-37.4 0-21.45 7.425-38.225 7.425-17.05 22.275-26.675 14.85-9.9 37.125-9.9 8.25 0 15.95 1.925 7.981 1.65 14.851 5.5 7.155 3.575 11.82 9.625v-64.35h33.55V209h-32.45l-.55-18.15c-3.48 4.583-7.6 8.342-12.37 11.275-4.58 2.933-9.72 5.133-15.401 6.6q-8.525 2.2-17.6 2.2m6.325-30.25q13.2 0 21.726-6.05c5.68-4.217 9.9-9.717 12.65-16.5 2.93-6.967 4.4-14.3 4.4-22 0-8.067-1.47-15.4-4.4-22-2.75-6.6-6.97-11.917-12.65-15.95q-8.526-6.05-21.726-6.05-14.025 0-22.275 6.325-7.974 6.325-11.825 16.775-3.575 10.175-3.575 22 0 8.8 1.925 16.775 2.2 7.7 6.6 13.75 4.401 6.05 11.55 9.625 7.15 3.3 17.6 3.3m161.196 30.25c-15.03 0-27.87-3.117-38.5-9.35-10.45-6.233-18.43-14.85-23.93-25.85-5.31-11.183-7.97-24.108-7.97-38.775q0-22 8.25-38.775c5.68-11.367 13.75-20.258 24.2-26.675q15.945-9.625 38.22-9.625c11 0 20.63 2.017 28.88 6.05 8.25 3.85 15.12 9.167 20.62 15.95 5.69 6.783 9.9 14.483 12.65 23.1s4.04 17.692 3.85 27.225c-.18 2.2-.36 4.4-.55 6.6-.18 2.017-.45 4.217-.82 6.6h-101.75q.825 9.625 4.95 17.6c2.93 5.317 6.97 9.533 12.1 12.65q7.98 4.675 19.8 4.675 6.87 0 13.2-1.65c4.22-1.283 7.88-3.117 11-5.5q4.95-3.575 6.6-9.075h33.55q-3.57 15.675-13.2 25.575t-23.1 14.575q-13.2 4.675-28.05 4.675m-36.3-88.55h69.85c0-6.05-1.38-11.55-4.13-16.5q-4.125-7.425-11.82-11.55-7.425-4.4-18.15-4.4c-7.7 0-14.12 1.558-19.25 4.675s-9.08 7.15-11.83 12.1-4.3 10.175-4.67 15.675"></path><circle cx="524" cy="22" r="22" className="custom-bounce fill-[#ff7d0c] dark:fill-[#f79b4a]"></circle><path d="M506 63h34v147h-34z"></path></svg>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            Building the <span className="text-primary">Future</span> of Web
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A comprehensive showcase of my journey through the Web Dev Cohort. 
            From fundamental HTML/CSS to complex full-stack applications.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Button asChild size="lg" className="text-lg px-8 h-12">
              <Link href="/assignments">Explore Work</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 h-12" asChild>
              <Link href="https://github.com/satyasootar" target="_blank">
                View GitHub
              </Link>
            </Button>
          </div>
        </section>

        <section className="w-full max-w-6xl px-4 pt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Assignments Card */}
            <Link href="/assignments" className="group lg:col-span-2">
              <Card className="h-full transition-all hover:shadow-xl hover:border-primary/50 relative overflow-hidden bg-card/50 backdrop-blur-sm border-white/10">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Layers className="h-64 w-64" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-3xl">
                    <Layers className="h-8 w-8 text-primary" />
                    <span>Assignments</span>
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Production-ready projects and UI clones.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Explore a diverse range of projects including landing pages, dashboards, and interactive applications.
                    Built with modern best practices and attention to detail.
                  </p>
                  <span className="text-primary font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Allow me to show you <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            {/* Labs Card */}
            <Link href="/labs" className="group">
              <Card className="h-full transition-all hover:shadow-xl hover:border-primary/50 relative overflow-hidden bg-card/50 backdrop-blur-sm border-white/10">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Code className="h-32 w-32" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <Code className="h-6 w-6 text-primary" />
                    <span>JS Labs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Mastering JavaScript core concepts through hands-on coding challenges and logic building.
                  </p>
                  <span className="text-primary font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    View Code <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            {/* Blogs Card */}
            <Link href="/blogs" className="group">
              <Card className="h-full transition-all hover:shadow-xl hover:border-primary/50 relative overflow-hidden bg-card/50 backdrop-blur-sm border-white/10">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <BookOpen className="h-32 w-32" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span>Blogs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Documenting technical insights and deep dives into web technologies.
                  </p>
                   <span className="text-primary font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Read Articles <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            {/* Class Notes Card */}
             <Link href="/class-notes" className="group lg:col-span-2">
              <Card className="h-full transition-all hover:shadow-xl hover:border-primary/50 relative overflow-hidden bg-card/50 backdrop-blur-sm border-white/10">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                   <GraduationCap className="h-64 w-64" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-3xl">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <span>Class Notes</span>
                  </CardTitle>
                   <CardDescription className="text-lg">
                    Detailed notes from every live session.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Comprehensive documentation of concepts covered in classes, including code snippets, diagrams, and explanations. 
                    A personal knowledge base for continuous revision.
                  </p>
                   <span className="text-primary font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>

          </div>
        </section>
        
        {/* Tech Stack / Stats Section (Optional Decoration) */}
        <section className="w-full max-w-6xl px-4 pt-16 flex flex-wrap justify-center gap-8 opacity-50 text-muted-foreground">
            <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                <span>Next.js 15+</span>
            </div>
            <div className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                <span>React Server Components</span>
            </div>
            <div className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                <span>Tailwind CSS v4</span>
            </div>
            <div className="flex items-center gap-2">
                 <Database className="h-5 w-5" />
                <span>Dynamic Data Fetching</span>
            </div>
        </section>

      </div>
    </div>
  );
}
