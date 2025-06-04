import { Navigate } from "react-router-dom";

function RequireAuth({ children, allowedRoles = [] }) {
  const kayitli = localStorage.getItem("aktifKullanici");
  const aktifKullanici = kayitli ? JSON.parse(kayitli) : null;

  if (!aktifKullanici) {
    return <Navigate to="/login" />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(aktifKullanici.rolId)
  ) {
    return <div style={{ padding: "20px", color: "crimson" }}>
      Bu sayfaya erişim yetkiniz yok.
    </div>;
  }

  return children;
}

export default RequireAuth;
