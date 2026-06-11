import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import BlogListPage from './pages/BlogListPage';
import BlogFormPage from './pages/BlogFormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<BlogListPage />} />
          <Route path="/blog/new" element={<BlogFormPage />} />
          <Route path="/blog/edit/:id" element={<BlogFormPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
