import { useEffect, useState } from 'react';
import api from '../util/api';
import ContentContainer from '../components/ContentContainer';
import UrunEkleModule from '../panels/modules/UrunEkleModule';
import UrunListeModule from '../panels/modules/UrunListeModule';
import { useOutletContext } from 'react-router-dom';

function UrunPage() {
  const [urunler, setUrunler] = useState([]);
  const [birimSecenekleri, setBirimSecenekleri] = useState([]);
  const [altKategoriSecenekleri, setAltKategoriSecenekleri] = useState([]);
  const [duzenlenen, setDuzenlenen] = useState(null);
  const { aktifKullanici } = useOutletContext();
  const rolId = aktifKullanici?.rolId;

  useEffect(() => {
    fetchUrunler();

    api.get('/api/birimler/dto').then((res) => {
      const opts = res.data.map((b) => ({
        id: b.birimId,
        label: b.birimAdi,
      }));
      setBirimSecenekleri(opts);
    });

    api.get('/api/altkategoriler/dto').then((res) => {
      const opts = res.data.map((a) => ({
        id: a.altkId,
        label: a.altkAdi,
      }));
      setAltKategoriSecenekleri(opts);
    });
  }, []);

  const fetchUrunler = async () => {
    const res = await api.get('/api/urunler/dto');
    setUrunler(res.data);
  };

  const handleEkle = async (yeniUrun) => {
    await api.post('/api/urunler/dto', yeniUrun);
    fetchUrunler();
  };

  const handleGuncelle = async () => {
    await api.put('/api/urunler/dto', duzenlenen);
    setDuzenlenen(null);
    fetchUrunler();
  };

  const handleSil = async (id) => {
    try {
      await api.delete(`/api/urunler/${id}`);
      fetchUrunler();
    } catch (error) {
      console.error('Silme hatası:', error.response?.data || error.message);
    }
  };

  return (
    <ContentContainer>
      <h2 className="text-xl font-bold mb-6 text-center">Ürün Yönetimi</h2>
      <div className="flex gap-6 h-[560px] overflow-y-auto border rounded shadow-sm p-4 bg-white">
        {aktifKullanici.rolId === 1 || aktifKullanici.rolId === 2 ? (
          <div className="basis-1/4 border-r pr-4">
            <h3 className="text-lg font-bold mb-6 text-center">Yeni Ürün</h3>
            <UrunEkleModule
              birimSecenekleri={birimSecenekleri}
              altKategoriSecenekleri={altKategoriSecenekleri}
              onEkle={handleEkle}
            />
          </div>
        ) : null}
        <div className="basis-3/4 pl-4">
          <UrunListeModule
            urunler={urunler}
            duzenlenen={duzenlenen}
            setDuzenlenen={setDuzenlenen}
            handleGuncelle={handleGuncelle}
            handleSil={handleSil}
            birimSecenekleri={birimSecenekleri}
            altKategoriSecenekleri={altKategoriSecenekleri}
            rolId={rolId}
          />
        </div>
      </div>
    </ContentContainer>
  );
}

export default UrunPage;
