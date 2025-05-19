import { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { Link } from "react-router-dom";

function SatisPage() {
  const [satislar, setSatislar] = useState([]);
  const [urunSecenekleri, setUrunSecenekleri] = useState([]);

  const [yeniUrunId, setYeniUrunId] = useState("");
  const [yeniMiktar, setYeniMiktar] = useState("");
  const [yeniFiyat, setYeniFiyat] = useState("");

  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchSatislar();

    axios.get("/api/urunler/dto").then((res) => {
      const urunOpts = res.data.map((u) => ({
        id: u.urunId,
        label: u.urunAdi,
      }));
      setUrunSecenekleri(urunOpts);
    });
  }, []);

  const nowAsLocalDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now.toISOString().slice(0, 16);
  };

  const [yeniTarih, setYeniTarih] = useState(nowAsLocalDateTime());

  const fetchSatislar = async () => {
    const res = await axios.get("/api/satislar/dto");
    setSatislar(res.data);
  };

  const handleEkle = async () => {
    if (!yeniUrunId || !yeniMiktar || !yeniTarih) return;

    await axios.post("/api/satislar/dto", {
      urunId: parseInt(yeniUrunId, 10),
      miktar: parseInt(yeniMiktar, 10),
      satisFiyati: yeniFiyat ? parseInt(yeniFiyat, 10) : null,
      satisTarihi: yeniTarih,
    });

    setYeniUrunId("");
    setYeniMiktar("");
    setYeniFiyat("");
    setYeniTarih(nowAsLocalDateTime()); // tekrar bugünü yükle
    fetchSatislar();
  };

  const handleGuncelle = async () => {
    await axios.put("/api/satislar/dto", duzenlenen);
    setDuzenlenen(null);
    fetchSatislar();
  };

  const handleSil = async (id) => {
    try {
      await axios.delete(`/api/satislar/${id}`);
      fetchSatislar();
    } catch (error) {
      console.error("Silme hatası:", error.response?.data || error.message);
    }
  };

  const urunAdiGetir = (id) => {
    const u = urunSecenekleri.find((x) => x.id === id);
    return u?.label || id;
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <nav className="mb-4">
        <Link to="/" className="text-blue-600 underline">
          Ana Sayfa
        </Link>
      </nav>

      <h2 className="text-xl font-bold mb-4">Satış Yönetimi</h2>

      <div className="flex gap-2 mb-6">
        <SelectField
          label=""
          value={yeniUrunId}
          onChange={(e) => setYeniUrunId(e.target.value)}
          options={urunSecenekleri}
        />
        <InputField
          label=""
          type="number"
          value={yeniMiktar}
          onChange={(e) => setYeniMiktar(e.target.value)}
          placeholder="Miktar"
        />
        <InputField
          label=""
          type="number"
          value={yeniFiyat}
          onChange={(e) => setYeniFiyat(e.target.value)}
          placeholder="Fiyat"
        />
        <InputField
          label=""
          type="datetime-local"
          value={yeniTarih}
          onChange={(e) => setYeniTarih(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
          Ekle
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">Ürün</th>
            <th className="p-2 border">Miktar</th>
            <th className="p-2 border">Fiyat</th>
            <th className="p-2 border">Tarih</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {satislar.map((s) => (
            <tr key={s.satisId} className="text-center">
              <td className="border p-2">
                {duzenlenen?.satisId === s.satisId ? (
                  <SelectField
                    label=""
                    value={duzenlenen.urunId}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        urunId: parseInt(e.target.value, 10),
                      })
                    }
                    options={urunSecenekleri}
                  />
                ) : (
                  urunAdiGetir(s.urunId)
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.satisId === s.satisId ? (
                  <InputField
                    value={duzenlenen.miktar}
                    type="number"
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        miktar: parseInt(e.target.value, 10),
                      })
                    }
                  />
                ) : (
                  s.miktar
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.satisId === s.satisId ? (
                  <InputField
                    value={duzenlenen.satisFiyati ?? ""}
                    type="number"
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        satisFiyati: e.target.value
                          ? parseInt(e.target.value, 10)
                          : null,
                      })
                    }
                  />
                ) : (
                  s.satisFiyati ?? "-"
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.satisId === s.satisId ? (
                  <InputField
                    type="datetime-local"
                    value={duzenlenen.satisTarihi?.slice(0, 16) ?? ""}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        satisTarihi: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.satisTarihi?.replace("T", " ").slice(0, 16) ?? "-"
                )}
              </td>
              <td className="border p-2 space-x-2">
                {duzenlenen?.satisId === s.satisId ? (
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
                      onClick={() => setDuzenlenen(s)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="bg-red-500 text-white px-2"
                      onClick={() => handleSil(s.satisId)}
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

export default SatisPage;
