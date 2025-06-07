import BirimPanel from '../BirimPanel';
import AltKategoriPanel from '../AltKategoriPanel';
import UrunKategorileriPanel from '../UrunKategorileriPanel';
import TedarikciAltKategoriPanel from '../TedarikciAltKategoriPanel';
import UrunTedarikciPanel from '../UrunTedarikciPanel';
import KullaniciPage from '../KullaniciPanel';
import SifreGuncellePanel from '../SifreGuncellePanel';
import GecmisFiyatPage from '../GecmisFiyatPanel';
import IslemLogPanel from '../IslemLogPanel';

const adminPanelConfig = [
  {
    key: 'birim',
    title: 'Birim Yönetimi',
    component: <BirimPanel />,
  },
  {
    key: 'altKategori',
    title: 'Alt Kategori Yönetimi',
    component: <AltKategoriPanel />,
  },
  {
    key: 'urunKategori',
    title: 'Ürün Kategorileri',
    component: <UrunKategorileriPanel />,
  },
  {
    key: 'tedarikciAltKategori',
    title: 'Tedarikçi Alt Kategorileri',
    component: <TedarikciAltKategoriPanel />,
  },
  {
    key: 'urunTedarikci',
    title: 'Ürün-Tedarikçi İlişkileri',
    component: <UrunTedarikciPanel />,
  },
  {
    key: 'kullanici',
    title: 'Kullanıcı Yönetimi',
    component: <KullaniciPage />,
  },
  {
    key: 'sifre',
    title: 'Şifre Güncelleme',
    component: <SifreGuncellePanel />,
  },
  {
    key: 'gecmisFiyat',
    title: 'Geçmiş Fiyatlar',
    component: <GecmisFiyatPage />,
  },
  {
    key: 'log',
    title: 'İşlem Logları',
    component: <IslemLogPanel />,
  },
];

export default adminPanelConfig;
