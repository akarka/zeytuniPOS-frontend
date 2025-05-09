import { Link } from 'react-router-dom';

function AnaSayfa1() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Dükkan Yönetim Paneli</h1>

            <div style={{ marginTop: '30px' }}>
                <Link to="/urun" style={{ marginRight: '20px', fontSize: '18px' }}>
                    Ürün Ekle
                </Link>

                <Link to="/satis" style={{ fontSize: '18px' }}>
                    Satış Ekle
                </Link>

            </div>
        </div>
    );
}

export default AnaSayfa1;


