import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import api from "../util/api";

function BirimAdminPanel() {
  const [birimler, setBirimler] = useState([]);
  const [yeniBirim, setYeniBirim] = useState("");
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchBirimler();
  }, []);

  const fetchBirimler = async () => {
    const res = await api.get("/api/birimler/dto");
    setBirimler(res.data);
  };

  const handleEkle = async () => {
    if (!yeniBirim.trim()) return;

    await api.post("/api/birimler/dto", {
      birimAdi: yeniBirim,
    });

    setYeniBirim("");
    fetchBirimler();
  };

  const handleGuncelle = async () => {
    await api.put("/api/birimler/dto", duzenlenen);
    setDuzenlenen(null);
    fetchBirimler();
  };

  const handleSil = async (id) => {
    try {
      await api.delete(`/api/birimler/${id}`);
      fetchBirimler();
    } catch (error) {
      console.error("Silme hatası:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex gap-2 mb-6 items-end">
      <InputField
        label="Yeni Birim Ekle"
        value={yeniBirim}
        onChange={(e) => setYeniBirim(e.target.value)}
        placeholder="Yeni birim adı"
      />
      <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
        Ekle
      </button>

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
                {duzenlenen?.birimId === b.birimId ? (
                  <InputField
                    label=""
                    value={duzenlenen.birimAdi}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
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
                {duzenlenen?.birimId === b.birimId ? (
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
                      onClick={() => setDuzenlenen(b)}
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
