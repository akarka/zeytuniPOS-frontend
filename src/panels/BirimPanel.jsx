import { useEffect, useState } from 'react';
import InputField from '../components/InputField';
import api from '../util/api';
import TableMaster from '../components/TableMaster';
import {
  EkleButton,
  SilButton,
  DuzenleButton,
  KaydetButton,
  IptalButton,
} from '../components/buttons';

function BirimPanel() {
  const [birimler, setBirimler] = useState([]);
  const [yeniBirim, setYeniBirim] = useState('');
  const [duzenlenen, setDuzenlenen] = useState(null);

  useEffect(() => {
    fetchBirimler();
  }, []);

  const fetchBirimler = async () => {
    const res = await api.get('/api/birimler/dto');
    setBirimler(res.data);
  };

  const handleEkle = async () => {
    if (!yeniBirim.trim()) return;

    await api.post('/api/birimler/dto', {
      birimAdi: yeniBirim,
    });

    setYeniBirim('');
    fetchBirimler();
  };

  const handleGuncelle = async () => {
    await api.put('/api/birimler/dto', duzenlenen);
    setDuzenlenen(null);
    fetchBirimler();
  };

  const handleSil = async (id) => {
    try {
      await api.delete(`/api/birimler/${id}`);
      fetchBirimler();
    } catch (error) {
      console.error('Silme hatası:', error.response?.data || error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Ekleme alanı */}
      <div className="flex justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <InputField
            label="Yeni Birim Adı"
            value={yeniBirim}
            onChange={(e) => setYeniBirim(e.target.value)}
            width="w-64"
            showTopLabel={false}
          />
          <EkleButton onClick={handleEkle} />
        </div>
      </div>

      <TableMaster
        columns={[
          { key: 'birimAdi', label: 'Birim Adı' },
          {
            key: 'actions',
            label: 'İşlemler',
            sortable: false,
            thClassName: 'p-2 border w-40 sticky right-0 bg-white z-10',
            tdClassName: 'border p-2 w-40 sticky right-0 bg-white z-0',
          },
        ]}
        data={birimler}
        keyField="birimId"
        pagination={true}
        pageSize={8}
        sortable={true}
        defaultSortKey="birimAdi"
        renderRow={(b) => (
          <>
            <td className="border p-2">
              {duzenlenen?.birimId === b.birimId ? (
                <InputField
                  label=""
                  value={duzenlenen.birimAdi}
                  onChange={(e) =>
                    setDuzenlenen({ ...duzenlenen, birimAdi: e.target.value })
                  }
                  placeholder="Birim adı"
                  width="w-40"
                  inputClassName="text-right"
                />
              ) : (
                b.birimAdi
              )}
            </td>
            <td className="border sticky right-0 bg-white w-40">
              <div className="grid grid-cols-2">
                {duzenlenen?.birimId === b.birimId ? (
                  <>
                    <KaydetButton onClick={handleGuncelle} />
                    <IptalButton onClick={() => setDuzenlenen(null)} />
                  </>
                ) : (
                  <>
                    <DuzenleButton onClick={() => setDuzenlenen(b)} />
                    <SilButton onClick={() => handleSil(b.birimId)} />
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

export default BirimPanel;
