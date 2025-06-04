import { useEffect, useState } from "react";
import api from "../util/api";
import SelectField from "../components/SelectField";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

function UrunTedarikciAdminPanel() {
  const [veriler, setVeriler] = useState([]);
  const [urunler, setUrunler] = useState([]);
  const [tedarikciler, setTedarikciler] = useState([]);
  const [yeni, setYeni] = useState({
    urunId: "",
    tedarikciId: "",
    alisFiyati: "",
    tarih: "",
  });
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchData();
    api
      .get("/api/urunler/dto")
      .then((res) =>
        setUrunler(res.data.map((u) => ({ id: u.urunId, label: u.urunAdi })))
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
    const res = await api.get("/api/uruntedarikci/dto");
    setVeriler(res.data);
  };

  const handleEkle = async () => {
    await api.post("/api/uruntedarikci/dto", {
      ...yeni,
      alisFiyati: parseFloat(yeni.alisFiyati),
    });
    setYeni({ urunId: "", tedarikciId: "", alisFiyati: "", tarih: "" });
    fetchData();
  };

  const handleGuncelle = async () => {
    await api.put(`/api/uruntedarikci/dto/${duzenlenen.urunTedarikciId}`, {
      ...duzenlenen,
      alisFiyati: parseFloat(duzenlenen.alisFiyati),
    });
    setDuzenlenen(null);
    fetchData();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/uruntedarikci/${id}`);
    fetchData();
  };

  const label = (id, from) => from.find((x) => x.id === id)?.label || id;

  return (
    <div className="flex gap-2 mb-6 items-end">
      <SelectField
        label="Tedarikçi - Ürün"
        value={yeni.urunId}
        onChange={(e) => setYeni({ ...yeni, urunId: e.target.value })}
        options={urunler}
      />
      <SelectField
        value={yeni.tedarikciId}
        onChange={(e) => setYeni({ ...yeni, tedarikciId: e.target.value })}
        options={tedarikciler}
      />
      <InputField
        placeholder="Alış Fiyatı"
        type="number"
        value={yeni.alisFiyati}
        onChange={(e) => setYeni({ ...yeni, alisFiyati: e.target.value })}
      />
      <InputField
        type="date"
        value={yeni.tarih}
        onChange={(e) => setYeni({ ...yeni, tarih: e.target.value })}
      />
      <button className="bg-green-500 text-white px-4" onClick={handleEkle}>
        Ekle
      </button>

      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Ürün</th>
            <th className="p-2 border">Tedarikçi</th>
            <th className="p-2 border">Alış Fiyatı</th>
            <th className="p-2 border">Tarih</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {veriler.map((v) => (
            <tr key={v.urunTedarikciId}>
              <td className="border p-2">
                {duzenlenen?.urunTedarikciId === v.urunTedarikciId ? (
                  <SelectField
                    value={duzenlenen.urunId}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        urunId: parseInt(e.target.value, 10),
                      })
                    }
                    options={urunler}
                  />
                ) : (
                  label(v.urunId, urunler)
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.urunTedarikciId === v.urunTedarikciId ? (
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
              <td className="border p-2">
                {duzenlenen?.urunTedarikciId === v.urunTedarikciId ? (
                  <InputField
                    type="number"
                    value={duzenlenen.alisFiyati}
                    onChange={(e) =>
                      setDuzenlenen({
                        ...duzenlenen,
                        alisFiyati: e.target.value,
                      })
                    }
                  />
                ) : (
                  v.alisFiyati
                )}
              </td>
              <td className="border p-2">
                {duzenlenen?.urunTedarikciId === v.urunTedarikciId ? (
                  <InputField
                    type="date"
                    value={duzenlenen.tarih}
                    onChange={(e) =>
                      setDuzenlenen({ ...duzenlenen, tarih: e.target.value })
                    }
                  />
                ) : (
                  v.tarih
                )}
              </td>
              <td className="border p-2 space-x-2">
                {duzenlenen?.urunTedarikciId === v.urunTedarikciId ? (
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
                      onClick={() => handleSil(v.urunTedarikciId)}
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

export default UrunTedarikciAdminPanel;
