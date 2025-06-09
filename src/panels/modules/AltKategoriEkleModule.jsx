import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import { EkleButton } from '../../components/buttons';

function AltKategoriEkleModule({
  yeniAltKategori,
  setYeniAltKategori,
  kategoriId,
  setKategoriId,
  kategoriSecenekleri,
  handleEkle,
}) {
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <InputField
        label="Yeni Alt Kategori Adı"
        value={yeniAltKategori}
        onChange={(e) => setYeniAltKategori(e.target.value)}
        width="w-64"
        showTopLabel={false}
      />
      <SelectField
        label="Kahvaltı / İmalat / Perakende"
        value={kategoriId}
        onChange={(e) => setKategoriId(e.target.value)}
        options={kategoriSecenekleri}
        showTopLabel={false}
      />
      <EkleButton onClick={handleEkle} />
    </div>
  );
}

export default AltKategoriEkleModule;
