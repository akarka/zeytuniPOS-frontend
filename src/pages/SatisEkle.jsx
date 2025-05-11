import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';


function SatisEkle() {
    const [urunId, setUrunId] = useState('');
    const [urunAd, setUrunAd] = useState([]);
    const [miktar, setMiktar] = useState('');
    const [satisFiyati, setSatisFiyati] = useState('');

    useEffect(() => {
        api.get('/urunler')
            .then(res => {
                console.log("Urunler geldi:", res.data);

                const donustur = res.data.map(urun => ({
                    id: urun.id,
                    label: urun.ad  // ad → label
                }));

                setUrunAd(donustur);
            })
            .catch(err => console.error("Urun cekme hatasi:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/satislar', {
                urunId,
                satisFiyati: parseFloat(satisFiyati),
                miktar: parseFloat(miktar),
            });

            alert(`Satış eklendi: ${response.data.urunId}`);
            setUrunId('');
            setSatisFiyati('');
            setMiktar('');
        } catch (error) {
            alert('Hata: ' + error.message);
        }
    };


    return (
        <div>
            <nav>
                <Link to="/">Ana Sayfa</Link>
            </nav>

            <form onSubmit={handleSubmit}>
                <h2>Yeni Satış</h2>
                <SelectField
                    label="Ürün İsmi"
                    value={urunId}
                    onChange={(e) => setUrunId(e.target.value)}
                    options={urunAd}
                />

                <InputField
                    label="Miktar"
                    type="number"
                    value={miktar}
                    onChange={(e) => setMiktar(e.target.value)}
                    placeholder="Örn: 250"
                />

                <InputField
                    label="Fiyat (₺)"
                    type="number"
                    value={satisFiyati}
                    onChange={(e) => setSatisFiyati(e.target.value)}
                    placeholder="Örn: 250"
                />



                <button type="submit" style={{ padding: '10px 20px' }}>Kaydet</button>
            </form>
        </div>

    );
    
};


export default SatisEkle;
