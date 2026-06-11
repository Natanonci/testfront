import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <nav className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="text-xl font-bold text-blue-600">BlogAdmin</Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Admin User</span>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">Logout</button>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet/>
      </main>
    </div>
  );
}
