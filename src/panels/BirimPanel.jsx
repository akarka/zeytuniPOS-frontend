import { useState, useEffect } from 'react';
import BirimEkleModule from '../panels/modules/BirimEkleModule';
import BirimListeModule from '../panels/modules/BirimListeModule';
import api from '../util/api';

export default function BirimPanel() {
  const [birimler, setBirimler] = useState([]);
  const [yeniBirim, setYeniBirim] = useState('');
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchBirimler();
  }, []);

  const fetchBirimler = async () => {
    const res = await api.get('/api/birimler/dto');
    setBirimler(res.data);
  };

  const handleEkle = async () => {
    if (!yeniBirim.trim()) return;
    await api.post('/api/birimler/dto', { birimAdi: yeniBirim });
    setYeniBirim('');
    fetchBirimler();
  };

  const handleGuncelle = async () => {
    await api.put('/api/birimler/dto', duzenlenen);
    setDuzenlenen(null);
    fetchBirimler();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/birimler/${id}`);
    fetchBirimler();
  };

  return (
    <div className="flex gap-6 h-[350px]">
      <div className="basis-1/4 border-r pr-4">
          <h3 className="text-lg font-bold mb-6 text-center">Yeni Birim</h3>
        <BirimEkleModule
          yeniBirim={yeniBirim}
          setYeniBirim={setYeniBirim}
          handleEkle={handleEkle}
        />
      </div>
      <div className="basis-3/4 pl-4">
        <BirimListeModule
          birimler={birimler}
          duzenlenen={duzenlenen}
          setDuzenlenen={setDuzenlenen}
          handleGuncelle={handleGuncelle}
          handleSil={handleSil}
        />
      </div>
    </div>
  );
}
