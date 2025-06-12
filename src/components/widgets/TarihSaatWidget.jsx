import { useEffect, useState } from 'react';

export default function TarihSaatWidget({ className = '' }) {
  const [zaman, setZaman] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setZaman(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const tarih = zaman.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const saat = zaman.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className={`text-lg text-gray-600 ${className}`}>
      {tarih} {saat}
    </div>
  );
}
