import {
  SilButton,
  DuzenleButton,
  KaydetButton,
} from '../../components/buttons';
import { useState } from 'react';

function SiparisEkleModule({
  sepet,
  onSil,
  onMiktarGuncelle,
  onSiparisOnayla,
}) {
  const [duzenlenenUrunId, setDuzenlenenUrunId] = useState(null);
  const [geciciMiktar, setGeciciMiktar] = useState(null);
  const [loading, setLoading] = useState(false);

  const toplamTutar = sepet.reduce(
    (sum, item) => sum + (item.satisFiyati || 0) * item.miktar,
    0,
  );

  const handleMiktarDegis = (e) => {
    const yeniMiktar = parseFloat(e.target.value);
    if (!isNaN(yeniMiktar)) {
      setGeciciMiktar(yeniMiktar);
    }
  };

  const handleKaydet = (urunId) => {
    if (geciciMiktar !== null) {
      onMiktarGuncelle(urunId, geciciMiktar);
    }
    setDuzenlenenUrunId(null);
    setGeciciMiktar(null);
  };

  const handleSiparisiOnayla = async () => {
    if (sepet.length === 0 || loading) return;
    setLoading(true);
    try {
      await onSiparisOnayla(); // dışarıdan gelen prop fonksiyon
    } catch (err) {
      console.error('Sipariş onaylanamadı:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Sepet</h3>
      <div className="flex flex-col gap-2 mb-4">
        {sepet.map((item) => (
          <div
            key={item.urunId}
            className="flex justify-between items-center border rounded px-3 py-2"
          >
            {duzenlenenUrunId === item.urunId ? (
              <div className="flex flex-col w-full">
                <div className="font-medium mb-1">{item.urunAdi}</div>
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-24"
                    value={geciciMiktar ?? item.miktar}
                    onChange={handleMiktarDegis}
                  />
                  <span className="text-gray-700">{item.birimAdi}</span>
                  <div className="ml-auto flex gap-2">
                    <KaydetButton onClick={() => handleKaydet(item.urunId)} />
                    <SilButton onClick={() => onSil(item.urunId)} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <div>
                  <div className="font-medium">{item.urunAdi}</div>
                  <div className="text-sm text-gray-600">
                    {item.miktar} {item.birimAdi} × {item.satisFiyati ?? '-'} ₺
                  </div>
                </div>
                <DuzenleButton
                  onClick={() => {
                    setDuzenlenenUrunId(item.urunId);
                    setGeciciMiktar(item.miktar);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-right font-semibold">
        Toplam: {toplamTutar.toFixed(2)} ₺
      </div>
      <button
        onClick={handleSiparisiOnayla}
        disabled={loading}
        className={`mt-4 w-full py-2 rounded text-white font-semibold transition ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-emerald-600 hover:bg-emerald-700'
        }`}
      >
        {loading ? 'Onaylanıyor...' : 'Siparişi Onayla'}
      </button>
    </div>
  );
}

export default SiparisEkleModule;
