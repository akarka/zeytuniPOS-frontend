import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
/*import InputField from '../components/InputField';
import SelectField from '../components/SelectField';*/
import SatirForm from '../components/SatirForm';
//import UrunEkle from '/pages/UrunEkle'

function UrunKontrol() {
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [duzenlenecekUrun, setDuzenlenecekUrun] = useState(null);
  const [duzenlenenId, setDuzenlenenId] = useState(null); // hangi satırın altında form açılacak
  const [editForm, setEditForm] = useState({
    ad: '',
    satisFiyati: '',
    altId: '',
    birimId: ''
  });
  const [urunler, setUrunler] = useState([]);
  const [ad, setAd] = useState('');
  const [satisFiyati, setSatisFiyati] = useState('');
  const [altId, setAltId] = useState('');
  const [altKate, setAltKate] = useState([]);
  const [birimId, setBirimId] = useState('');
  const [birim, setBirim] = useState([]);

  useEffect(() => {
    api.get('/urunler')
      .then(res => {
        console.log("Ürünler geldi:", res.data);
        setUrunler(res.data);
      })
      .catch(err => console.error("Ürün çekme hatası:", err));
  }, []);

  useEffect(() => {
    api.get('/birimler')
      .then(res => {
        console.log("Birimler geldi:", res.data);

        const donustur = res.data.map(birim => ({
          id: birim.id,
          label: birim.ad  // ad → label
        }));

        setBirim(donustur);
      })
      .catch(err => console.error("Birim cekme hatasi:", err));
  }, []);

  useEffect(() => {
    api.get('/altkategoriler')
      .then(res => {
        console.log("AltKategoriler geldi:", res.data);

        const donustur = res.data.map(altKate => ({
          id: altKate.id,
          label: altKate.ad  // ad → label
        }));

        setAltKate(donustur);
      })
      .catch(err => console.error("Alt Kategori cekme hatasi:", err));
  }, []);


  const handleEdit = (urun) => {
    setDuzenlenenId(urun.id);
    setEditForm({
      ad: urun.ad,
      satisFiyati: urun.satisFiyati,
      altId: urun.altId,
      birimId: urun.birimId
    });
  };


  const handleDelete = (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      api.delete(`/urunler/${id}`)
        .then(() => {
          alert("Ürün silindi.");
          setUrunler(prev => prev.filter(u => u.id !== id));
        })
        .catch(err => console.error("Silme hatası:", err));
    }
  };

/*bunu urunekle arayüzünde revisit.

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submit = {
      ad,
      satisFiyati: parseFloat(satisFiyati),
      altId: parseFloat(altId),
      birimId: parseFloat(birimId)
    };

    try {
      if (duzenlenecekUrun) {
        await api.put(`/urunler/${duzenlenecekUrun.id}`, submit);
        alert("Ürün güncellendi.");
      } else {
        await api.post('/urunler', submit);
        alert("Ürün eklendi.");
      }

      // reset form
      setAd('');
      setSatisFiyati('');
      setAltId('');
      setBirimId('');
      setDuzenlenecekUrun(null);

      // refresh
      const res = await api.get('/urunler');
      setUrunler(res.data);

    } catch (error) {
      alert('Hata: ' + error.message);
    }
  };
  
  */


  return (
    <div>
      <nav>
        <Link to="/">Ana Sayfa</Link>
      </nav>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad</th>
            <th>Fiyat</th>
            <th>Alt Kategori</th>
            <th>Birim</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {urunler.map((urun) => (
            <React.Fragment key={urun.id}>
              <tr
                onMouseEnter={() => setHoveredRowId(urun.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td>{urun.id}</td>
                <td>{urun.ad}</td>
                <td>{urun.satisFiyati}</td>
                <td>{urun.altId}</td>
                <td>{urun.birimId}</td>
                <td>
                  {hoveredRowId === urun.id && (
                    <>
                      <button onClick={() => handleEdit(urun)}>EDIT</button>
                      <button onClick={() => handleDelete(urun.id)}>DELETE</button>
                    </>
                  )}
                </td>
              </tr>

              {/* Satırın hemen altına SatirForm aç */}
              {duzenlenenId === urun.id && (
                <SatirForm
                  initialData={editForm}
                  fields={[
                    { name: 'ad', placeholder: 'Ürün Adı' },
                    { name: 'satisFiyati', type: 'number', placeholder: 'Fiyat' },
                    {
                      name: 'altId',
                      type: 'select',
                      placeholder: 'Alt Kategori',
                      options: altKate
                    },
                    {
                      name: 'birimId',
                      type: 'select',
                      placeholder: 'Birim',
                      options: birim
                    }
                  ]}
                  onCancel={() => setDuzenlenenId(null)}
                  onSubmit={async (form) => {
                    await api.put(`/urunler/${urun.id}`, {
                      ...form,
                      satisFiyati: parseFloat(form.satisFiyati),
                      altId: parseInt(form.altId),
                      birimId: parseInt(form.birimId)
                    });
                    alert("Ürün güncellendi.");
                    setDuzenlenenId(null);

                    const res = await api.get('/urunler');
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

export default UrunKontrol;
