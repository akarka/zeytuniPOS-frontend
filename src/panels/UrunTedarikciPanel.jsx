// src/panels/UrunTedarikciPanel.jsx
import { useEffect, useState } from 'react';
import api from '../util/api';
import UrunTedarikciEkleModule from './modules/UrunTedarikciEkleModule';
import UrunTedarikciListeModule from './modules/UrunTedarikciListeModule';

export default function UrunTedarikciPanel() {
  const [veriler, setVeriler] = useState([]);
  const [urunler, setUrunler] = useState([]);
  const [tedarikciler, setTedarikciler] = useState([]);
  const [yeni, setYeni] = useState({
    urunId: '',
    tedarikciId: '',
    alisFiyati: '',
    tarih: '',
  });
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchData();
    api
      .get('/api/urunler/dto')
      .then((res) =>
        setUrunler(res.data.map((u) => ({ id: u.urunId, label: u.urunAdi }))),
      );
    api.get('/api/tedarikciler/dto').then((res) =>
      setTedarikciler(
        res.data.map((t) => ({
          id: t.tedarikciId,
          label: t.tedarikciAdi,
        })),
      ),
    );
  }, []);

  const fetchData = async () => {
    const res = await api.get('/api/uruntedarikci/dto');
    setVeriler(res.data);
  };

  const handleEkle = async () => {
    await api.post('/api/uruntedarikci/dto', {
      ...yeni,
      alisFiyati: parseFloat(yeni.alisFiyati),
    });
    setYeni({ urunId: '', tedarikciId: '', alisFiyati: '', tarih: '' });
    fetchData();
  };

  const handleGuncelle = async () => {
    await api.put(`/api/uruntedarikci/dto/${duzenlenen.urunTedarikciId}`, {
      ...duzenlenen,
      alisFiyati: parseFloat(duzenlenen.alisFiyati),
    });
    setDuzenlenen(null);
    fetchData();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/uruntedarikci/${id}`);
    fetchData();
  };

  return (
    <div className="flex gap-6">
      <div className="basis-1/4 border-r pr-4">
        <UrunTedarikciEkleModule
          urunler={urunler}
          tedarikciler={tedarikciler}
          yeni={yeni}
          setYeni={setYeni}
          handleEkle={handleEkle}
        />
      </div>
      <div className="basis-3/4 pl-4">
        <UrunTedarikciListeModule
          veriler={veriler}
          urunler={urunler}
          tedarikciler={tedarikciler}
          duzenlenen={duzenlenen}
          setDuzenlenen={setDuzenlenen}
          handleGuncelle={handleGuncelle}
          handleSil={handleSil}
        />
      </div>
    </div>
  );
}
