import { useState } from 'react';
import api from '../services/api';

function UrunEkle() {
  const [ad, setAd] = useState('');
  const [satisFiyati, setSatisFiyati] = useState('');
  const [altId, setAltId] = useState('');
  const [birimId, setBirimId] = useState('');


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
      <input
        type="text"
        placeholder="Ürün İsmi"
        value={ad}
        onChange={(e) => setAd(e.target.value)}
      />
      <input
        type="number"
        placeholder="Satış Fiyatı"
        value={satisFiyati}
        onChange={(e) => setSatisFiyati(e.target.value)}
      />
      <input
        type="number"
        placeholder="Hangi Tür"
        value={altId}
        onChange={(e) => setAltId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Birim Tipi"
        value={birimId}
        onChange={(e) => setBirimId(e.target.value)}
      />
      <button type="submit">Kaydet</button>
    </form>
  );
}

export default UrunEkle;
