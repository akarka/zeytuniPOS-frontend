import { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

function UrunKategorileriAdminPanel() {
  const [kategoriler, setKategoriler] = useState([]);
  const [yeniKategori, setYeniKategori] = useState("");
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchKategoriler();
  }, []);

  const fetchKategoriler = async () => {
    const res = await axios.get("/api/urunkategorileri/dto");
    setKategoriler(res.data);
  };

  const handleEkle = async () => {
    if (!yeniKategori.trim()) return;

    await axios.post("/api/urunkategorileri/dto", {
      urunKategoriAdi: yeniKategori,
    });

    setYeniKategori("");
    fetchKategoriler();
  };

  const handleGuncelle = async () => {
    try {
      await axios.put("/api/urunkategorileri/dto", duzenlenen);
      setDuzenlenen(null);
      fetchKategoriler();
    } catch (error) {
      console.error(
        "Güncelleme hatası:",
        error.response?.data || error.message
      );
    }
  };

  const handleSil = async (id) => {
    try {
      await axios.delete(`/api/urunkategorileri/${id}`);
      fetchKategoriler();
    } catch (error) {
      console.error("Silme hatası:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <nav className="mb-4">
        <Link to="/" className="text-blue-600 underline">
          Ana Sayfa
        </Link>
      </nav>

      <h2 className="text-xl font-bold mb-4">Ürün Kategori Yönetimi</h2>

      <div className="flex gap-2 mb-6">
        <InputField
          label="Yeni Kategori Adı"
          value={yeniKategori}
          onChange={(e) => setYeniKategori(e.target.value)}
          placeholder="Kategori adı"
        />
        <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
          Ekle
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">Kategori Adı</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {kategoriler.map((kat) => (
            <tr key={kat.urunKategoriId} className="text-center">
              <td className="border p-2">
                {duzenlenen?.urunKategoriId === kat.urunKategoriId ? (
                  <input
                    value={duzenlenen.urunKategoriAdi}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        urunKategoriAdi: e.target.value,
                      })
                    }
                    className="border p-1 w-full"
                  />
                ) : (
                  kat.urunKategoriAdi
                )}
              </td>
              <td className="border p-2 space-x-2">
                {duzenlenen?.urunKategoriId === kat.urunKategoriId ? (
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
                      onClick={() => setDuzenlenen(kat)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="bg-red-500 text-white px-2"
                      onClick={() => handleSil(kat.urunKategoriId)}
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

export default UrunKategorileriAdminPanel;
