
import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.join(process.cwd(), '..');

export interface Assignment {
  slug: string;
  title: string;
  liveLink?: string;
  image?: string;
  readmeContent: string;
}

export interface Lab {
  slug: string;
  title: string;
  files: { name: string; content: string }[];
}

export interface Blog {
  content: string;
}

// Assignments
export async function getAssignments(): Promise<Assignment[]> {
  const assignmentsDir = path.join(ROOT_DIR, 'assignment');
  
  if (!fs.existsSync(assignmentsDir)) return [];

  const folders = fs.readdirSync(assignmentsDir).filter(file => {
    return fs.statSync(path.join(assignmentsDir, file)).isDirectory();
  });

  const assignments = folders.map(folder => {
    const folderPath = path.join(assignmentsDir, folder);
    const submissionPath = path.join(folderPath, 'Submission.md');
    const questionPath = path.join(folderPath, 'Question.md');
    
    let liveLink = '';
    let image = '';
    
    // Parse Submission.md for metadata
    if (fs.existsSync(submissionPath)) {
      const content = fs.readFileSync(submissionPath, 'utf-8');
      
      // Extract Live Link
      const linkMatch = content.match(/Live link\s*:\s*(https?:\/\/[^\s]+)/i) || content.match(/\[.*?\]\((https?:\/\/[^\s]+)\)/);
      if (linkMatch) liveLink = linkMatch[1];
      
      // Extract Image
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/) || content.match(/!\[.*?\]\((.*?)\)/);
      if (imgMatch) image = imgMatch[1];
    }

    // Get Title from folder name or Question.md
    let title = folder.replace(/-/g, ' ');
    if (fs.existsSync(questionPath)) {
        const questionContent = fs.readFileSync(questionPath, 'utf-8');
        const titleMatch = questionContent.match(/^#\s+(.+)/m);
        if (titleMatch) title = titleMatch[1].trim();
    }

    return {
      slug: folder,
      title: title,
      liveLink,
      image,
      readmeContent: fs.existsSync(questionPath) ? fs.readFileSync(questionPath, 'utf-8') : ''
    };
  });

  return assignments;
}

// Labs
export async function getLabs(): Promise<Lab[]> {
  const labsDir = path.join(ROOT_DIR, 'js-labs');
  
  if (!fs.existsSync(labsDir)) return [];

  const folders = fs.readdirSync(labsDir).filter(file => {
    return fs.statSync(path.join(labsDir, file)).isDirectory();
  });

  const labs = folders.map(folder => {
    const folderPath = path.join(labsDir, folder);
    const srcPath = path.join(folderPath, 'src');
    
    let files: { name: string; content: string }[] = [];
    
    if (fs.existsSync(srcPath)) {
      files = fs.readdirSync(srcPath)
        .filter(file => file.endsWith('.js') || file.endsWith('.ts'))
        .map(file => ({
          name: file,
          content: fs.readFileSync(path.join(srcPath, file), 'utf-8')
        }));
    }

    return {
      slug: folder,
      title: folder.replace(/-/g, ' '),
      files
    };
  });

  return labs;
}

// Blogs
export async function getBlogContent(): Promise<string> {
  const blogPath = path.join(ROOT_DIR, 'blogs', 'README.md');
  if (fs.existsSync(blogPath)) {
    return fs.readFileSync(blogPath, 'utf-8');
  }
  return '';
}
