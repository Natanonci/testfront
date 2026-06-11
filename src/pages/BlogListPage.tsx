import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';
import { BlogStatus } from '../types/blog';

const BlogListPage = () => {
  const navigate = useNavigate();
  const { blogs, deleteBlog } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BlogStatus>('all');

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [blogs, searchTerm, statusFilter]);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlog(id);
    }
  };

  const tabs = [
    { id: 'all', label: 'All Posts' },
    { id: BlogStatus.PUBLIC, label: 'Public' },
    { id: BlogStatus.UNPUBLIC, label: 'Unpublic' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search blogs..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm shadow-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/blog/new')}
          className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>Create New Post</span>
        </button>
      </div>

      {/* Grid Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              
              {/* Image Constraint */}
              <img src={blog.coverImage} className="w-full h-48 object-cover border-b border-gray-100" alt="cover" />
              
              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug">{blog.title}</h3>
                  <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full shrink-0 border ${
                    blog.status === 'public' 
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {blog.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-bold mt-auto uppercase tracking-tighter">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto grid grid-cols-2 border-t border-gray-100 divide-x divide-gray-100">
                <button 
                  onClick={() => navigate(`/blog/edit/${blog.id}`)}
                  className="p-3 text-blue-600 hover:bg-blue-50 flex justify-center items-center gap-2 text-sm font-medium transition-colors"
                >
                  <Edit size={16}/> Edit
                </button>
                <button 
                  onClick={() => handleDelete(blog.id, blog.title)}
                  className="p-3 text-red-600 hover:bg-red-50 flex justify-center items-center gap-2 text-sm font-medium transition-colors"
                >
                  <Trash2 size={16}/> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-inner">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search className="text-gray-300" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
