import SelectField from '../../components/SelectField';
import { EkleButton } from '../../components/buttons';

function TedarikciAltKategoriEkleModule({
  yeni,
  setYeni,
  altKategoriler,
  tedarikciler,
  handleEkle,
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <SelectField
        label="Alt Kategori Seçiniz"
        value={yeni.altKategoriId}
        onChange={(e) => setYeni({ ...yeni, altKategoriId: e.target.value })}
        options={altKategoriler}
        width="w-64"
        showTopLabel={false}
      />
      <SelectField
        label="Tedarikçi Seçiniz"
        value={yeni.tedarikciId}
        onChange={(e) => setYeni({ ...yeni, tedarikciId: e.target.value })}
        options={tedarikciler}
        width="w-64"
        showTopLabel={false}
      />
      <EkleButton onClick={handleEkle} />
    </div>
  );
}

export default TedarikciAltKategoriEkleModule;
