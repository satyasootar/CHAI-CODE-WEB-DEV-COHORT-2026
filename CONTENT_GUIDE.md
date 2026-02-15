# Content Update Guide

This website is built to **automatically update** whenever you push new content to this repository.  
Follow these naming conventions and folder structures to ensure your new work appears correctly on the site.

---

## 1. Assignments
**Folder Location:** `assignment/`  
Each assignment should be a **folder** inside the `assignment` directory.

### Structure
```
assignment/
  └── my-new-project/          <-- Folder Name becomes the Title
       ├── Submission.md       <-- REQUIRED
       └── screenshot.png      <-- Optional (but recommended)
```

### File Content (`Submission.md`)
The website extracts metadata from your markdown file. Ensure you include:
1. **Description**: The first paragraph of text will be used as the description on the card.
2. **Live Link**: A line containing "Live link : https://..."
3. **Screenshot**: An image tag `src="..."` pointing to your screenshot.

**Example `Submission.md`:**
```markdown
# My New Project

This is a robust full-stack application that helps users track their tasks. 
It uses React, Node.js, and MongoDB.  <-- This paragraph becomes the card description.

### Links
- Live link : https://my-project-demo.vercel.app

### Preview
![Project Screenshot](./screenshot.png)
```

---

## 2. JavaScript Labs
**Folder Location:** `js-labs/`  
Labs are grouped by category (folders).

### Structure
```
js-labs/
  └── Arrays/                  <-- Category Name
       └── src/
            ├── 01_map.js      <-- Lab File
            └── 02_filter.js
```
*Note: The metadata reader also looks in the category root if `src` is missing, but `src` is preferred.*

---

## 3. Technical Blogs
**Folder Location:** `Blogs/` (Note the Capital 'B')

To add a new blog, you don't need to add a file. Instead, **edit the `README.md`** inside the `Blogs` folder.

### Format (`Blogs/README.md`)
Add a new row to the table:

```markdown
| **Blog Title** | Short Description of what the blog is about | [Read More](https://dev.to/your-blog-link) |
```

---

## 4. Class Notes
**Folder Location:** `Class/` (Note the Capital 'C')

Add a new Markdown file for each session.

### Structure
```
Class/
  ├── full-stack-architecture.md   <-- Filename becomes the slug
  └── react-hooks-deep-dive.md
```

### File Content
The content of the markdown file will be rendered on the website.
Title is derived from the filename (e.g., "Full Stack Architecture").

---

## Summary Checklist
1. **Assignments**: New folder in `assignment/` + `Submission.md` (with Live Link/Description).
2. **Labs**: New `.js` file in `js-labs/<Category>/src/`.
3. **Blogs**: Add row to `Blogs/README.md`.
4. **Notes**: New `.md` file in `Class/`.

**After adding files, simply run:**
```bash
git add .
git commit -m "Added new content"
git push
```
Vercel will detect the push and redeploy your site automatically!
