import { useState } from 'react';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import { EkleButton } from '../../components/buttons';

function UrunEkleModule({ birimSecenekleri, altKategoriSecenekleri, onEkle }) {
  const [yeniUrunAdi, setYeniUrunAdi] = useState('');
  const [birimId, setBirimId] = useState('');
  const [guncelSatisFiyati, setGuncelSatisFiyati] = useState('');
  const [altKategoriId, setAltKategoriId] = useState('');

  const handleEkleClick = () => {
    if (!yeniUrunAdi.trim() || !birimId || !altKategoriId) return;

    onEkle({
      urunAdi: yeniUrunAdi,
      birimId: parseInt(birimId, 10),
      guncelSatisFiyati: parseInt(guncelSatisFiyati, 10),
      altKategoriId: parseInt(altKategoriId, 10),
    });

    setYeniUrunAdi('');
    setBirimId('');
    setGuncelSatisFiyati('');
    setAltKategoriId('');
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <InputField
        value={yeniUrunAdi}
        onChange={(e) => setYeniUrunAdi(e.target.value)}
        placeholder="Ürün adı"
      />
      <SelectField
        value={birimId}
        onChange={(e) => setBirimId(e.target.value)}
        options={birimSecenekleri}
      />
      <InputField
        type="number"
        value={guncelSatisFiyati}
        onChange={(e) => setGuncelSatisFiyati(e.target.value)}
        placeholder="Fiyat"
      />
      <SelectField
        value={altKategoriId}
        onChange={(e) => setAltKategoriId(e.target.value)}
        options={altKategoriSecenekleri}
      />
      <EkleButton onClick={handleEkleClick} />
    </div>
  );
}

export default UrunEkleModule;
