import type { Blog } from '../types/blog';
import { BlogStatus } from '../types/blog';

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React 19',
    content: 'React 19 brings many exciting new features like Actions, useFormStatus, and useOptimistic...',
    coverImage: 'https://picsum.photos/seed/react19/600/400',
    status: BlogStatus.PUBLIC,
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    title: 'Tailwind CSS v4 Deep Dive',
    content: 'The new engine in Tailwind v4 is incredibly fast and simplifies many common patterns...',
    coverImage: 'https://picsum.photos/seed/tailwind/600/400',
    status: BlogStatus.PUBLIC,
    createdAt: new Date('2024-01-05').toISOString(),
    updatedAt: new Date('2024-01-05').toISOString(),
  },
  {
    id: '3',
    title: 'Zustand vs Redux in 2024',
    content: 'Why modern teams are choosing simpler state management solutions like Zustand...',
    coverImage: 'https://picsum.photos/seed/zustand/600/400',
    status: BlogStatus.UNPUBLIC,
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: '4',
    title: 'Building Scalable Dashboards',
    content: 'Architecting frontend applications for long-term maintainability and performance...',
    coverImage: 'https://picsum.photos/seed/dashboard/600/400',
    status: BlogStatus.PUBLIC,
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '5',
    title: 'TypeScript Best Practices',
    content: 'Advanced TypeScript patterns that will make your codebase more robust and type-safe...',
    coverImage: 'https://picsum.photos/seed/typescript/600/400',
    status: BlogStatus.UNPUBLIC,
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
  },
];
