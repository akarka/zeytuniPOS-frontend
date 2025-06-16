import { useEffect, useState } from 'react';
import api from '../util/api';
import SatisEkleModule from '../panels/modules/SatisEkleModule';
import SatisListeModule from '../panels/modules/SatisListeModule';
import ContentContainer from '../components/ContentContainer';

function SatisPage() {
  const [satislar, setSatislar] = useState([]);
  const [urunSecenekleri, setUrunSecenekleri] = useState([]);
  const [duzenlenen, setDuzenlenen] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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
    try {
      await api.post('/api/satislar/dto', yeniSatis);
      fetchSatislar();
      setErrorMessage('');
    } catch (error) {
      if (
        error.response?.status === 400 &&
        typeof error.response.data === 'object'
      ) {
        const values = Object.values(error.response.data);
        setErrorMessage(values[0] || 'Lütfen eksik alanları kontrol edin.');
      } else if (error.response?.status === 403) {
        setErrorMessage('Bu işlem için yetkiniz yok.');
      } else {
        setErrorMessage('Sunucu hatası oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  const handleGuncelle = async () => {
    try {
      await api.put('/api/satislar/dto', duzenlenen);
      setDuzenlenen(null);
      fetchSatislar();
      setErrorMessage('');
    } catch (error) {
      if (
        error.response?.status === 400 &&
        typeof error.response.data === 'object'
      ) {
        const values = Object.values(error.response.data);
        setErrorMessage(
          values[0] || 'Lütfen eksik veya hatalı alanları düzeltin.',
        );
      } else if (error.response?.status === 403) {
        setErrorMessage('Bu işlem için yetkiniz yok.');
      } else {
        setErrorMessage('Sunucu hatası oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  const handleSil = async (id) => {
    await api.delete(`/api/satislar/${id}`);
    fetchSatislar();
  };

  return (
    <ContentContainer>
      <h2 className="text-xl font-bold mb-6 text-center">Satış Yönetimi</h2>
      {errorMessage && (
        <div className="text-center text-red-600 text-sm font-semibold mb-4">
          {errorMessage}
        </div>
      )}
      <div className="flex gap-6 h-[560px] overflow-y-auto border rounded shadow-sm p-4 bg-white">
        <div className="basis-1/4 border-r pr-4">
          <h3 className="text-lg font-bold mb-6 text-center">Yeni Satış</h3>
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
    </ContentContainer>
  );
}

export default SatisPage;
