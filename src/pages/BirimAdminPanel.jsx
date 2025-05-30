import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";

function BirimAdminPanel() {
  const [birimler, setBirimler] = useState([]);
  const [yeniBirim, setYeniBirim] = useState("");
  const [duzenlenenBirim, setDuzenlenenBirim] = useState(null);

  useEffect(() => {
    fetchBirimler();
  }, []);

  const fetchBirimler = async () => {
    const res = await axios.get("/api/birimler/dto");
    setBirimler(res.data);
  };

  const handleEkle = async () => {
    if (!yeniBirim.trim()) return;

    await axios.post("/api/birimler/dto", {
      birimAdi: yeniBirim,
    });

    setYeniBirim("");
    fetchBirimler();
  };

  const handleGuncelle = async () => {
    await axios.put("/api/birimler/dto", duzenlenenBirim);
    setDuzenlenenBirim(null);
    fetchBirimler();
  };

  const handleSil = async (id) => {
    try {
      await axios.delete(`/api/birimler/${id}`);
      fetchBirimler();
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

      <h2 className="text-xl font-bold mb-4">Birim Yönetimi</h2>

      <div className="flex gap-2 mb-6 items-end">
        <InputField
          label=""
          value={yeniBirim}
          onChange={(e) => setYeniBirim(e.target.value)}
          placeholder="Yeni birim adı"
        />
        <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
          Ekle
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">Birim Adı</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {birimler.map((b) => (
            <tr key={b.birimId} className="text-center">
              <td className="border p-2">
                {duzenlenenBirim?.birimId === b.birimId ? (
                  <InputField
                    label=""
                    value={duzenlenenBirim.birimAdi}
                    onChange={(e) =>
                      setDuzenlenenBirim({
                        ...duzenlenenBirim,
                        birimAdi: e.target.value,
                      })
                    }
                    placeholder="Birim adı"
                  />
                ) : (
                  b.birimAdi
                )}
              </td>
              <td className="border p-2 space-x-2">
                {duzenlenenBirim?.birimId === b.birimId ? (
                  <>
                    <button
                      className="bg-blue-500 text-white px-2"
                      onClick={handleGuncelle}
                    >
                      Kaydet
                    </button>
                    <button
                      className="bg-gray-300 px-2"
                      onClick={() => setDuzenlenenBirim(null)}
                    >
                      İptal
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-2"
                      onClick={() => setDuzenlenenBirim(b)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="bg-red-500 text-white px-2"
                      onClick={() => handleSil(b.birimId)}
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

export default BirimAdminPanel;
