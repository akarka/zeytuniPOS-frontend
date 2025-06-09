import InputField from '../../components/InputField';
import { EkleButton } from '../../components/buttons';

function BirimEkleModule({ yeniBirim, setYeniBirim, handleEkle }) {
  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <InputField
        label="Yeni Birim Adı"
        value={yeniBirim}
        onChange={(e) => setYeniBirim(e.target.value)}
        placeholder="Yeni birim adı"
        width="w-64"
        showTopLabel={false}
      />
      <EkleButton onClick={handleEkle} />
    </div>
  );
}

export default BirimEkleModule;
