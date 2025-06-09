import TableMaster from '../../components/TableMaster';
import SelectField from '../../components/SelectField';
import InputField from '../../components/InputField';
import {
  SilButton,
  DuzenleButton,
  KaydetButton,
  IptalButton,
} from '../../components/buttons';

function UrunTedarikciListeModule({
  veriler,
  urunler,
  tedarikciler,
  duzenlenen,
  setDuzenlenen,
  handleGuncelle,
  handleSil,
}) {
  const label = (id, from) => from.find((x) => x.id === id)?.label || id;

  return (
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
                  setDuzenlenen({ ...duzenlenen, alisFiyati: e.target.value })
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
                  setDuzenlenen({ ...duzenlenen, tarih: e.target.value })
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
  );
}

export default UrunTedarikciListeModule;
