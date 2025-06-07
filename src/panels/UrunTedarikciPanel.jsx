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

function UrunTedarikciAdminPanel() {
  const [veriler, setVeriler] = useState([]);
  const [urunler, setUrunler] = useState([]);
  const [tedarikciler, setTedarikciler] = useState([]);
  const [yeni, setYeni] = useState({
    urunId: '',
    tedarikciId: '',
    alisFiyati: '',
    tarih: '',
  });
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchData();
    api
      .get('/api/urunler/dto')
      .then((res) =>
        setUrunler(res.data.map((u) => ({ id: u.urunId, label: u.urunAdi }))),
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
    const res = await api.get('/api/uruntedarikci/dto');
    setVeriler(res.data);
  };

  const handleEkle = async () => {
    await api.post('/api/uruntedarikci/dto', {
      ...yeni,
      alisFiyati: parseFloat(yeni.alisFiyati),
    });
    setYeni({ urunId: '', tedarikciId: '', alisFiyati: '', tarih: '' });
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
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 mb-6">
        <SelectField
          label="Ürün Seçiniz"
          value={yeni.urunId}
          onChange={(e) => setYeni({ ...yeni, urunId: e.target.value })}
          options={urunler}
          width="w-64"
          showTopLabel={false}
        />

        <SelectField
          label="Tedarikçi Seçiniz"
          value={yeni.tedarikciId}
          onChange={(e) => setYeni({ ...yeni, tedarikciId: e.target.value })}
          options={tedarikciler}
          width="w-64"
          showTopLabel={false}
        />

        <InputField
          label="Alış Fiyatı Giriniz"
          type="number"
          value={yeni.alisFiyati}
          onChange={(e) => setYeni({ ...yeni, alisFiyati: e.target.value })}
          placeholder="Alış Fiyatı"
          width="w-64"
          showTopLabel={false}
        />

        <InputField
          label="Tarih"
          type="date"
          value={yeni.tarih}
          onChange={(e) => setYeni({ ...yeni, tarih: e.target.value })}
          width="w-64"
          showTopLabel={false}
        />
        <EkleButton onClick={handleEkle} />
      </div>

      <TableMaster
        columns={[
          { key: 'urunId', label: 'Ürün' },
          { key: 'tedarikciId', label: 'Tedarikçi' },
          { key: 'alisFiyati', label: 'Alış Fiyatı' },
          { key: 'tarih', label: 'Tarih' },
          {
            key: 'actions',
            label: 'İşlemler',
            sortable: false,
            thClassName: 'p-2 border w-40 sticky right-0 bg-white z-10',
            tdClassName: 'border p-2 w-40 sticky right-0 bg-white z-0',
          },
        ]}
        data={veriler}
        keyField="urunTedarikciId"
        pagination={true}
        pageSize={8}
        sortable={true}
        defaultSortKey="urunId"
        renderRow={(v) => (
          <>
            <td className="border p-2">
              {duzenlenen?.urunTedarikciId === v.urunTedarikciId ? (
                <SelectField
                  label=""
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
                    setDuzenlenen({
                      ...duzenlenen,
                      tarih: e.target.value,
                    })
                  }
                />
              ) : (
                v.tarih
              )}
            </td>

            <td className="border sticky right-0 bg-white w-40">
              <div className="grid grid-cols-2">
                {duzenlenen?.urunTedarikciId === v.urunTedarikciId ? (
                  <>
                    <KaydetButton onClick={handleGuncelle} />
                    <IptalButton onClick={() => setDuzenlenen(null)} />
                  </>
                ) : (
                  <>
                    <DuzenleButton onClick={() => setDuzenlenen(v)} />
                    <SilButton onClick={() => handleSil(v.urunTedarikciId)} />
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

export default UrunTedarikciAdminPanel;
