import { Outlet, Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="w-full h-16 bg-white shadow-sm border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            BlogAdmin
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pr-6 border-r border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <User size={18} />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 leading-none">Admin User</p>
              <p className="text-xs text-gray-500 mt-1">Super Admin</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-medium text-sm">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
