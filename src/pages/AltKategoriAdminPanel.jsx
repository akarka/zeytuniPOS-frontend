import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SelectField from "../components/SelectField";

function AltKategoriAdminPanel() {
  const [altKategoriler, setAltKategoriler] = useState([]);
  const [kategoriSecenekleri, setKategoriSecenekleri] = useState([]);

  const [yeniAltKategori, setYeniAltKategori] = useState("");
  const [kategoriId, setKategoriId] = useState("");

  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchAltKategoriler();

    axios.get("/api/urunkategorileri/dto").then((res) => {
      const dropdownOptions = res.data.map((k) => ({
        id: k.urunKategoriId,
        label: k.urunKategoriAdi,
      }));
      setKategoriSecenekleri(dropdownOptions);
    });
  }, []);

  const fetchAltKategoriler = async () => {
    const res = await axios.get("/api/altkategoriler/dto");
    setAltKategoriler(res.data);
  };

  const getKategoriAdi = (id) => {
    const kategori = kategoriSecenekleri.find((k) => k.id === id);
    return kategori ? kategori.label : id;
  };

  const handleEkle = async () => {
    if (!yeniAltKategori.trim() || !kategoriId) return;
    await axios.post("/api/altkategoriler/dto", {
      altkAdi: yeniAltKategori,
      urunKategoriId: parseInt(kategoriId, 10),
    });
    setYeniAltKategori("");
    setKategoriId("");
    fetchAltKategoriler();
  };

  const handleSil = async (id) => {
    try {
      await axios.delete(`/api/altkategoriler/${id}`);
      fetchAltKategoriler();
    } catch (error) {
      console.error("Silme hatası:", error.response?.data || error.message);
    }
  };

  const handleGuncelle = async () => {
    try {
      await axios.put("/api/altkategoriler/dto", duzenlenen);
      setDuzenlenen(null);
      fetchAltKategoriler();
    } catch (error) {
      console.error(
        "Güncelleme hatası:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <nav>
        <Link to="/">Ana Sayfa</Link>
      </nav>
      <h2 className="text-xl font-bold mb-4">Alt Kategori Yönetimi</h2>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1"
          value={yeniAltKategori}
          onChange={(e) => setYeniAltKategori(e.target.value)}
          placeholder="Alt kategori adı"
        />
        <SelectField
          label=""
          value={kategoriId}
          onChange={(e) => setKategoriId(e.target.value)}
          options={kategoriSecenekleri}
        />
        <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
          Ekle
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">Adı</th>
            <th className="p-2 border">Ürün Kategori</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {altKategoriler.map((ak) => (
            <tr key={ak.altkId} className="text-center">
              <td className="border p-2">
                {duzenlenen?.altkId === ak.altkId ? (
                  <input
                    value={duzenlenen.altkAdi}
                    onChange={(e) =>
                      setDuzenlenen({ ...duzenlenen, altkAdi: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  ak.altkAdi
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.altkId === ak.altkId ? (
                  <SelectField
                    label=""
                    value={duzenlenen.urunKategoriId}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        urunKategoriId: parseInt(e.target.value, 10),
                      })
                    }
                    options={kategoriSecenekleri}
                  />
                ) : (
                  getKategoriAdi(ak.urunKategoriId)
                )}
              </td>
              <td className="border p-2 space-x-2">
                {duzenlenen?.altkId === ak.altkId ? (
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
                      onClick={() => setDuzenlenen(ak)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="bg-red-500 text-white px-2"
                      onClick={() => handleSil(ak.altkId)}
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

export default AltKategoriAdminPanel;
