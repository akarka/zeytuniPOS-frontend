import { useEffect, useState } from 'react';
import api from '../util/api';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import TableMaster from '../components/TableMaster';
import {
  EkleButton,
  SilButton,
  DuzenleButton,
  KaydetButton,
  IptalButton,
} from '../components/buttons';

function KullaniciPage() {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [rolSecenekleri, setRolSecenekleri] = useState([]);
  const [yeniKullaniciAdi, setYeniKullaniciAdi] = useState('');
  const [yeniSifre, setYeniSifre] = useState('');
  const [yeniRolId, setYeniRolId] = useState('');
  const [yeniAktif, setYeniAktif] = useState('1');
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchVeriler();
  }, []);

  const fetchVeriler = async () => {
    const [kullaniciRes, rolRes] = await Promise.all([
      api.get('/api/kullanicilar/dto'),
      api.get('/api/roller/dto'),
    ]);

    setKullanicilar(kullaniciRes.data);

    const rolOpts = rolRes.data.map((r) => ({
      id: r.rolId,
      label: r.rolAdi,
    }));
    setRolSecenekleri(rolOpts);
  };

  const handleEkle = async () => {
    if (!yeniKullaniciAdi || !yeniSifre || !yeniRolId) return;

    await api.post('/api/kullanicilar/dto', {
      kullaniciAdi: yeniKullaniciAdi,
      sifre: yeniSifre,
      rolId: parseInt(yeniRolId, 10),
      aktif: yeniAktif === '1',
    });

    setYeniKullaniciAdi('');
    setYeniSifre('');
    setYeniRolId('');
    setYeniAktif('1');
    fetchVeriler();
  };

  const handleGuncelle = async () => {
    if (!duzenlenen) return;

    await api.put('/api/kullanicilar/dto', {
      kullaniciId: duzenlenen.kullaniciId,
      kullaniciAdi: duzenlenen.kullaniciAdi,
      rolId: parseInt(duzenlenen.rolId, 10),
      aktif: duzenlenen.aktif === '1' || duzenlenen.aktif === true,
    });

    setDuzenlenen(null);
    fetchVeriler();
  };

  const handleSil = async (id) => {
    await api.delete(`/api/kullanicilar/dto/${id}`);
    fetchVeriler();
  };

  const aktiflikSecenekleri = [
    { id: '1', label: 'Aktif' },
    { id: '0', label: 'Deaktif' },
  ];

  return (
    <div className="space-y-6">
      {/* Ekleme Formu */}
      <div className="flex justify-center mt-12 mb-10">
        <div className="flex flex-col items-center gap-2">
          <InputField
            label="Yeni Kullanıcı Adı"
            value={yeniKullaniciAdi}
            onChange={(e) => setYeniKullaniciAdi(e.target.value)}
            width="w-64"
            showTopLabel={false}
          />
          <InputField
            type="password"
            value={yeniSifre}
            onChange={(e) => setYeniSifre(e.target.value)}
            placeholder="Şifre"
          />
          <SelectField
            label="Yetki Düzeyi Seçiniz"
            value={yeniRolId}
            onChange={(e) => setYeniRolId(e.target.value)}
            options={rolSecenekleri}
            showTopLabel={false}
          />
          <SelectField
            label="Aktif Mi?"
            value={yeniAktif}
            onChange={(e) => setYeniAktif(e.target.value)}
            options={aktiflikSecenekleri}
            showTopLabel={false}
          />
          <EkleButton onClick={handleEkle} />
        </div>
      </div>

      {/* Tablo */}
      <TableMaster
        columns={[
          { key: 'kullaniciAdi', label: 'Kullanıcı Adı' },
          { key: 'rolId', label: 'Rol' },
          { key: 'aktif', label: 'Aktiflik' },
          {
            key: 'actions',
            label: 'İşlemler',
            sortable: false,
            thClassName: 'p-2 border w-40 sticky right-0 bg-white z-10',
            tdClassName: 'border p-2 w-40 sticky right-0 bg-white z-0',
          },
        ]}
        data={kullanicilar}
        keyField="kullaniciId"
        pagination={true}
        pageSize={8}
        sortable={true}
        renderRow={(k) => (
          <>
            <td className="border p-2">
              {duzenlenen?.kullaniciId === k.kullaniciId ? (
                <InputField
                  value={duzenlenen.kullaniciAdi}
                  onChange={(e) =>
                    setDuzenlenen({
                      ...duzenlenen,
                      kullaniciAdi: e.target.value,
                    })
                  }
                />
              ) : (
                k.kullaniciAdi
              )}
            </td>

            <td className="border p-2">
              {duzenlenen?.kullaniciId === k.kullaniciId ? (
                <SelectField
                  value={duzenlenen.rolId}
                  onChange={(e) =>
                    setDuzenlenen({
                      ...duzenlenen,
                      rolId: parseInt(e.target.value, 10),
                    })
                  }
                  options={rolSecenekleri}
                />
              ) : (
                k.rolAdi
              )}
            </td>

            <td className="border p-2">
              {duzenlenen?.kullaniciId === k.kullaniciId ? (
                <SelectField
                  value={duzenlenen.aktif ? '1' : '0'}
                  onChange={(e) =>
                    setDuzenlenen({
                      ...duzenlenen,
                      aktif: e.target.value === '1',
                    })
                  }
                  options={aktiflikSecenekleri}
                />
              ) : k.aktif ? (
                'Aktif'
              ) : (
                'Deaktif'
              )}
            </td>

            <td className="border sticky right-0 bg-white w-40">
              <div className="grid grid-cols-2">
                {duzenlenen?.kullaniciId === k.kullaniciId ? (
                  <>
                    <KaydetButton onClick={handleGuncelle} />
                    <IptalButton onClick={() => setDuzenlenen(null)} />
                  </>
                ) : (
                  <>
                    <DuzenleButton onClick={() => setDuzenlenen(k)} />
                    <SilButton onClick={() => handleSil(k.kullaniciId)} />
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

export default KullaniciPage;
