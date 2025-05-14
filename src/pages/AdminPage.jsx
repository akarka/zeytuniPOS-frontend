import { Link } from 'react-router-dom';

function AdminPage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Dükkan Yönetim Paneli</h1>

            <div style={{ marginTop: '30px' }}>
                <Link to="/urun" style={{ marginRight: '20px', fontSize: '18px' }}>
                    Ürünler
                </Link>

                <Link to="/satis" style={{ marginRight: '20px', fontSize: '18px' }}>
                    Satışlar
                </Link>

                <Link to="/tedarik" style={{ marginRight: '20px', fontSize: '18px' }}>
                    Tedarikçiler
                </Link>

                <Link to="/islemlog" style={{ fontSize: '18px' }}>
                    İşlem Geçmişi
                </Link>
            </div>
        </div>
    );
}

export default AdminPage;


