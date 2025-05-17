import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AltKategoriAdminPanel() {
  const [altKategoriler, setAltKategoriler] = useState([]);
  const [yeniAltKategori, setYeniAltKategori] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchAltKategoriler();
  }, []);

  const fetchAltKategoriler = async () => {
    const res = await axios.get("/api/altkategoriler/dto");
    setAltKategoriler(res.data);
  };

  const handleEkle = async () => {
    if (!yeniAltKategori.trim() || !kategoriId) return;
    await axios.post("/api/altkategoriler/dto", {
      altkAdi: yeniAltKategori,
      urunKategoriId: parseInt(kategoriId),
    });
    setYeniAltKategori("");
    setKategoriId("");
    fetchAltKategoriler();
  };

  const handleSil = async (id) => {
    try {
      await axios.delete(`/api/altkategoriler/${id}`);
      fetchAltKategoriler(); // tabloyu yeniden yükle
    } catch (error) {
      console.error("Silme hatası:", error.response?.data || error.message);
    }
  };

  const handleGuncelle = async () => {
    try {
      await axios.put("/api/altkategoriler/dto", duzenlenen);
      setDuzenlenen(null); // input alanını kapatmak için
      fetchAltKategoriler(); // listeyi güncelle
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
        <input
          className="border p-2 w-48"
          value={kategoriId}
          onChange={(e) => setKategoriId(e.target.value)}
          placeholder="Ürün Kategori ID"
        />
        <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
          Ekle
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Adı</th>
            <th className="p-2 border">Ürün Kategori ID</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {altKategoriler.map((ak) => (
            <tr key={ak.altkId} className="text-center">
              <td className="border p-2">{ak.altkId}</td>
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
                  <input
                    value={duzenlenen.urunKategoriId}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        urunKategoriId: parseInt(e.target.value, 10),
                      })
                    }
                    className="border p-1 w-24"
                  />
                ) : (
                  ak.urunKategoriId
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
