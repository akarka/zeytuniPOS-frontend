import { useEffect, useState } from "react";
import api from "../util/api";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { Link } from "react-router-dom";

function UrunPage() {
  const [urunler, setUrunler] = useState([]);
  const [birimSecenekleri, setBirimSecenekleri] = useState([]);
  const [altKategoriSecenekleri, setAltKategoriSecenekleri] = useState([]);
  const [yeniUrunAdi, setYeniUrunAdi] = useState("");
  const [birimId, setBirimId] = useState("");
  const [guncelSatisFiyati, setGuncelSatisFiyati] = useState("");
  const [altKategoriId, setAltKategoriId] = useState("");
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchUrunler();

    api.get("/api/birimler/dto").then((res) => {
      const opts = res.data.map((b) => ({
        id: b.birimId,
        label: b.birimAdi,
      }));
      setBirimSecenekleri(opts);
    });

    api.get("/api/altkategoriler/dto").then((res) => {
      const opts = res.data.map((a) => ({
        id: a.altkId,
        label: a.altkAdi,
      }));
      setAltKategoriSecenekleri(opts);
    });
  }, []);

  const fetchUrunler = async () => {
    const res = await api.get("/api/urunler/dto");
    setUrunler(res.data);
  };

  const handleEkle = async () => {
    if (!yeniUrunAdi.trim() || !birimId || !altKategoriId) return;

    await api.post("/api/urunler/dto", {
      urunAdi: yeniUrunAdi,
      birimId: parseInt(birimId, 10),
      guncelSatisFiyati: parseInt(guncelSatisFiyati, 10),
      altKategoriId: parseInt(altKategoriId, 10),
    });

    setYeniUrunAdi("");
    setBirimId("");
    setGuncelSatisFiyati("");
    setAltKategoriId("");
    fetchUrunler();
  };

  const handleGuncelle = async () => {
    await api.put("/api/urunler/dto", duzenlenen);
    setDuzenlenen(null);
    fetchUrunler();
  };

  const handleSil = async (id) => {
    try {
      await api.delete(`/api/urunler/${id}`);
      fetchUrunler();
    } catch (error) {
      console.error("Silme hatası:", error.response?.data || error.message);
    }
  };

  const labelGetir = (id, from) => {
    const secenek = from.find((s) => s.id === id);
    return secenek ? secenek.label : id;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <nav className="mb-4">
        <Link to="/" className="text-blue-600 underline">
          Ana Sayfa
        </Link>
      </nav>

      <h2 className="text-xl font-bold mb-4">Ürün Yönetimi</h2>

      <div className="flex gap-2 mb-6">
        <InputField
          label=""
          value={yeniUrunAdi}
          onChange={(e) => setYeniUrunAdi(e.target.value)}
          placeholder="Ürün adı"
        />
        <SelectField
          label=""
          value={birimId}
          onChange={(e) => setBirimId(e.target.value)}
          options={birimSecenekleri}
        />
        <InputField
          label=""
          value={guncelSatisFiyati}
          onChange={(e) => setGuncelSatisFiyati(e.target.value)}
          placeholder="Fiyat"
        />
        <SelectField
          label=""
          value={altKategoriId}
          onChange={(e) => setAltKategoriId(e.target.value)}
          options={altKategoriSecenekleri}
        />
        <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
          Ekle
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">Ürün Adı</th>
            <th className="p-2 border">Birim</th>
            <th className="p-2 border">Satış Fiyatı</th>
            <th className="p-2 border">Alt Kategori</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {urunler.map((u) => (
            <tr key={u.urunId} className="text-center">
              <td className="border p-2">
                {duzenlenen?.urunId === u.urunId ? (
                  <input
                    value={duzenlenen.urunAdi}
                    onChange={(e) =>
                      setDuzenlenen({ ...duzenlenen, urunAdi: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  u.urunAdi
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.urunId === u.urunId ? (
                  <SelectField
                    label=""
                    value={duzenlenen.birimId}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        birimId: parseInt(e.target.value, 10),
                      })
                    }
                    options={birimSecenekleri}
                  />
                ) : (
                  labelGetir(u.birimId, birimSecenekleri)
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.urunId === u.urunId ? (
                  <InputField
                    label=""
                    type="number"
                    value={duzenlenen.guncelSatisFiyati}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        guncelSatisFiyati: parseFloat(e.target.value),
                      })
                    }
                  />
                ) : (
                  u.guncelSatisFiyati?.toFixed(2) + " ₺"
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.urunId === u.urunId ? (
                  <SelectField
                    label=""
                    value={duzenlenen.altKategoriId}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        altKategoriId: parseInt(e.target.value, 10),
                      })
                    }
                    options={altKategoriSecenekleri}
                  />
                ) : (
                  labelGetir(u.altKategoriId, altKategoriSecenekleri)
                )}
              </td>
              <td className="border p-2 space-x-2">
                {duzenlenen?.urunId === u.urunId ? (
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
                      onClick={() => setDuzenlenen(u)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="bg-red-500 text-white px-2"
                      onClick={() => handleSil(u.urunId)}
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

export default UrunPage;
