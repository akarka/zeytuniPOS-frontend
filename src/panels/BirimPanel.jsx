import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import api from "../util/api";

function BirimPanel() {
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
    <div className="space-y-6">
      {/* Ekleme alanı */}
      <div className="flex justify-center mt-20 mb-20 ">
        <div className="flex flex-col items-center gap-2">
          <InputField
            label="Yeni Birim Ekle"
            value={yeniBirim}
            onChange={(e) => setYeniBirim(e.target.value)}
            placeholder="Yeni birim adı"
            width="w-64"
          />
          <button className="btn btn-primary" onClick={handleEkle}>
            Ekle
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-center">
              <th className="text-right w-1/2 pr-2">Birim Adı</th>
              <th className="w-[4%]">{/* boşluk */}</th>
              <th className="text-left w-1/2 pl-2">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {birimler.map((b) => (
              <tr key={b.birimId}>
                {/* Sağ hizalı birim adı */}
                <td className="text-right align-middle">
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
                      width="w-40"
                      inputClassName="text-right"
                    />
                  ) : (
                    b.birimAdi
                  )}
                </td>

                {/* Aradaki boş sütun */}
                <td></td>

                {/* Sol hizalı işlemler */}
                <td className="text-left space-x-2 align-middle">
                  {duzenlenen?.birimId === b.birimId ? (
                    <>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={handleGuncelle}
                      >
                        Kaydet
                      </button>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => setDuzenlenen(null)}
                      >
                        İptal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => setDuzenlenen(b)}
                      >
                        Düzenle
                      </button>
                      <button
                        className="btn btn-sm btn-error"
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
    </div>
  );
}

export default BirimPanel;
