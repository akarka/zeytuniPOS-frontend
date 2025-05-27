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
          Birim Panel
        </Link>
        <Link
          to="/admin/urunkategorileri"
          style={{ marginRight: "20px", fontSize: "18px" }}
        >
          Ürün Kategori Panel
        </Link>
        <Link
          to="/admin/uruntedarikci"
          style={{ marginRight: "20px", fontSize: "18px" }}
        >
          Ürün Tedarikçi İlişkileri
        </Link>
        <Link
          to="/admin/tedarikcialtkategori"
          style={{ marginRight: "20px", fontSize: "18px" }}
        >
          Tedarikçi Kategorileri
        </Link>
        <Link to="/admin/altkategoriler" style={{ fontSize: "18px" }}>
          Alt Kategori Panel
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
