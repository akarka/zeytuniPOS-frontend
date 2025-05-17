import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BirimAdminPanel() {
  const [birimler, setBirimler] = useState([]);
  const [yeniBirim, setYeniBirim] = useState("");
  const [duzenlenenBirim, setDuzenlenenBirim] = useState(null);

  useEffect(() => {
    fetchBirimler();
  }, []);

  const fetchBirimler = async () => {
    const res = await axios.get("/api/birimler/dto");
    console.log("Gelen veri:", res.data);
    setBirimler(res.data);
  };

  const handleEkle = async () => {
    if (!yeniBirim.trim()) return;
    await axios.post("/api/birimler/dto", { birimAdi: yeniBirim });
    setYeniBirim("");
    fetchBirimler();
  };

  const handleSil = async (birimAdi) => {
    await axios.delete(`/api/birimler/by-adi/${encodeURIComponent(birimAdi)}`);
    fetchBirimler();
  };

  const handleGuncelle = async () => {
    await axios.put("/api/birimler/dto", duzenlenenBirim);
    setDuzenlenenBirim(null);
    fetchBirimler();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <nav>
        <Link to="/">Ana Sayfa</Link>
      </nav>
      <h2 className="text-xl font-bold mb-4">Birim Yönetimi</h2>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1"
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
          <tr className="bg-gray-100">
            <th className="p-2 border">Adı</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {birimler.map((b) => (
            <tr key={b.birimId} className="text-center">
              <td className="border p-2">{b.birimId}</td>
              <td className="border p-2">
                {duzenlenenBirim?.birimId === b.birimId ? (
                  <input
                    value={duzenlenenBirim.birimAdi}
                    onChange={(e) =>
                      setDuzenlenenBirim({
                        ...duzenlenenBirim,
                        birimAdi: e.target.value,
                      })
                    }
                    className="border p-1"
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
                      onClick={() => handleSil(b.birimAdi)}
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
