import { useEffect, useState } from 'react';
import React from 'react';
import api from '../util/api';
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

      // urunId'ye göre en yeni kaydı almak için bir Map
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
    <div className="p-4 max-w-5xl mx-auto">
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Ürün Adı</th>
            <th className="p-2 border">Son Fiyat</th>
            <th className="p-2 border">Son Tarih</th>
            <th className="p-2 border">Detay</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(new Map(kayitlar.map((k) => [k.urunId, k])).values()).map(
            (k) => (
              <React.Fragment key={k.urunId}>
                <tr>
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
                {/* burayı sol panele alacağız */}
                {expanded === k.urunId && detaylar[k.urunId] && (
                  <tr className="bg-gray-50">
                    <td
                      colSpan={4}
                      className="border p-2"
                    >
                      <div className="grid grid-cols-4">
                        <div className="col-span-3">
                          <ul className="list-disc pl-6 text-left">
                            {detaylar[k.urunId].map((d) => (
                              <li key={d.gecmisFiyatId}>
                                {d.tarih} – {d.satisFiyati} ₺
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-center text-sm text-gray-500 italic flex items-center justify-center">
                          Detaylı Liste
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GecmisFiyatPage;
