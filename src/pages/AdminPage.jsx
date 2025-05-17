import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dükkan Yönetim Paneli</h1>

      <div style={{ marginTop: "30px" }}>
        <Link to="/urun" style={{ marginRight: "20px", fontSize: "18px" }}>
          Ürünler
        </Link>

        <Link to="/satis" style={{ marginRight: "20px", fontSize: "18px" }}>
          Satışlar
        </Link>

        <Link to="/tedarik" style={{ marginRight: "20px", fontSize: "18px" }}>
          Tedarikçiler
        </Link>

        <Link to="/islemlog" style={{ marginRight: "20px", fontSize: "18px" }}>
          İşlem Geçmişi
        </Link>

        <Link
          to="/admin/birimler"
          style={{ marginRight: "20px", fontSize: "18px" }}
        >
          BirimAdminPanel
        </Link>

        <Link to="/admin/altkategoriler" style={{ fontSize: "18px" }}>
          AltKategoriAdminPanel
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
