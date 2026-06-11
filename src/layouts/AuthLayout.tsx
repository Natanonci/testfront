import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Blog Admin</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
