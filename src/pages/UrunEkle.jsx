import { useState, useEffect } from 'react';
import api from '../services/api';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';

function UrunEkle() {
  const [ad, setAd] = useState('');
  const [satisFiyati, setSatisFiyati] = useState('');
  const [altId, setAltId] = useState('');
  const [altKate, setAltKate] = useState([]);
  const [birimId, setBirimId] = useState('');
  const [birim, setBirim] = useState([]);

  useEffect(() => {
    api.get('/birimler')
      .then(res => {
        console.log("Birimler geldi:", res.data);

        const donustur = res.data.map(birim => ({
          id: birim.id,
          label: birim.ad  // ad → label
        }));

        setBirim(donustur);
      })
      .catch(err => console.error("Birim cekme hatasi:", err));
  }, []);

  useEffect(() => {
    api.get('/altkategoriler')
      .then(res => {
        console.log("AltKategoriler geldi:", res.data);

        const donustur = res.data.map(altKate => ({
          id: altKate.id,
          label: altKate.ad  // ad → label
        }));

        setAltKate(donustur);
      })
      .catch(err => console.error("Alt Kategori cekme hatasi:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/urunler', {
        ad,
        satisFiyati: parseFloat(satisFiyati),
        altId: parseFloat(altId),
        birimId: parseFloat(birimId)
      });

      alert(`Ürün eklendi: ${response.data.ad}`);
      setAd('');
      setSatisFiyati('');
      setAltId('');
      setBirimId('');
    } catch (error) {
      alert('Hata: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Yeni Ürün Ekle</h2>
      <InputField
        label="Ürün İsmi"
        value={ad}
        onChange={(e) => setAd(e.target.value)}
        placeholder="Örn: Ezine Peyniri"
      />

      <InputField
        label="Fiyat (₺)"
        type="number"
        value={satisFiyati}
        onChange={(e) => setSatisFiyati(e.target.value)}
        placeholder="Örn: 250"
      />

      <SelectField
        label="Alt Kategori"
        value={altId}
        onChange={(e) => setAltId(e.target.value)}
        options={altKate}

      />

      <SelectField
        label="Birim"
        value={birimId}
        onChange={(e) => setBirimId(e.target.value)}
        options={birim}
      />

      <button type="submit" style={{ padding: '10px 20px' }}>Kaydet</button>
    </form>
  );
}

export default UrunEkle;
