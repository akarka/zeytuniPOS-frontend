import { useEffect, useState } from "react";
import api from "../util/api";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { Link } from "react-router-dom";

function KullaniciPage() {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [rolSecenekleri, setRolSecenekleri] = useState([]);
  const [yeniKullaniciAdi, setYeniKullaniciAdi] = useState("");
  const [yeniSifre, setYeniSifre] = useState("");
  const [yeniRolId, setYeniRolId] = useState("");
  const [yeniAktif, setYeniAktif] = useState("1");
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchVeriler();
  }, []);

  const fetchVeriler = async () => {
    const [kullaniciRes, rolRes] = await Promise.all([
      api.get("/api/kullanicilar/dto"),
      api.get("/api/roller/dto"),
    ]);

    setKullanicilar(kullaniciRes.data);

    const rolOpts = rolRes.data.map((r) => ({
      id: r.rolId,
      label: r.rolAdi,
    }));
    setRolSecenekleri(rolOpts);
  };

  const handleEkle = async () => {
    if (!yeniKullaniciAdi || !yeniSifre || !yeniRolId) return;

    await api.post("/api/kullanicilar/dto", {
      kullaniciAdi: yeniKullaniciAdi,
      sifre: yeniSifre,
      rolId: parseInt(yeniRolId, 10),
      aktif: yeniAktif === "1",
    });

    setYeniKullaniciAdi("");
    setYeniSifre("");
    setYeniRolId("");
    setYeniAktif("1");
    fetchVeriler();
  };

  const handleGuncelle = async () => {
    if (!duzenlenen) return;

    await api.put("/api/kullanicilar/dto", {
      kullaniciId: duzenlenen.kullaniciId,
      kullaniciAdi: duzenlenen.kullaniciAdi,
      rolId: parseInt(duzenlenen.rolId, 10),
      aktif: duzenlenen.aktif === "1" || duzenlenen.aktif === true,
    });

    setDuzenlenen(null);
    fetchVeriler();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/kullanicilar/dto/${id}`);
    fetchVeriler();
  };

  const aktiflikSecenekleri = [
    { id: "1", label: "Aktif" },
    { id: "0", label: "Deaktif" },
  ];

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Ekleme Formu */}
      <div className="flex gap-2 mb-6">
        <InputField
          label="Yeni Kullanıcı Ekle"
          value={yeniKullaniciAdi}
          onChange={(e) => setYeniKullaniciAdi(e.target.value)}
          placeholder="Kullanıcı Adı"
        />
        <InputField
          type="password"
          value={yeniSifre}
          onChange={(e) => setYeniSifre(e.target.value)}
          placeholder="Şifre"
        />
        <SelectField
          value={yeniRolId}
          onChange={(e) => setYeniRolId(e.target.value)}
          options={rolSecenekleri}
        />
        <SelectField
          value={yeniAktif}
          onChange={(e) => setYeniAktif(e.target.value)}
          options={aktiflikSecenekleri}
        />
        <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
          Ekle
        </button>
      </div>

      {/* Tablo */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">Kullanıcı Adı</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">Aktiflik</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {kullanicilar.map((k) => (
            <tr key={k.kullaniciId} className="text-center">
              <td className="border p-2">
                {duzenlenen?.kullaniciId === k.kullaniciId ? (
                  <InputField
                    value={duzenlenen.kullaniciAdi}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        kullaniciAdi: e.target.value,
                      })
                    }
                  />
                ) : (
                  k.kullaniciAdi
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.kullaniciId === k.kullaniciId ? (
                  <SelectField
                    value={duzenlenen.rolId}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        rolId: e.target.value,
                      })
                    }
                    options={rolSecenekleri}
                  />
                ) : (
                  k.rolAdi
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.kullaniciId === k.kullaniciId ? (
                  <SelectField
                    value={duzenlenen.aktif ? "1" : "0"}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        aktif: e.target.value,
                      })
                    }
                    options={aktiflikSecenekleri}
                  />
                ) : k.aktif ? (
                  "Aktif"
                ) : (
                  "Deaktif"
                )}
              </td>
              <td className="border p-2 space-x-2">
                {duzenlenen?.kullaniciId === k.kullaniciId ? (
                  <>
                    <button
                      className="bg-blue-500 text-white px-2"
                      onClick={handleGuncelle}
                    >
                      Kaydet
                    </button>
                    <button
                      className="bg-gray-300 px-2"
                      onClick={() => setDuzenlenen(null)}
                    >
                      İptal
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-2"
                      onClick={() => setDuzenlenen(k)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="bg-red-500 text-white px-2"
                      onClick={() => handleSil(k.kullaniciId)}
                    >
                      Sil
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KullaniciPage;
