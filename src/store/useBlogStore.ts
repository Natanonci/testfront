import { create } from 'zustand';
import type { Blog } from '../types/blog';
import { BlogStatus } from '../types/blog';
import { mockBlogs } from '../data/mockBlogs';

interface BlogState {
  blogs: Blog[];
  addBlog: (blog: Blog) => void;
  updateBlog: (id: string, updatedBlog: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  toggleStatus: (id: string) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: mockBlogs,
  
  addBlog: (blog) => 
    set((state) => ({ 
      blogs: [blog, ...state.blogs] 
    })),

  updateBlog: (id, updatedBlog) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog.id === id 
          ? { ...blog, ...updatedBlog, updatedAt: new Date().toISOString() } 
          : blog
      ),
    })),

  deleteBlog: (id) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== id),
    })),

  toggleStatus: (id) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              status: blog.status === BlogStatus.PUBLIC ? BlogStatus.UNPUBLIC : BlogStatus.PUBLIC,
              updatedAt: new Date().toISOString(),
            }
          : blog
      ),
    })),
}));
