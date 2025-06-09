import SelectField from '../../components/SelectField';
import InputField from '../../components/InputField';
import { EkleButton } from '../../components/buttons';

function UrunTedarikciEkleModule({
  urunler,
  tedarikciler,
  yeni,
  setYeni,
  handleEkle,
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <SelectField
        label="Ürün Seçiniz"
        value={yeni.urunId}
        onChange={(e) => setYeni({ ...yeni, urunId: e.target.value })}
        options={urunler}
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
      <InputField
        label="Alış Fiyatı"
        type="number"
        value={yeni.alisFiyati}
        onChange={(e) => setYeni({ ...yeni, alisFiyati: e.target.value })}
        placeholder="Alış Fiyatı"
        width="w-64"
        showTopLabel={false}
      />
      <InputField
        label="Tarih"
        type="date"
        value={yeni.tarih}
        onChange={(e) => setYeni({ ...yeni, tarih: e.target.value })}
        width="w-64"
        showTopLabel={false}
      />
      <EkleButton onClick={handleEkle} />
    </div>
  );
}

export default UrunTedarikciEkleModule;
