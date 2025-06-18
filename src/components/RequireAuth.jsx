import { Navigate } from 'react-router-dom';
import ContentContainer from './ContentContainer';

function RequireAuth({ children, allowedRoles = [] }) {
  const kayitli = localStorage.getItem('aktifKullanici');
  const aktifKullanici = kayitli ? JSON.parse(kayitli) : null;

  if (!aktifKullanici) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(aktifKullanici.rolId)) {
    return (
      <ContentContainer>
        <h1 className="text-xl font-bold mb-6 text-center">
          Bu sayfaya erişim yetkiniz yok.
        </h1>
      </ContentContainer>
    );
  }

  return children;
}

export default RequireAuth;
