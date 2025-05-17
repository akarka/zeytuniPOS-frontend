import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import SatirForm from "../components/SatirForm";

function UrunPage() {
  const [duzenlenecekUrun, setDuzenlenecekUrun] = useState(null);
  const [duzenlenenId, setDuzenlenenId] = useState(null); // hangi satırın altında form açılacak
  const [editForm, setEditForm] = useState({
    urunAdi: "",
    satisFiyati: "",
    altId: "",
    birimId: "",
  });
  const [urunler, setUrunler] = useState([]);
  const [urunAdi, setUrunAdi] = useState("");
  const [satisFiyati, setSatisFiyati] = useState("");
  const [altId, setAltId] = useState("");
  const [altKate, setAltKate] = useState([]);
  const [birimId, setBirimId] = useState("");
  const [birim, setBirim] = useState([]);

  useEffect(() => {
    api
      .get("/urunler")
      .then((res) => {
        console.log("Ürünler geldi:", res.data);
        setUrunler(res.data);
      })
      .catch((err) => console.error("Ürün çekme hatası:", err));
  }, []);

  useEffect(() => {
    api
      .get("/birimler")
      .then((res) => {
        console.log("Birimler geldi:", res.data);

        const donustur = res.data.map((birim) => ({
          id: birim.id,
          label: birim.ad, // ad → label
        }));

        setBirim(donustur);
      })
      .catch((err) => console.error("Birim cekme hatasi:", err));
  }, []);

  useEffect(() => {
    api
      .get("/altkategoriler")
      .then((res) => {
        console.log("AltKategoriler geldi:", res.data);

        const donustur = res.data.map((altKate) => ({
          id: altKate.id,
          label: altKate.ad, // ad → label
        }));

        setAltKate(donustur);
      })
      .catch((err) => console.error("Alt Kategori cekme hatasi:", err));
  }, []);

  const handleEdit = (urun) => {
    setDuzenlenenId(urun.id);
    setEditForm({
      urunAdi: urun.ad,
      satisFiyati: urun.satisFiyati,
      altId: urun.altId,
      birimId: urun.birimId,
    });
  };

  const handleDelete = (urunId) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      api
        .delete(`/urunler/${urunId}`)
        .then(() => {
          alert("Ürün silindi.");
          setUrunler((prev) => prev.filter((u) => u.id !== urunId));
        })
        .catch((err) => console.error("Silme hatası:", err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submit = {
      ad: urunAdi,
      satisFiyati: parseFloat(satisFiyati),
      altId: parseFloat(altId),
      birimId: parseFloat(birimId),
    };

    try {
      if (duzenlenecekUrun) {
        await api.put(`/urunler/${duzenlenecekUrun.id}`, submit);
        alert("Ürün güncellendi.");
      } else {
        await api.post("/urunler", submit);
        alert("Ürün eklendi.");
      }

      // reset form
      setUrunAdi("");
      setSatisFiyati("");
      setAltId("");
      setBirimId("");
      setDuzenlenecekUrun(null);

      // refresh
      const res = await api.get("/urunler");
      setUrunler(res.data);
    } catch (error) {
      alert("Hata: " + error.message);
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">Ana Sayfa</Link>
      </nav>

      <form onSubmit={handleSubmit}>
        <h2>Yeni Ürün Ekle</h2>
        <InputField
          label="Ürün İsmi"
          value={urunAdi}
          onChange={(e) => setUrunAdi(e.target.value)}
          placeholder="Örn: Ezine Peyniri"
        />

        <InputField
          label="Fiyat (₺)"
          type="number"
          value={satisFiyati}
          onChange={(e) => setSatisFiyati(e.target.value)}
          placeholder="Örn: 250"
        />

        <SelectField
          label="Alt Kategori"
          value={altId}
          onChange={(e) => setAltId(e.target.value)}
          options={altKate}
        />

        <SelectField
          label="Birim"
          value={birimId}
          onChange={(e) => setBirimId(e.target.value)}
          options={birim}
        />

        <button type="submit" style={{ padding: "10px 20px" }}>
          Kaydet
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th style={{ width: "100px" }}>Ad</th>
            <th style={{ width: "100px" }}>ID</th>
            <th style={{ width: "100px" }}>Fiyat</th>
            <th style={{ width: "100px" }}>Alt Kategori</th>
            <th style={{ width: "100px" }}>Birim</th>
            <th style={{ width: "200px" }}></th>
          </tr>
        </thead>
        <tbody>
          {urunler.map((urun) => (
            <React.Fragment key={urun.id}>
              <tr>
                <td>{urun.id}</td>
                <td>{urun.ad}</td>
                <td>{urun.satisFiyati}</td>
                <td>{urun.altId}</td>
                <td>{urun.birimId}</td>
                <td>
                  <button onClick={() => handleEdit(urun)} title="Düzenle">
                    🖉
                  </button>
                  <button onClick={() => handleDelete(urun.id)} title="Sil">
                    🗑
                  </button>
                </td>
              </tr>

              {/* satırın altına satirform */}
              {duzenlenenId === urun.id && (
                <SatirForm
                  initialData={editForm}
                  fields={[
                    { name: "ad", placeholder: "Ürün Adı" },
                    {
                      name: "satisFiyati",
                      type: "number",
                      placeholder: "Fiyat",
                    },
                    {
                      name: "altId",
                      type: "select",
                      placeholder: "Alt Kategori",
                      options: altKate,
                    },
                    {
                      name: "birimId",
                      type: "select",
                      placeholder: "Birim",
                      options: birim,
                    },
                  ]}
                  onCancel={() => setDuzenlenenId(null)}
                  onSubmit={async (form) => {
                    await api.put(`/urunler/${urun.id}`, {
                      ...form,
                      satisFiyati: parseFloat(form.satisFiyati),
                      altId: parseInt(form.altId),
                      birimId: parseInt(form.birimId),
                    });
                    alert("Ürün güncellendi.");
                    setDuzenlenenId(null);

                    const res = await api.get("/urunler");
                    setUrunler(res.data);
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UrunPage;
