import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../util/api';
import ContentContainer from '../components/ContentContainer';
import TedarikciEkleModule from '../panels/modules/TedarikciEkleModule';
import TedarikciListeModule from '../panels/modules/TedarikciListeModule';

function TedarikciPage() {
  const [tedarikciler, setTedarikciler] = useState([]);
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchTedarikciler();
  }, []);

  const fetchTedarikciler = async () => {
    const res = await api.get('/api/tedarikciler/dto');
    setTedarikciler(res.data);
  };

  const handleEkle = async (yeniTedarikci) => {
    await api.post('/api/tedarikciler/dto', yeniTedarikci);
    fetchTedarikciler();
  };

  const handleGuncelle = async () => {
    await api.put('/api/tedarikciler/dto', duzenlenen);
    setDuzenlenen(null);
    fetchTedarikciler();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/tedarikciler/${id}`);
    fetchTedarikciler();
  };

  return (
    <ContentContainer>
      <h2 className="text-xl font-bold mb-6 text-center">Tedarikçi Yönetimi</h2>
      <div className="flex gap-6 h-[560px] overflow-y-auto border rounded shadow-sm p-4 bg-white">
        <div className="basis-1/4 border-r pr-4">
          <h3 className="text-lg font-bold mb-6 text-center">Yeni Tedarikçi</h3>
          <TedarikciEkleModule onEkle={handleEkle} />
        </div>
        <div className="basis-3/4 pl-4">
          <TedarikciListeModule
            tedarikciler={tedarikciler}
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

export default TedarikciPage;
