import { useEffect, useState } from "react";
import api from "../util/api";
import SelectField from "../components/SelectField";
import { Link } from "react-router-dom";

function TedarikciAltKategoriAdminPanel() {
  const [veriler, setVeriler] = useState([]);
  const [altKategoriler, setAltKategoriler] = useState([]);
  const [tedarikciler, setTedarikciler] = useState([]);
  const [yeni, setYeni] = useState({ altKategoriId: "", tedarikciId: "" });
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchData();
    api
      .get("/api/altkategoriler/dto")
      .then((res) =>
        setAltKategoriler(
          res.data.map((a) => ({ id: a.altkId, label: a.altkAdi }))
        )
      );
    api
      .get("/api/tedarikciler/dto")
      .then((res) =>
        setTedarikciler(
          res.data.map((t) => ({ id: t.tedarikciId, label: t.tedarikciAdi }))
        )
      );
  }, []);

  const fetchData = async () => {
    const res = await api.get("/api/tedarikcialtkategori/dto");
    setVeriler(res.data);
  };

  const handleEkle = async () => {
    await api.post("/api/tedarikcialtkategori/dto", yeni);
    setYeni({ altKategoriId: "", tedarikciId: "" });
    fetchData();
  };

  const handleGuncelle = async () => {
    await api.put(
      `/api/tedarikcialtkategori/dto/${duzenlenen.tedarikciAltKategoriId}`,
      duzenlenen
    );
    setDuzenlenen(null);
    fetchData();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/tedarikcialtkategori/${id}`);
    fetchData();
  };

  const label = (id, from) => from.find((x) => x.id === id)?.label || id;

  return (
    <div className="flex gap-2 mb-6 items-end">
      <SelectField
        label="Tedarikçi - Ürün Tipi İlişkisi Kur"
        value={yeni.altKategoriId}
        onChange={(e) => setYeni({ ...yeni, altKategoriId: e.target.value })}
        options={altKategoriler}
      />
      <SelectField
        value={yeni.tedarikciId}
        onChange={(e) => setYeni({ ...yeni, tedarikciId: e.target.value })}
        options={tedarikciler}
      />
      <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
        Ekle
      </button>

      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Alt Kategori</th>
            <th className="p-2 border">Tedarikçi</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {veriler.map((v) => (
            <tr key={v.tedarikciAltKategoriId}>
              <td className="border p-2">
                {duzenlenen?.tedarikciAltKategoriId ===
                v.tedarikciAltKategoriId ? (
                  <SelectField
                    value={duzenlenen.altKategoriId}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        altKategoriId: parseInt(e.target.value, 10),
                      })
                    }
                    options={altKategoriler}
                  />
                ) : (
                  label(v.altKategoriId, altKategoriler)
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.tedarikciAltKategoriId ===
                v.tedarikciAltKategoriId ? (
                  <SelectField
                    value={duzenlenen.tedarikciId}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        tedarikciId: parseInt(e.target.value, 10),
                      })
                    }
                    options={tedarikciler}
                  />
                ) : (
                  label(v.tedarikciId, tedarikciler)
                )}
              </td>
              <td className="border p-2 space-x-2">
                {duzenlenen?.tedarikciAltKategoriId ===
                v.tedarikciAltKategoriId ? (
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
                      onClick={() => setDuzenlenen(v)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="bg-red-500 text-white px-2"
                      onClick={() => handleSil(v.tedarikciAltKategoriId)}
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

export default TedarikciAltKategoriAdminPanel;
