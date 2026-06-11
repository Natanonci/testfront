import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';
import { blogSchema } from '../utils/validations';
import type { BlogFormData } from '../utils/validations';
import { useBlogStore } from '../store/useBlogStore';
import { BlogStatus } from '../types/blog';

const BlogFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, addBlog, updateBlog } = useBlogStore();
  
  const isEditMode = Boolean(id);
  const existingBlog = blogs.find((b) => b.id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
      coverImage: 'https://placehold.co/600x400',
      status: BlogStatus.PUBLIC,
    },
  });

  useEffect(() => {
    if (isEditMode && existingBlog) {
      reset({
        title: existingBlog.title,
        content: existingBlog.content,
        coverImage: existingBlog.coverImage,
        status: existingBlog.status,
      });
    } else if (isEditMode && !existingBlog) {
      navigate('/');
    }
  }, [isEditMode, existingBlog, reset, navigate]);

  const onSubmit = (data: BlogFormData) => {
    if (isEditMode && id) {
      updateBlog(id, {
        ...data,
        status: data.status as BlogStatus,
      });
    } else {
      const newBlog = {
        ...data,
        id: crypto.randomUUID(),
        status: data.status as BlogStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addBlog(newBlog);
    }
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to List
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border p-8 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Blog Title</label>
          <input
            {...register('title')}
            type="text"
            placeholder="Enter blog title"
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 transition-all ${
              errors.title ? 'border-red-500 focus:ring-red-200' : 'focus:ring-indigo-200 focus:border-indigo-500'
            }`}
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
          <input
            {...register('coverImage')}
            type="text"
            placeholder="https://example.com/image.jpg"
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 transition-all ${
              errors.coverImage ? 'border-red-500 focus:ring-red-200' : 'focus:ring-indigo-200 focus:border-indigo-500'
            }`}
          />
          {errors.coverImage && <p className="text-red-500 text-xs">{errors.coverImage.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register('status')}
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all bg-white"
          >
            <option value="public">Public</option>
            <option value="unpublic">Unpublic</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            {...register('content')}
            rows={8}
            placeholder="Write your blog content here..."
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 transition-all resize-none ${
              errors.content ? 'border-red-500 focus:ring-red-200' : 'focus:ring-indigo-200 focus:border-indigo-500'
            }`}
          />
          {errors.content && <p className="text-red-500 text-xs">{errors.content.message}</p>}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-all shadow-md hover:shadow-lg"
          >
            <Save className="w-5 h-5 mr-2" />
            {isEditMode ? 'Update Blog' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogFormPage;
