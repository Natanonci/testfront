import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 mt-4 w-full">
        {/* Left Side: Search and Tabs Group */}
        <div className="flex flex-1 items-center gap-4 w-full">
          <input 
            type="text" 
            placeholder="Search blogs..." 
            className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex bg-gray-100 p-1 rounded-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                  statusFilter === tab.id
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Right Side: Create Button */}
        <button 
          onClick={() => navigate('/blog/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
        >
          + Create New Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 w-full">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div 
              key={blog.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              <img 
                src={blog.coverImage} 
                alt={blog.title} 
                className="w-full h-48 object-cover border-b border-gray-100" 
              />
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">{blog.title}</h3>
                  <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full shrink-0 border ${
                    blog.status === BlogStatus.PUBLIC 
                      ? 'bg-green-100 text-green-700 border-green-200' 
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}>
                    {blog.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-tighter">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                 <button 
                   onClick={() => navigate(`/blog/edit/${blog.id}`)}
                   className="text-blue-600 hover:text-blue-800 text-sm font-bold uppercase tracking-widest"
                 >
                   Edit
                 </button>
                 <button 
                   onClick={() => handleDelete(blog.id, blog.title)}
                   className="text-red-600 hover:text-red-800 text-sm font-bold uppercase tracking-widest"
                 >
                   Delete
                 </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center bg-white rounded-xl border-2 border-dashed border-gray-200">
            <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest">No Articles Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
