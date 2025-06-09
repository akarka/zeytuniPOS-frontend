import TableMaster from '../../components/TableMaster';
import InputField from '../../components/InputField';
import {
  SilButton,
  DuzenleButton,
  KaydetButton,
  IptalButton,
} from '../../components/buttons';

function UrunKategoriListeModule({
  kategoriler,
  duzenlenen,
  setDuzenlenen,
  handleGuncelle,
  handleSil,
}) {
  return (
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
  );
}

export default UrunKategoriListeModule;
