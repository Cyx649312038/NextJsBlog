import matter from "gray-matter";
import path from "path";
import fs from "fs";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPostFiles() {
  const postFiles = fs.readdirSync(postsDirectory);
  return postFiles;
}

export function getPostData(fileName) {
  const postSlug = fileName.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, postSlug + ".md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getAllPostFiles();
  const allPosts = postFiles.map((item) => {
    return getPostData(item);
  });
  const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((item) => item.isFeatured);
  return featuredPosts;
}
