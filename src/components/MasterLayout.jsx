import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function MasterLayout({ aktifKullanici, setAktifKullanici }) {
  const handleLogout = () => {
    localStorage.removeItem("aktifKullanici");
    setAktifKullanici(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1200px",
        minWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Üst bar */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px 20px",
          borderBottom: "1px solid #ccc",
          position: "sticky",
          margin: "0 auto",
          top: 0,
          zIndex: 1000,
        }}
      >
        Hoş geldin, {aktifKullanici?.kullaniciAdi} |
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Çıkış Yap
        </button>
        <div className="p-4 max-w-6xl mx-auto">
          <Link to="/" className="text-blue-600 underline">
            Ana Sayfa
          </Link>
        </div>
      </div>

      {/* Ana içerik */}
      <main
        style={{
          flex: 1,
          padding: "24px",
          backgroundColor: "#fafafa",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default MasterLayout;
