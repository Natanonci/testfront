import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long').nonempty('Title is required'),
  content: z.string().nonempty('Content is required'),
  coverImage: z.string().url('Invalid URL').nonempty('Cover image URL is required'),
  status: z.enum(['public', 'unpublic']),
});

export type BlogFormData = z.infer<typeof blogSchema>;
