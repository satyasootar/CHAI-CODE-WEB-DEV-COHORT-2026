import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define base paths logic to work both locally and in Vercel
const getBaseDir = () => {
    // Debugging for Vercel
    console.log("------------------------------------------");
    console.log("[DEBUG] Current process.cwd():", process.cwd());
    
    // Attempt 1: Validating against a known directory (e.g., js-labs)
    const potentialPaths = [
        path.join(process.cwd(), '..'), // Local dev structure: site/.. -> repo root
        path.join(process.cwd()),       // Fallback: maybe running from repo root
        path.join(process.cwd(), 'data') // Hypothetical data folder
    ];

    for (const p of potentialPaths) {
        const testPath = path.join(p, 'js-labs');
        const exists = fs.existsSync(testPath);
        console.log(`[DEBUG] Checking path: ${p} -> js-labs exists? ${exists}`);
        if (exists) {
            console.log("[DEBUG] Found valid BASE_DIR:", p);
            console.log("[DEBUG] Contents of BASE_DIR:", fs.readdirSync(p));
            console.log("------------------------------------------");
            return p;
        }
    }
    console.log("[DEBUG] No valid data directory found. Defaulting to parent.");
    console.log("------------------------------------------");
    return path.join(process.cwd(), '..'); // Default fallback
};

const BASE_DIR = getBaseDir();
const ASSIGNMENTS_DIR = path.join(BASE_DIR, 'assignment');
const LABS_DIR = path.join(BASE_DIR, 'js-labs');
const BLOGS_DIR = path.join(BASE_DIR, 'Blogs');
const CLASS_DIR = path.join(BASE_DIR, 'Class');

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  liveLink?: string;
  screenshot?: string;
  techStack?: string[];
}

export interface LabCategory {
  name: string;
  files: string[];
}

export interface Blog {
  title: string;
  description: string;
  link: string;
}

export interface ClassNote {
  slug: string;
  title: string;
  content: string;
}

// Helper to get directories
const getDirectories = (source: string) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

// Helper to get files
const getFiles = (source: string) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name);

export async function getAssignments(): Promise<Assignment[]> {
  try {
    if (!fs.existsSync(ASSIGNMENTS_DIR)) return [];
    
    const folders = getDirectories(ASSIGNMENTS_DIR);
    const assignments: Assignment[] = [];

    for (const folder of folders) {
      const folderPath = path.join(ASSIGNMENTS_DIR, folder);
      let readmeContent = '';
      
      // Try to find README.md or Submission.md
      const possibleFiles = ['Submission.md', 'submission.md', 'README.md', 'readme.md'];
      for (const file of possibleFiles) {
          const filePath = path.join(folderPath, file);
          if (fs.existsSync(filePath)) {
              readmeContent = fs.readFileSync(filePath, 'utf-8');
              break;
          }
      }

      // Simple parsing logic (can be improved based on actual file content structure)
      // Looking for "Live Link : <url>"
      const liveLinkMatch = readmeContent.match(/Live link\s*:\s*(https?:\/\/[^\s]+)/i);
      const liveLink = liveLinkMatch ? liveLinkMatch[1] : undefined;

      // Looking for image src
      const imageMatch = readmeContent.match(/src="([^"]+)"/);
      const screenshot = imageMatch ? imageMatch[1] : undefined;

      // Extract Description: Look for the first paragraph that isn't a heading or an image
      let description = "A full-stack assignment demonstrating core web development concepts.";
      const lines = readmeContent.split('\n');
      for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('!') && !trimmed.startsWith('<img') && !trimmed.startsWith('[') && trimmed.length > 20) {
              description = trimmed.slice(0, 150) + (trimmed.length > 150 ? '...' : '');
              break;
          }
      }

      assignments.push({
        id: folder,
        title: folder.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description,
        liveLink,
        screenshot,
        techStack: [] // Placeholder for now
      });
    }

    return assignments;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return [];
  }
}

export async function getLabs(): Promise<LabCategory[]> {
  try {
    if (!fs.existsSync(LABS_DIR)) return [];

    const categories = getDirectories(LABS_DIR);
    const labs: LabCategory[] = [];

    for (const category of categories) {
      const categoryPath = path.join(LABS_DIR, category, 'src'); // Assuming src folder exists based on previous `ls`
      // If src doesn't exist, check root of category
      const targetPath = fs.existsSync(categoryPath) ? categoryPath : path.join(LABS_DIR, category);
      
      if (fs.existsSync(targetPath)) {
         const files = getFiles(targetPath).filter(f => f.endsWith('.js'));
         if (files.length > 0) {
             labs.push({
                 name: category,
                 files
             });
         }
      }
    }
    return labs;
  } catch (error) {
    console.error("Error fetching labs:", error);
    return [];
  }
}

export async function getLabContent(category: string, filename: string): Promise<string> {
    try {
        const srcPath = path.join(LABS_DIR, category, 'src', filename);
        const rootPath = path.join(LABS_DIR, category, filename);
        
        let content = '';
        if (fs.existsSync(srcPath)) content = fs.readFileSync(srcPath, 'utf-8');
        else if (fs.existsSync(rootPath)) content = fs.readFileSync(rootPath, 'utf-8');
        
        return content;
    } catch (error) {
        return '// Error reading file';
    }
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const readmePath = path.join(BLOGS_DIR, 'README.md');
    if (!fs.existsSync(readmePath)) return [];

    const content = fs.readFileSync(readmePath, 'utf-8');
    const blogs: Blog[] = [];

    // Regex to parse markdown table rows: | Title | Description | [Link](url) |
    const regex = /\|\s*\*\*([^*]+)\*\*\s*\|\s*([^|]+)\s*\|\s*\[.*?\]\((https?:\/\/[^\)]+)\)\s*\|/g;
    
    let match;
    while ((match = regex.exec(content)) !== null) {
      blogs.push({
        title: match[1].trim(),
        description: match[2].trim(),
        link: match[3].trim()
      });
    }

    return blogs;
  } catch (error) {
     console.error("Error fetching blogs:", error);
     return [];
  }
}

export async function getClassNotes(): Promise<ClassNote[]> {
  try {
    if (!fs.existsSync(CLASS_DIR)) return [];

    const files = getFiles(CLASS_DIR).filter(f => f.endsWith('.md'));
    const notes: ClassNote[] = [];

    for (const file of files) {
      const filePath = path.join(CLASS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      // metadata extraction if frontmatter exists, else use filename
      const { data, content: markdownContent } = matter(content);
      
      notes.push({
        slug: file.replace('.md', ''),
        title: file.replace('.md', '').replace(/-/g, ' ').toUpperCase(),
        content: markdownContent
      });
    }
    
    return notes.sort((a,b) => a.title.localeCompare(b.title)); // Sorting might need improvement
  } catch (error) {
    console.error("Error fetching class notes:", error);
    return [];
  }
}

export async function getClassNote(slug: string): Promise<ClassNote | null> {
    try {
        const filePath = path.join(CLASS_DIR, `${slug}.md`);
        if (!fs.existsSync(filePath)) return null;
        
        const content = fs.readFileSync(filePath, 'utf-8');
        const { content: markdownContent } = matter(content);

        return {
            slug,
            title: slug.replace(/-/g, ' ').toUpperCase(),
            content: markdownContent
        };
    } catch (error) {
        return null;
    }
}
