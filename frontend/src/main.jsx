import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Cho phép các trang dùng chung cache và trạng thái gọi API. */}
    <QueryClientProvider client={queryClient}>
      {/* Bọc toàn bộ ứng dụng bằng AuthProvider để quản lý đăng nhập / đăng ký / đăng xuất. */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
