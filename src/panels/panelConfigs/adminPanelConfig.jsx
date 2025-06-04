import BirimAdminPanel from "../BirimPanel";
import AltKategoriAdminPanel from "../AltKategoriPanel";
import UrunKategorileriAdminPanel from "../UrunKategorileriPanel";
import TedarikciAltKategoriAdminPanel from "../TedarikciAltKategoriPanel";
import UrunTedarikciAdminPanel from "../UrunTedarikciPanel";
import KullaniciPage from "../KullaniciPanel";
import SifreGuncellePanel from "../SifreGuncellePanel";
import GecmisFiyatPage from "../GecmisFiyatPanel";
import IslemLogAdminPanel from "../IslemLogPanel";

const adminPanelConfig = [
  {
    key: "birim",
    title: "Birim Yönetimi",
    component: <BirimAdminPanel />,
  },
  {
    key: "altKategori",
    title: "Alt Kategori Yönetimi",
    component: <AltKategoriAdminPanel />,
  },
  {
    key: "urunKategori",
    title: "Ürün Kategorileri",
    component: <UrunKategorileriAdminPanel />,
  },
  {
    key: "tedarikciAltKategori",
    title: "Tedarikçi Alt Kategorileri",
    component: <TedarikciAltKategoriAdminPanel />,
  },
  {
    key: "urunTedarikci",
    title: "Ürün-Tedarikçi İlişkileri",
    component: <UrunTedarikciAdminPanel />,
  },
  {
    key: "kullanici",
    title: "Kullanıcı Yönetimi",
    component: <KullaniciPage />,
  },
  {
    key: "sifre",
    title: "Şifre Güncelleme",
    component: <SifreGuncellePanel />,
  },
  {
    key: "gecmisFiyat",
    title: "Geçmiş Fiyatlar",
    component: <GecmisFiyatPage />,
  },
  {
    key: "log",
    title: "İşlem Logları",
    component: <IslemLogAdminPanel />,
  },
];

export default adminPanelConfig;
