import { useEffect, useState } from 'react';

const API_KEY = 'fdec481604e84af9ca7aa46399e2c28f';
const CACHE_KEY = 'havaCache';
const CACHE_DURATION_MS = 60 * 60 * 1000;

export default function HavaDurumuWidget() {
  const [hava, setHava] = useState(null);

  useEffect(() => {
    const fetchHava = async () => {
      try {
        const now = Date.now();

        const cache = localStorage.getItem(CACHE_KEY);
        if (cache) {
          const { timestamp, data } = JSON.parse(cache);
          if (now - timestamp < CACHE_DURATION_MS) {
            setHava(data);
            return;
          }
        }

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Ankara,tr&appid=${API_KEY}&units=metric&lang=tr`,
        );

        if (!res.ok) throw new Error(`API hatası: ${res.status}`);

        const data = await res.json();
        const formatted = {
          sicaklik: Math.round(data.main.temp),
          durum: data.weather[0].description,
          ikon: data.weather[0].icon,
        };

        setHava(formatted);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: now, data: formatted }),
        );
      } catch (err) {
        console.error('Hava durumu alınamadı:', err);
      }
    };

    fetchHava();
  }, []);

  if (!hava)
    return <span className="text-sm text-gray-400">Hava yükleniyor...</span>;

  return (
    <div className="flex items-center gap-1 text-xl text-gray-700">
      <img
        src={`https://openweathermap.org/img/wn/${hava.ikon}@2x.png`}
        alt={hava.durum}
        className="w-6 h-6"
      />
      <span>{hava.sicaklik}°C</span>
      <span className="capitalize">{hava.durum}</span>
    </div>
  );
}
