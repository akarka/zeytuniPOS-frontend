import { useEffect, useState } from 'react';
import api from '../util/api';
import GecmisDetayModule from './modules/GecmisDetayModule';
import { DetayButton } from '../components/buttons';

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
    <div className="flex gap-6">
      {/* SOL PANEL – Detaylar */}
      <div className="basis-1/4 border-r pr-4">
        {expanded && detaylar[expanded] ? (
          <div className="basis-1/3 border-r pr-4">
            {expanded && detaylar[expanded] ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Ürün Geçmişi
                </h2>
                <GecmisDetayModule detayVerisi={detaylar[expanded]} />
              </div>
            ) : (
              <p className="text-gray-500 italic text-sm">
                Detay görmek için sağdan ürün seçin.
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-500 italic text-sm">
            Detay görmek için sağdan ürün seçin.
          </p>
        )}
      </div>

      {/* SAĞ PANEL – Son Fiyatlar */}
      <div className="basis-3/4">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Ürün Adı</th>
              <th className="p-2 border">Son Fiyat</th>
              <th className="p-2 border">Son Tarih</th>
              <th className="p-2 border">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {kayitlar.map((k) => (
              <tr key={k.urunId}>
                <td className="border p-2">{k.urunAdi || '?'}</td>
                <td className="border p-2">{k.satisFiyati} ₺</td>
                <td className="border p-2">{k.tarih}</td>
                <td className="border p-0">
                  <DetayButton
                    expanded={expanded === k.urunId}
                    onClick={() => toggleDetayGoster(k.urunId)}
                    className="w-full h-full rounded-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GecmisFiyatPage;
