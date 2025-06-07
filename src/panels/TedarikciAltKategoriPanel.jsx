import { useEffect, useState } from 'react';
import api from '../util/api';
import SelectField from '../components/SelectField';
import TableMaster from '../components/TableMaster';
import {
  EkleButton,
  SilButton,
  DuzenleButton,
  KaydetButton,
  IptalButton,
} from '../components/buttons';

function TedarikciAltKategoriAdminPanel() {
  const [veriler, setVeriler] = useState([]);
  const [altKategoriler, setAltKategoriler] = useState([]);
  const [tedarikciler, setTedarikciler] = useState([]);
  const [yeni, setYeni] = useState({ altKategoriId: '', tedarikciId: '' });
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchData();
    api
      .get('/api/altkategoriler/dto')
      .then((res) =>
        setAltKategoriler(
          res.data.map((a) => ({ id: a.altkId, label: a.altkAdi })),
        ),
      );
    api
      .get('/api/tedarikciler/dto')
      .then((res) =>
        setTedarikciler(
          res.data.map((t) => ({ id: t.tedarikciId, label: t.tedarikciAdi })),
        ),
      );
  }, []);

  const fetchData = async () => {
    const res = await api.get('/api/tedarikcialtkategori/dto');
    setVeriler(res.data);
  };

  const handleEkle = async () => {
    await api.post('/api/tedarikcialtkategori/dto', yeni);
    setYeni({ altKategoriId: '', tedarikciId: '' });
    fetchData();
  };

  const handleGuncelle = async () => {
    await api.put(
      `/api/tedarikcialtkategori/dto/${duzenlenen.tedarikciAltKategoriId}`,
      duzenlenen,
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
    <div className="space-y-6">
      {/* Ekleme alanı */}
      <div className="flex justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <SelectField
            label="Alt Kategori Seçiniz"
            value={yeni.altKategoriId}
            onChange={(e) =>
              setYeni({ ...yeni, altKategoriId: e.target.value })
            }
            options={altKategoriler}
            width="w-64"
            showTopLabel={false}
          />
          <SelectField
            label="Tedarikçi Seçiniz"
            value={yeni.tedarikciId}
            onChange={(e) => setYeni({ ...yeni, tedarikciId: e.target.value })}
            options={tedarikciler}
            showTopLabel={false}
          />

          <EkleButton onClick={handleEkle} />
        </div>
      </div>

      <TableMaster
        columns={[
          { key: 'altKategoriId', label: 'Alt Kategori' },
          { key: 'tedarikciId', label: 'Tedarikçi' },
          {
            key: 'actions',
            label: 'İşlemler',
            sortable: false,
            thClassName: 'p-2 border w-40 sticky right-0 bg-white z-10',
            tdClassName: 'border p-2 w-40 sticky right-0 bg-white z-0',
          },
        ]}
        data={veriler}
        keyField="tedarikciAltKategoriId"
        pagination={true}
        pageSize={8}
        sortable={true}
        renderRow={(v) => (
          <>
            <td className="border p-2">
              {duzenlenen?.tedarikciAltKategoriId ===
              v.tedarikciAltKategoriId ? (
                <SelectField
                  label=""
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
                  label=""
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

            {/* İŞLEMLER */}
            <td className="border sticky right-0 bg-white w-40">
              <div className="grid grid-cols-2">
                {duzenlenen?.tedarikciAltKategoriId ===
                v.tedarikciAltKategoriId ? (
                  <>
                    <KaydetButton onClick={handleGuncelle} />
                    <IptalButton onClick={() => setDuzenlenen(null)} />
                  </>
                ) : (
                  <>
                    <DuzenleButton onClick={() => setDuzenlenen(v)} />
                    <SilButton
                      onClick={() => handleSil(v.tedarikciAltKategoriId)}
                    />
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

export default TedarikciAltKategoriAdminPanel;
