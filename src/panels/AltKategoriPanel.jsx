import { useEffect, useState } from 'react';
import api from '../util/api';
import SelectField from '../components/SelectField';
import InputField from '../components/InputField';
import TableMaster from '../components/TableMaster';
import {
  EkleButton,
  SilButton,
  DuzenleButton,
  KaydetButton,
  IptalButton,
} from '../components/buttons';

function AltKategoriAdminPanel() {
  const [altKategoriler, setAltKategoriler] = useState([]);
  const [kategoriSecenekleri, setKategoriSecenekleri] = useState([]);
  const [yeniAltKategori, setYeniAltKategori] = useState('');
  const [kategoriId, setKategoriId] = useState('');
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchAltKategoriler();

    api.get('/api/urunkategorileri/dto').then((res) => {
      const dropdownOptions = res.data.map((k) => ({
        id: k.urunKategoriId,
        label: k.urunKategoriAdi,
      }));
      setKategoriSecenekleri(dropdownOptions);
    });
  }, []);

  const fetchAltKategoriler = async () => {
    const res = await api.get('/api/altkategoriler/dto');
    setAltKategoriler(res.data);
  };

  const getKategoriAdi = (id) => {
    const kategori = kategoriSecenekleri.find((k) => k.id === id);
    return kategori ? kategori.label : id;
  };

  const handleEkle = async () => {
    if (!yeniAltKategori.trim() || !kategoriId) return;
    await api.post('/api/altkategoriler/dto', {
      altkAdi: yeniAltKategori,
      urunKategoriId: parseInt(kategoriId, 10),
    });
    setYeniAltKategori('');
    setKategoriId('');
    fetchAltKategoriler();
  };

  const handleSil = async (id) => {
    try {
      await api.delete(`/api/altkategoriler/${id}`);
      fetchAltKategoriler();
    } catch (error) {
      console.error('Silme hatası:', error.response?.data || error.message);
    }
  };

  const handleGuncelle = async () => {
    try {
      await api.put('/api/altkategoriler/dto', duzenlenen);
      setDuzenlenen(null);
      fetchAltKategoriler();
    } catch (error) {
      console.error(
        'Güncelleme hatası:',
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Ekleme alanı */}
      <div className="flex justify-center mt-12 mb-10">
        <div className="flex flex-col items-center gap-2">
          <InputField
            label="Yeni Alt Kategori Adı"
            value={yeniAltKategori}
            onChange={(e) => setYeniAltKategori(e.target.value)}
            width="w-64"
            showTopLabel={false}
          />
          <SelectField
            label="Kahvaltı / İmalat / Perakende"
            value={kategoriId}
            onChange={(e) => setKategoriId(e.target.value)}
            options={kategoriSecenekleri}
            showTopLabel={false}
          />
          <EkleButton onClick={handleEkle} />
        </div>
      </div>

      <TableMaster
        columns={[
          { key: 'altkAdi', label: 'Adı' },
          { key: 'urunKategoriId', label: 'Ürün Kategori' },
          {
            key: 'actions',
            label: 'İşlemler',
            sortable: false,
            thClassName: 'p-2 border w-40 sticky right-0 bg-white z-10',
            tdClassName: 'border p-2 w-40 sticky right-0 bg-white z-0',
          },
        ]}
        data={altKategoriler}
        keyField="altkId"
        pagination={true}
        pageSize={8}
        sortable={true}
        defaultSortKey="altkAdi"
        renderRow={(ak) => (
          <>
            <td className="border p-2">
              {duzenlenen?.altkId === ak.altkId ? (
                <input
                  value={duzenlenen.altkAdi}
                  onChange={(e) =>
                    setDuzenlenen({ ...duzenlenen, altkAdi: e.target.value })
                  }
                  className="border p-1 w-full"
                />
              ) : (
                ak.altkAdi
              )}
            </td>

            <td className="border p-2">
              {duzenlenen?.altkId === ak.altkId ? (
                <SelectField
                  label=""
                  value={duzenlenen.urunKategoriId}
                  onChange={(e) =>
                    setDuzenlenen({
                      ...duzenlenen,
                      urunKategoriId: parseInt(e.target.value, 10),
                    })
                  }
                  options={kategoriSecenekleri}
                />
              ) : (
                getKategoriAdi(ak.urunKategoriId)
              )}
            </td>

            <td className="border sticky right-0 bg-white w-40">
              <div className="grid grid-cols-2">
                {duzenlenen?.altkId === ak.altkId ? (
                  <>
                    <KaydetButton onClick={handleGuncelle} />
                    <IptalButton onClick={() => setDuzenlenen(null)} />
                  </>
                ) : (
                  <>
                    <DuzenleButton onClick={() => setDuzenlenen(ak)} />
                    <SilButton onClick={() => handleSil(ak.altkId)} />
                  </>
                )}
              </div>
            </td>
          </>
        )}
      />
    </div>
  );
}

export default AltKategoriAdminPanel;
