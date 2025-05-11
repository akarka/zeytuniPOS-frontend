import { Link } from 'react-router-dom';

function AdminPage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Dükkan Yönetim Paneli</h1>

            <div style={{ marginTop: '30px' }}>
                <Link to="/urun" style={{ marginRight: '20px', fontSize: '18px' }}>
                    Ürün Ekle
                </Link>

                <Link to="/satis" style={{ marginRight: '20px',fontSize: '18px' }}>
                    Satış Ekle
                </Link>

                <Link to="/satislar" style={{ marginRight: '20px',fontSize: '18px' }}>
                    Satış Listesi
                </Link>

                <Link to="/islemlog" style={{ fontSize: '18px' }}>
                    İşlem Geçmişi
                </Link>


            </div>
        </div>
    );
}

export default AdminPage;


