import TableMaster from '../../components/TableMaster';
import SelectField from '../../components/SelectField';
import InputField from '../../components/InputField';
import {
  SilButton,
  DuzenleButton,
  KaydetButton,
  IptalButton,
} from '../../components/buttons';

function AltKategoriListeModule({
  altKategoriler,
  duzenlenen,
  setDuzenlenen,
  kategoriSecenekleri,
  handleGuncelle,
  handleSil,
}) {
  const getKategoriAdi = (id) => {
    const kategori = kategoriSecenekleri.find((k) => k.id === id);
    return kategori ? kategori.label : id;
  };

  return (
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
      defaultSortKey="altkAdi"
      renderRow={(ak) => (
        <>
          <td className="border p-2">
            {duzenlenen?.altkId === ak.altkId ? (
              <InputField
                label=""
                value={duzenlenen.altkAdi}
                onChange={(e) =>
                  setDuzenlenen({ ...duzenlenen, altkAdi: e.target.value })
                }
                placeholder="Alt kategori adı"
                width="w-full"
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
  );
}

export default AltKategoriListeModule;
