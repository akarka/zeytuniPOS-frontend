import { Link } from 'react-router-dom';

function AdminPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ marginTop: '30px' }}>
        {/* Satır 1: Herkes */}
        <div style={{ marginBottom: '20px' }}>
          <Link
            to="/satis"
            style={{ marginRight: '20px', fontSize: '18px' }}
          >
            Satışlar
          </Link>
          <Link
            to="/siparis"
            style={{ marginRight: '20px', fontSize: '18px' }}
          >
            Sipariş
          </Link>
        </div>

        {/* Satır 2: Editor ve Admin */}
        <div style={{ marginBottom: '20px' }}>
          <Link
            to="/urun"
            style={{ marginRight: '20px', fontSize: '18px' }}
          >
            Ürünler
          </Link>
          <Link
            to="/tedarik"
            style={{ marginRight: '20px', fontSize: '18px' }}
          >
            Tedarikçiler
          </Link>
        </div>

        {/* Satır 3: Sadece Admin */}
        <div style={{ marginBottom: '20px' }}>
          <Link
            to="/admin/yonetimkontrol"
            style={{ marginRight: '20px', fontSize: '18px' }}
          >
            Yönetimsel Araçlar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
