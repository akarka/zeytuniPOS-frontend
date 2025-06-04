import { useEffect, useState } from "react";
import React from "react";

import api from "../util/api";
import { Link } from "react-router-dom";

function GecmisFiyatPage() {
  const [kayitlar, setKayitlar] = useState([]);
  const [detaylar, setDetaylar] = useState({});
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchVeriler();
  }, []);

  const fetchVeriler = async () => {
    try {
      const res = await api.get("/api/gecmisfiyat/dto");

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
      console.error("Veri alınamadı:", err);
    }
  };

  const toggleDetayGoster = async (urunId) => {
    if (expanded === urunId) {
      setExpanded(null);
    } else {
      if (!detaylar[urunId]) {
        try {
          const res = await api.get(`/api/gecmisfiyat/dto/urun/${urunId}`);
          setDetaylar((prev) => ({ ...prev, [urunId]: res.data }));
        } catch (err) {
          console.error("Detay verisi alınamadı:", err);
          return;
        }
      }
      setExpanded(urunId);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
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
                <tr className="text-center">
                  <td className="border p-2">{k.urunAdi || "?"}</td>
                  <td className="border p-2">{k.satisFiyati} ₺</td>
                  <td className="border p-2">{k.tarih}</td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-500 text-white px-2"
                      onClick={() => toggleDetayGoster(k.urunId)}
                    >
                      {expanded === k.urunId ? "Gizle" : "Detay"}
                    </button>
                  </td>
                </tr>
                {expanded === k.urunId && detaylar[k.urunId] && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="border p-2">
                      <ul className="list-disc pl-6 text-left">
                        {detaylar[k.urunId].map((d) => (
                          <li key={d.gecmisFiyatId}>
                            {d.tarih} – {d.satisFiyati} ₺
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GecmisFiyatPage;
