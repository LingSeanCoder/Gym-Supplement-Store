import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * ProtectedRoute kiểm tra quyền truy cập trước khi render các con.
 * - allowedRoles: mảng role được phép (ví dụ ['admin'], ['admin', 'staff']).
 * - Nếu chưa login -> redirect về /login.
 * - Nếu login nhưng role không khớp -> redirect về /403.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-night">
        <p className="text-white">Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    navigate('/login', { replace: true, state: { from: location } });
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    navigate('/403', { replace: true, state: { from: location } });
    return null;
  }

  return children;
}
