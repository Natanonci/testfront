export const BlogStatus = {
  PUBLIC: 'public',
  UNPUBLIC: 'unpublic',
} as const;

export type BlogStatus = typeof BlogStatus[keyof typeof BlogStatus];

export interface Blog {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
}
