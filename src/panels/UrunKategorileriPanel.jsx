import { useEffect, useState } from 'react';
import api from '../util/api';
import InputField from '../components/InputField';
import TableMaster from '../components/TableMaster';
import {
  EkleButton,
  SilButton,
  DuzenleButton,
  KaydetButton,
  IptalButton,
} from '../components/buttons';

function UrunKategorileriAdminPanel() {
  const [kategoriler, setKategoriler] = useState([]);
  const [yeniKategori, setYeniKategori] = useState('');
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchKategoriler();
  }, []);

  const fetchKategoriler = async () => {
    const res = await api.get('/api/urunkategorileri/dto');
    setKategoriler(res.data);
  };

  const handleEkle = async () => {
    if (!yeniKategori.trim()) return;

    await api.post('/api/urunkategorileri/dto', {
      urunKategoriAdi: yeniKategori,
    });

    setYeniKategori('');
    fetchKategoriler();
  };

  const handleGuncelle = async () => {
    try {
      await api.put('/api/urunkategorileri/dto', duzenlenen);
      setDuzenlenen(null);
      fetchKategoriler();
    } catch (error) {
      console.error(
        'Güncelleme hatası:',
        error.response?.data || error.message,
      );
    }
  };

  const handleSil = async (id) => {
    try {
      await api.delete(`/api/urunkategorileri/${id}`);
      fetchKategoriler();
    } catch (error) {
      console.error('Silme hatası:', error.response?.data || error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Ekleme alanı */}
      <div className="flex justify-center mt-12 mb-10">
        <div className="flex flex-col items-center gap-2">
          <InputField
            label="Yeni Kategori Adı"
            value={yeniKategori}
            onChange={(e) => setYeniKategori(e.target.value)}
            showTopLabel={false}
          />
          <EkleButton onClick={handleEkle} />
        </div>
      </div>

      <TableMaster
        columns={[
          { key: 'urunKategoriAdi', label: 'Kategori Adı' },
          {
            key: 'actions',
            label: 'İşlemler',
            sortable: false,
            thClassName: 'p-2 border w-40 sticky right-0 bg-white z-10',
            tdClassName: 'border p-2 w-40 sticky right-0 bg-white z-0',
          },
        ]}
        data={kategoriler}
        keyField="urunKategoriId"
        pagination={true}
        pageSize={8}
        sortable={true}
        defaultSortKey="urunKategoriAdi"
        renderRow={(kat) => (
          <>
            <td className="border p-2">
              {duzenlenen?.urunKategoriId === kat.urunKategoriId ? (
                <InputField
                  label=""
                  value={duzenlenen.urunKategoriAdi}
                  onChange={(e) =>
                    setDuzenlenen({
                      ...duzenlenen,
                      urunKategoriAdi: e.target.value,
                    })
                  }
                  placeholder="Kategori adı"
                  width="w-full"
                />
              ) : (
                kat.urunKategoriAdi
              )}
            </td>

            {/* İŞLEMLER */}
            <td className="border sticky right-0 bg-white w-40">
              <div className="grid grid-cols-2">
                {duzenlenen?.urunKategoriId === kat.urunKategoriId ? (
                  <>
                    <KaydetButton onClick={handleGuncelle} />
                    <IptalButton onClick={() => setDuzenlenen(null)} />
                  </>
                ) : (
                  <>
                    <DuzenleButton onClick={() => setDuzenlenen(kat)} />
                    <SilButton onClick={() => handleSil(kat.urunKategoriId)} />
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

export default UrunKategorileriAdminPanel;
