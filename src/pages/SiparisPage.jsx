import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../util/api';

import PanelComponent from '../components/PanelComponent';
import ContentContainer from '../components/ContentContainer';
import SiparisEkleModule from '../panels/modules/SiparisEkleModule';
import UrunListeModule from '../panels/modules/UrunListeModule';

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

  const panelConfig = altKategoriler.map((kat) => ({
    key: kat.altkId,
    title: kat.altkAdi,
    solIcerik: (
      <SiparisEkleModule
        sepet={sepet}
        onSil={handleSil}
        onMiktarGuncelle={handleMiktarGuncelle}
      />
    ),
    sagIcerik: (
      <UrunListeModule
        urunler={urunMap[kat.altkId] || []}
        onUrunTikla={handleUrunEkle}
      />
    ),
  }));

  return (
    <ContentContainer>
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 underline text-sm"
        >
          ← Ana Sayfa
        </Link>
      </div>
      {panelConfig.length > 0 ? (
        <PanelComponent
          panelConfig={panelConfig}
          baslik="Sipariş Paneli"
        />
      ) : (
        <p className="text-sm text-gray-500 italic">Yükleniyor...</p>
      )}
    </ContentContainer>
  );
}

export default SiparisPage;
