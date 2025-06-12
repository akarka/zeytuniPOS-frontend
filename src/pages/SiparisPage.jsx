import { useEffect, useState } from 'react';
import api from '../util/api';

import PanelComponent from '../components/PanelComponent';
import ContentContainer from '../components/ContentContainer';
import SiparisEkleModule from '../panels/modules/SiparisEkleModule';
import UrunButtonModule from '../panels/modules/UrunButtonModule';

function SiparisPage() {
  const [altKategoriler, setAltKategoriler] = useState([]);
  const [urunMap, setUrunMap] = useState({});
  const [sepet, setSepet] = useState([]);

  useEffect(() => {
    api.get('/api/altkategoriler/dto').then((res) => {
      setAltKategoriler(res.data);
      res.data.forEach((kat) => {
        api
          .get(`/api/urunler/search/category/${kat.altkId}`)
          .then((urunRes) => {
            setUrunMap((prev) => ({ ...prev, [kat.altkId]: urunRes.data }));
          });
      });
    });
  }, []);

  const handleUrunEkle = (urun) => {
    const mevcut = sepet.find((item) => item.urunId === urun.urunId);
    if (mevcut) {
      setSepet((prev) =>
        prev.map((item) =>
          item.urunId === urun.urunId
            ? { ...item, miktar: item.miktar + 1 }
            : item,
        ),
      );
    } else {
      setSepet((prev) => [
        ...prev,
        {
          urunId: urun.urunId,
          urunAdi: urun.urunAdi,
          miktar: 1,
          satisFiyati: urun.guncelSatisFiyati ?? 0,
        },
      ]);
    }
  };

  const handleMiktarGuncelle = (urunId, yeniMiktar) => {
    setSepet((prev) =>
      prev.map((item) =>
        item.urunId === urunId ? { ...item, miktar: yeniMiktar } : item,
      ),
    );
  };

  const handleSil = (urunId) => {
    setSepet((prev) => prev.filter((item) => item.urunId !== urunId));
  };

  const handleSiparisOnayla = async () => {
    if (sepet.length === 0) return;

    const satislar = sepet.map((item) => ({
      urunId: item.urunId,
      miktar: item.miktar,
      satisFiyati: item.satisFiyati,
      satisTarihi: new Date().toISOString(),
    }));

    try {
      await api.post('/api/satislar/toplu', satislar);
      setSepet([]);
    } catch (err) {
      console.error('Sipariş onaylama hatası:', err);
    }
  };

  const panelConfig = altKategoriler.map((kat) => ({
    key: kat.altkId,
    title: kat.altkAdi,
    solIcerik: (
      <SiparisEkleModule
        sepet={sepet}
        onSil={handleSil}
        onMiktarGuncelle={handleMiktarGuncelle}
        onSiparisOnayla={handleSiparisOnayla}
      />
    ),
    sagIcerik: (
      <UrunButtonModule
        urunler={urunMap[kat.altkId] || []}
        onUrunTikla={handleUrunEkle}
      />
    ),
  }));

  return (
    <ContentContainer>
      <h2 className="text-xl font-bold mb-6 text-center">Sipariş Al</h2>
      {panelConfig.length > 0 ? (
        <PanelComponent
          panelConfig={panelConfig}
          baslik=" "
        />
      ) : (
        <p className="text-sm text-gray-500 italic">Yükleniyor...</p>
      )}
    </ContentContainer>
  );
}

export default SiparisPage;
