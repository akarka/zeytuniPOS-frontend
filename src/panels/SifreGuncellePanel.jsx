import { useState, useEffect } from "react";
import api from "../util/api";
import SelectField from "../components/SelectField";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

function SifreGuncellePanel() {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [secilenId, setSecilenId] = useState("");
  const [yeniSifre, setYeniSifre] = useState("");
  const [mesaj, setMesaj] = useState("");

  useEffect(() => {
    const fetchKullanicilar = async () => {
      try {
        const res = await api.get("/api/kullanicilar/dto");
        const secenekler = res.data.map((k) => ({
          id: k.kullaniciId,
          label: `${k.kullaniciAdi} (${k.rolAdi || "Rol yok"})`,
        }));
        setKullanicilar(secenekler);
      } catch (err) {
        console.error("Kullanıcılar alınamadı:", err);
      }
    };

    fetchKullanicilar();
  }, []);

  const handleSifreGuncelle = async () => {
    if (!secilenId || !yeniSifre) return;

    try {
      await api.post("/api/kullanicilar/sifre-guncelle", {
        kullaniciId: parseInt(secilenId, 10),
        yeniSifre: yeniSifre,
      });
      setMesaj("Şifre başarıyla güncellendi.");
      setYeniSifre("");
    } catch (err) {
      console.error("Şifre güncelleme hatası:", err);
      setMesaj("Şifre güncellenemedi.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto border rounded shadow">
      <SelectField
        label="Şifre Güncelleme"
        value={secilenId}
        onChange={(e) => setSecilenId(e.target.value)}
        options={kullanicilar}
      />

      <InputField
        value={yeniSifre}
        onChange={(e) => setYeniSifre(e.target.value)}
        placeholder="Yeni Şifre"
      />

      <button
        onClick={handleSifreGuncelle}
        className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
      >
        Güncelle
      </button>

      {mesaj && <div className="mt-2 text-sm text-blue-600">{mesaj}</div>}
    </div>
  );
}

export default SifreGuncellePanel;
