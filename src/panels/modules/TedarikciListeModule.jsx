import InputField from '../../components/InputField';
import TableMaster from '../../components/TableMaster';
import {
  KaydetButton,
  IptalButton,
  DuzenleButton,
  SilButton,
} from '../../components/buttons';

function TedarikciListeModule({
  tedarikciler,
  duzenlenen,
  setDuzenlenen,
  handleGuncelle,
  handleSil,
}) {
  return (
    <TableMaster
      data={tedarikciler}
      keyField="tedarikciId"
      columns={[
        { key: 'tedarikciAdi', label: 'Adı' },
        { key: 'tedarikciIletisim', label: 'İletişim' },
        { key: 'tedarikciAdres', label: 'Adres' },
        {
          key: 'actions',
          label: 'İşlemler',
          sortable: false,
          thClassName: 'p-2 border w-40 sticky right-0 bg-white z-10',
          tdClassName: 'border p-2 w-40 sticky right-0 bg-white z-0',
        },
      ]}
      pagination={true}
      pageSize={8}
      sortable={true}
      defaultSortKey="tedarikciAdi"
      renderRow={(t) => (
        <>
          <td className="border p-2">
            {duzenlenen?.tedarikciId === t.tedarikciId ? (
              <InputField
                value={duzenlenen.tedarikciAdi}
                onChange={(e) =>
                  setDuzenlenen({ ...duzenlenen, tedarikciAdi: e.target.value })
                }
              />
            ) : (
              t.tedarikciAdi
            )}
          </td>
          <td className="border p-2">
            {duzenlenen?.tedarikciId === t.tedarikciId ? (
              <InputField
                value={duzenlenen.tedarikciIletisim}
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    tedarikciIletisim: e.target.value,
                  })
                }
              />
            ) : (
              t.tedarikciIletisim
            )}
          </td>
          <td className="border p-2">
            {duzenlenen?.tedarikciId === t.tedarikciId ? (
              <InputField
                value={duzenlenen.tedarikciAdres}
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    tedarikciAdres: e.target.value,
                  })
                }
              />
            ) : (
              t.tedarikciAdres
            )}
          </td>
          <td className="border p-2">
            <div className="grid grid-cols-2 gap-1">
              {duzenlenen?.tedarikciId === t.tedarikciId ? (
                <>
                  <KaydetButton onClick={handleGuncelle} />
                  <IptalButton onClick={() => setDuzenlenen(null)} />
                </>
              ) : (
                <>
                  <DuzenleButton onClick={() => setDuzenlenen(t)} />
                  <SilButton onClick={() => handleSil(t.tedarikciId)} />
                </>
              )}
            </div>
          </td>
        </>
      )}
    />
  );
}

export default TedarikciListeModule;
