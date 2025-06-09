import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import { EkleButton } from '../../components/buttons';

function KullaniciEkleModule({
  yeniKullaniciAdi,
  setYeniKullaniciAdi,
  yeniSifre,
  setYeniSifre,
  yeniRolId,
  setYeniRolId,
  yeniAktif,
  setYeniAktif,
  rolSecenekleri,
  aktiflikSecenekleri,
  handleEkle,
}) {
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <InputField
        label="Yeni Kullanıcı Adı"
        value={yeniKullaniciAdi}
        onChange={(e) => setYeniKullaniciAdi(e.target.value)}
        width="w-64"
        showTopLabel={false}
      />
      <InputField
        type="password"
        value={yeniSifre}
        onChange={(e) => setYeniSifre(e.target.value)}
        placeholder="Şifre"
      />
      <SelectField
        label="Yetki Düzeyi Seçiniz"
        value={yeniRolId}
        onChange={(e) => setYeniRolId(e.target.value)}
        options={rolSecenekleri}
        showTopLabel={false}
      />
      <SelectField
        label="Aktif Mi?"
        value={yeniAktif}
        onChange={(e) => setYeniAktif(e.target.value)}
        options={aktiflikSecenekleri}
        showTopLabel={false}
      />
      <EkleButton onClick={handleEkle} />
    </div>
  );
}

export default KullaniciEkleModule;
