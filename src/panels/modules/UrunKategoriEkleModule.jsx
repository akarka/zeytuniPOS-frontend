import InputField from '../../components/InputField';
import { EkleButton } from '../../components/buttons';

function UrunKategoriEkleModule({ yeniKategori, setYeniKategori, handleEkle }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <InputField
        label="Yeni Kategori Adı"
        value={yeniKategori}
        onChange={(e) => setYeniKategori(e.target.value)}
        showTopLabel={false}
      />
      <EkleButton onClick={handleEkle} />
    </div>
  );
}

export default UrunKategoriEkleModule;
