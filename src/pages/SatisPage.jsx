import { useEffect, useState } from 'react';
import api from '../util/api';
import SatisEkleModule from '../panels/modules/SatisEkleModule';
import SatisListeModule from '../panels/modules/SatisListeModule';

function SatisPage() {
  const [satislar, setSatislar] = useState([]);
  const [urunSecenekleri, setUrunSecenekleri] = useState([]);
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchSatislar();
    api.get('/api/urunler/dto').then((res) => {
      const urunOpts = res.data.map((u) => ({
        id: u.urunId,
        label: u.urunAdi,
      }));
      setUrunSecenekleri(urunOpts);
    });
  }, []);

  const fetchSatislar = async () => {
    const res = await api.get('/api/satislar/dto');
    setSatislar(res.data);
  };

  const handleEkle = async (yeniSatis) => {
    await api.post('/api/satislar/dto', yeniSatis);
    fetchSatislar();
  };

  const handleGuncelle = async () => {
    await api.put('/api/satislar/dto', duzenlenen);
    setDuzenlenen(null);
    fetchSatislar();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/satislar/${id}`);
    fetchSatislar();
  };

  return (
    <div className="flex gap-6">
      <div className="basis-1/4 border-r pr-4">
        <SatisEkleModule
          urunSecenekleri={urunSecenekleri}
          onEkle={handleEkle}
        />
      </div>
      <div className="basis-3/4 pl-4">
        <SatisListeModule
          satislar={satislar}
          urunSecenekleri={urunSecenekleri}
          duzenlenen={duzenlenen}
          setDuzenlenen={setDuzenlenen}
          handleGuncelle={handleGuncelle}
          handleSil={handleSil}
        />
      </div>
    </div>
  );
}

export default SatisPage;
