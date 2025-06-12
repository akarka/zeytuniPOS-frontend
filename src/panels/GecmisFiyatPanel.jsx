import { useEffect, useState } from 'react';
import api from '../util/api';
import ContentContainer from '../components/ContentContainer';
import GecmisDetayModule from './modules/GecmisDetayModule';
import GecmisListeModule from './modules/GecmisListeModule';

function GecmisFiyatPage() {
  const [kayitlar, setKayitlar] = useState([]);
  const [detaylar, setDetaylar] = useState({});
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchVeriler();
  }, []);

  const fetchVeriler = async () => {
    try {
      const res = await api.get('/api/gecmisfiyat/dto');

      const latestByUrun = new Map();
      res.data.forEach((item) => {
        const current = latestByUrun.get(item.urunId);
        if (!current || new Date(item.tarih) > new Date(current.tarih)) {
          latestByUrun.set(item.urunId, item);
        }
      });

      setKayitlar([...latestByUrun.values()]);
    } catch (err) {
      console.error('Veri alınamadı:', err);
    }
  };

  const toggleDetayGoster = async (urunId) => {
    const isAyniUrun = expanded === urunId;

    if (isAyniUrun) {
      setExpanded(null);
      return;
    }

    const detayZatenYuklu = detaylar[urunId];
    if (!detayZatenYuklu) {
      try {
        const res = await api.get(`/api/gecmisfiyat/dto/urun/${urunId}`);
        setDetaylar((prev) => ({ ...prev, [urunId]: res.data }));
      } catch (err) {
        console.error('Detay verisi alınamadı:', err);
        return;
      }
    }

    setExpanded(urunId);
  };

  return (
    <ContentContainer>
      <div className="flex gap-6 h-[350px]">
        {/* SOL PANEL – Detaylar */}
        <div className="basis-1/4 border-r pr-4">
          {expanded && detaylar[expanded] ? (
            <>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Ürün Geçmişi
              </h2>
              <GecmisDetayModule detayVerisi={detaylar[expanded]} />
            </>
          ) : (
            <p className="text-gray-500 italic text-sm">
              Ürün geçmiş detayı görmek için sağdan detay'a basın.
            </p>
          )}
        </div>

        {/* SAĞ PANEL – Liste */}
        <div className="basis-3/4 pl-4">
          <GecmisListeModule
            kayitlar={kayitlar}
            expanded={expanded}
            toggleDetayGoster={toggleDetayGoster}
          />
        </div>
      </div>
    </ContentContainer>
  );
}

export default GecmisFiyatPage;
