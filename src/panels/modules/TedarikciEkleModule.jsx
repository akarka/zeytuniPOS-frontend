import { useState } from 'react';
import InputField from '../../components/InputField';
import { EkleButton } from '../../components/buttons';

function TedarikciEkleModule({ onEkle }) {
  const [yeni, setYeni] = useState({
    tedarikciAdi: '',
    tedarikciIletisim: '',
    tedarikciAdres: '',
  });

  const handleEkleClick = () => {
    if (!yeni.tedarikciAdi.trim()) return;

    onEkle(yeni);
    setYeni({
      tedarikciAdi: '',
      tedarikciIletisim: '',
      tedarikciAdres: '',
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <InputField
        placeholder="Tedarikçi Adı"
        value={yeni.tedarikciAdi}
        onChange={(e) => setYeni({ ...yeni, tedarikciAdi: e.target.value })}
      />
      <InputField
        placeholder="İletişim"
        value={yeni.tedarikciIletisim}
        onChange={(e) =>
          setYeni({ ...yeni, tedarikciIletisim: e.target.value })
        }
      />
      <InputField
        placeholder="Adres"
        value={yeni.tedarikciAdres}
        onChange={(e) => setYeni({ ...yeni, tedarikciAdres: e.target.value })}
      />
      <EkleButton onClick={handleEkleClick} />
    </div>
  );
}

export default TedarikciEkleModule;
