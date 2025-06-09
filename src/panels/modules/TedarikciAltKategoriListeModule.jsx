import SelectField from '../../components/SelectField';
import TableMaster from '../../components/TableMaster';
import {
  KaydetButton,
  IptalButton,
  DuzenleButton,
  SilButton,
} from '../../components/buttons';

function TedarikciAltKategoriListeModule({
  veriler,
  altKategoriler,
  tedarikciler,
  duzenlenen,
  setDuzenlenen,
  handleGuncelle,
  handleSil,
}) {
  const label = (id, list) => list.find((x) => x.id === id)?.label || id;

  return (
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
            {duzenlenen?.tedarikciAltKategoriId === v.tedarikciAltKategoriId ? (
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
            {duzenlenen?.tedarikciAltKategoriId === v.tedarikciAltKategoriId ? (
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
  );
}

export default TedarikciAltKategoriListeModule;
