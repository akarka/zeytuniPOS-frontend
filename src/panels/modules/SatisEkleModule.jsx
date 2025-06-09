import { useState } from 'react';
import SelectField from '../../components/SelectField';
import InputField from '../../components/InputField';
import { EkleButton } from '../../components/buttons';

const nowAsLocalDateTime = () => {
  const now = new Date();
  now.setSeconds(0, 0);
  return now.toISOString().slice(0, 16);
};

function SatisEkleModule({ urunSecenekleri, onEkle }) {
  const [yeniUrunId, setYeniUrunId] = useState('');
  const [yeniMiktar, setYeniMiktar] = useState('');
  const [yeniFiyat, setYeniFiyat] = useState('');
  const [yeniTarih, setYeniTarih] = useState(nowAsLocalDateTime());

  const handleEkleClick = () => {
    if (!yeniUrunId || !yeniMiktar || !yeniTarih) return;
    onEkle({
      urunId: parseInt(yeniUrunId, 10),
      miktar: parseInt(yeniMiktar, 10),
      satisFiyati: yeniFiyat ? parseInt(yeniFiyat, 10) : null,
      satisTarihi: yeniTarih,
    });
    setYeniUrunId('');
    setYeniMiktar('');
    setYeniFiyat('');
    setYeniTarih(nowAsLocalDateTime());
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <SelectField
        value={yeniUrunId}
        onChange={(e) => setYeniUrunId(e.target.value)}
        options={urunSecenekleri}
      />
      <InputField
        type="number"
        value={yeniMiktar}
        onChange={(e) => setYeniMiktar(e.target.value)}
        placeholder="Miktar"
      />
      <InputField
        type="number"
        value={yeniFiyat}
        onChange={(e) => setYeniFiyat(e.target.value)}
        placeholder="Fiyat"
      />
      <InputField
        type="datetime-local"
        value={yeniTarih}
        onChange={(e) => setYeniTarih(e.target.value)}
      />
      <EkleButton onClick={handleEkleClick} />
    </div>
  );
}

export default SatisEkleModule;
