import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import ItemButton from '../components/buttons/ItemButton';

function AdminPage() {
  const { aktifKullanici } = useOutletContext();
  const rolId = aktifKullanici?.rolId;
  const navigate = useNavigate();

  return (
    <div className="text-center mt-12 space-y-6">
      {/* Satır 1: Herkes */}
      {(rolId === 1 || rolId === 2 || rolId === 3) && (
        <div className="flex flex-wrap justify-center gap-4">
          <ItemButton
            onClick={() => navigate('/siparis')}
            color="outline"
          >
            Sipariş
          </ItemButton>
          <ItemButton
            onClick={() => navigate('/urun')}
            color="outline"
          >
            Ürünler
          </ItemButton>
        </div>
      )}

      {/* Satır 2: Editor ve Admin */}
      {(rolId === 1 || rolId === 2) && (
        <div className="flex flex-wrap justify-center gap-4">
          <ItemButton
            onClick={() => navigate('/satis')}
            color="outline"
          >
            Satışlar
          </ItemButton>
          <ItemButton
            onClick={() => navigate('/tedarik')}
            color="outline"
          >
            Tedarikçiler
          </ItemButton>
        </div>
      )}

      {/* Satır 3: Sadece Admin */}
      {rolId === 1 && (
        <div className="flex flex-wrap justify-center gap-4">
          <ItemButton
            onClick={() => navigate('/admin/yonetimkontrol')}
            color="outline"
          >
            Yönetimsel Araçlar
          </ItemButton>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
