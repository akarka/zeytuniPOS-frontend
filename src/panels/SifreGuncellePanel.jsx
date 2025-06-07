import { useState, useEffect } from 'react';
import api from '../util/api';
import SelectField from '../components/SelectField';
import InputField from '../components/InputField';
import { KaydetButton } from '../components/buttons';

function SifreGuncellePanel() {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [secilenId, setSecilenId] = useState('');
  const [yeniSifre, setYeniSifre] = useState('');
  const [mesaj, setMesaj] = useState('');

  useEffect(() => {
    const fetchKullanicilar = async () => {
      try {
        const res = await api.get('/api/kullanicilar/dto');
        const secenekler = res.data.map((k) => ({
          id: k.kullaniciId,
          label: `${k.kullaniciAdi} (${k.rolAdi || 'Rol yok'})`,
        }));
        setKullanicilar(secenekler);
      } catch (err) {
        console.error('Kullanıcılar alınamadı:', err);
      }
    };

    fetchKullanicilar();
  }, []);

  const handleSifreGuncelle = async () => {
    if (!secilenId || !yeniSifre) return;

    try {
      await api.post('/api/kullanicilar/sifre-guncelle', {
        kullaniciId: parseInt(secilenId, 10),
        yeniSifre: yeniSifre,
      });
      setMesaj('Şifre başarıyla güncellendi.');
      setYeniSifre('');
    } catch (err) {
      console.error('Şifre güncelleme hatası:', err);
      setMesaj('Şifre güncellenemedi.');
    }
  };
  {
    /* burayı kullanıcı sol paneline alacağız */
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-center mt-12 mb-10">
        <div className="flex flex-col items-center gap-2">
          <SelectField
            label="Kullanıcı Seçiniz"
            value={secilenId}
            onChange={(e) => setSecilenId(e.target.value)}
            options={kullanicilar}
            width="w-64"
            showTopLabel={false}
          />
          <InputField
            value={yeniSifre}
            onChange={(e) => setYeniSifre(e.target.value)}
            placeholder="Yeni Şifre Giriniz"
          />

          <KaydetButton onClick={handleSifreGuncelle} />
        </div>

        {mesaj && <div className="mt-2 text-sm text-blue-600">{mesaj}</div>}
      </div>
    </div>
  );
}

export default SifreGuncellePanel;
