import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

// 1. Tell our app exactly where the content folder is
const contentDirectory = path.join(process.cwd(), 'content');

// 2. Define the Zod schema for our frontmatter
const FrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string().optional(), 
  category: z.string().optional(),
  subcategory: z.string().optional(), 
  layout: z.string().optional(),
  author: z.string().optional(),
  authorEmail: z.string().optional(),
  image: z.string().optional(),
});

// Export a TypeScript type based on our schema
export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export type Post = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
};

// ---------------------------------------------------------
// NEW: RECURSIVE FOLDER SEARCHER
// ---------------------------------------------------------
// This function dives into folders and subfolders to find every .mdx file
export function getAllMdxFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    
    // If this item is a directory (like "2019" or "2026"), run the function again inside it
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMdxFiles(fullPath, arrayOfFiles);
    } else {
      // If it's a file and ends with .mdx, add its exact path to our list
      if (file.endsWith('.mdx')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

// ---------------------------------------------------------
// NEW: REUSABLE PARSING HELPER
// ---------------------------------------------------------
// This takes an absolute file path, reads it, validates it with Zod, and returns a Post object
function parsePost(filePath: string): Post {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // The slug is always just the file name (without .mdx), ignoring the folder it lives in
  const slug = path.basename(filePath, '.mdx');

  try {
    const validFrontmatter = FrontmatterSchema.parse(data);
    return {
      slug,
      frontmatter: validFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`\n🚨 FRONTMATTER ERROR IN FILE: [${slug}.mdx]`);
    console.error(`File Location: ${filePath}`);
    console.error("Please check that file to ensure 'title' and 'date' exist and are spelled correctly.\n");
    throw error;
  }
}

// ---------------------------------------------------------
// UPGRADED DATA FETCHING FUNCTIONS
// ---------------------------------------------------------

// 3. Function to get a single post by its slug
export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  
  // Get every single MDX file path in our content folder
  const allFiles = getAllMdxFiles(contentDirectory);
  
  // Find the exact path where the file name matches our slug
  const targetPath = allFiles.find(filePath => path.basename(filePath, '.mdx') === realSlug);

  if (!targetPath) {
    return null; // Return null if the post doesn't exist
  }

  // Parse and return the post using our helper
  return parsePost(targetPath);
}

// 4. Function to get all posts and sort them by date (newest first)
export function getAllPosts(): Post[] {
  // Get every single MDX file path
  const allFiles = getAllMdxFiles(contentDirectory);
  
  const posts = allFiles
    .map((filePath) => parsePost(filePath)) // Read and parse every file
    .sort((post1, post2) => {
      // Sort posts strictly chronologically (newest first)
      const time1 = new Date(post1.frontmatter.date).getTime();
      const time2 = new Date(post2.frontmatter.date).getTime();
      return time2 - time1;
    });
  
  return posts;
}

// 5. Function to get posts by a specific category
export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.frontmatter.category === category);
}