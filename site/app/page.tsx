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
