import { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

function TedarikciPage() {
  const [tedarikciler, setTedarikciler] = useState([]);
  const [yeni, setYeni] = useState({
    tedarikciAdi: "",
    tedarikciIletisim: "",
    tedarikciAdres: "",
  });
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchTedarikciler();
  }, []);

  const fetchTedarikciler = async () => {
    const res = await axios.get("/api/tedarikciler/dto");
    setTedarikciler(res.data);
  };

  const handleEkle = async () => {
    if (!yeni.tedarikciAdi.trim()) return;

    await axios.post("/api/tedarikciler/dto", yeni);
    setYeni({ tedarikciAdi: "", tedarikciIletisim: "", tedarikciAdres: "" });
    fetchTedarikciler();
  };

  const handleGuncelle = async () => {
    await axios.put("/api/tedarikciler/dto", duzenlenen);
    setDuzenlenen(null);
    fetchTedarikciler();
  };

  const handleSil = async (id) => {
    await axios.delete(`/api/tedarikciler/${id}`);
    fetchTedarikciler();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <nav className="mb-4">
        <Link to="/" className="text-blue-600 underline">
          Ana Sayfa
        </Link>
      </nav>

      <h2 className="text-xl font-bold mb-4">Tedarikçi Yönetimi</h2>

      <div className="flex gap-2 mb-6">
        <InputField
          placeholder="Tedarikçi Adı"
          value={yeni.tedarikciAdi}
          onChange={(e) => setYeni({ ...yeni, tedarikciAdi: e.target.value })}
        />
        <InputField
          placeholder="İletişim"
          value={yeni.tedarikciIletisim}
          onChange={(e) =>
            setYeni({ ...yeni, tedarikciIletisim: e.target.value })
          }
        />
        <InputField
          placeholder="Adres"
          value={yeni.tedarikciAdres}
          onChange={(e) => setYeni({ ...yeni, tedarikciAdres: e.target.value })}
        />
        <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
          Ekle
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">Adı</th>
            <th className="p-2 border">İletişim</th>
            <th className="p-2 border">Adres</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {tedarikciler.map((t) => (
            <tr key={t.tedarikciId} className="text-center">
              <td className="border p-2">
                {duzenlenen?.tedarikciId === t.tedarikciId ? (
                  <InputField
                    value={duzenlenen.tedarikciAdi}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        tedarikciAdi: e.target.value,
                      })
                    }
                  />
                ) : (
                  t.tedarikciAdi
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.tedarikciId === t.tedarikciId ? (
                  <InputField
                    value={duzenlenen.tedarikciIletisim}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        tedarikciIletisim: e.target.value,
                      })
                    }
                  />
                ) : (
                  t.tedarikciIletisim
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.tedarikciId === t.tedarikciId ? (
                  <InputField
                    value={duzenlenen.tedarikciAdres}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        tedarikciAdres: e.target.value,
                      })
                    }
                  />
                ) : (
                  t.tedarikciAdres
                )}
              </td>
              <td className="border p-2 space-x-2">
                {duzenlenen?.tedarikciId === t.tedarikciId ? (
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
                      onClick={() => setDuzenlenen(t)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="bg-red-500 text-white px-2"
                      onClick={() => handleSil(t.tedarikciId)}
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

export default TedarikciPage;
