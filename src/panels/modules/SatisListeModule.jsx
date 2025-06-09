import SelectField from '../../components/SelectField';
import InputField from '../../components/InputField';
import TableMaster from '../../components/TableMaster';
import {
  KaydetButton,
  IptalButton,
  DuzenleButton,
  SilButton,
} from '../../components/buttons';

function SatisListeModule({
  satislar,
  duzenlenen,
  setDuzenlenen,
  handleGuncelle,
  handleSil,
  urunSecenekleri,
}) {
  const urunAdiGetir = (id) => {
    const u = urunSecenekleri.find((x) => x.id === id);
    return u?.label || id;
  };

  return (
    <TableMaster
      data={satislar}
      keyField="satisId"
      columns={[
        { key: 'urunId', label: 'Ürün' },
        { key: 'miktar', label: 'Miktar' },
        { key: 'satisFiyati', label: 'Fiyat' },
        { key: 'satisTarihi', label: 'Tarih' },
        {
          key: 'actions',
          label: 'İşlemler',
          sortable: false,
          thClassName: 'p-2 border w-40 sticky right-0 bg-white z-10',
          tdClassName: 'border p-2 w-40 sticky right-0 bg-white z-0',
        },
      ]}
      pagination={true}
      pageSize={10}
      sortable={true}
      defaultSortKey="satisTarihi"
      renderRow={(s) => (
        <>
          <td className="border p-2">
            {duzenlenen?.satisId === s.satisId ? (
              <SelectField
                value={duzenlenen.urunId}
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    urunId: parseInt(e.target.value, 10),
                  })
                }
                options={urunSecenekleri}
              />
            ) : (
              urunAdiGetir(s.urunId)
            )}
          </td>
          <td className="border p-2">
            {duzenlenen?.satisId === s.satisId ? (
              <InputField
                value={duzenlenen.miktar}
                type="number"
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    miktar: parseInt(e.target.value, 10),
                  })
                }
              />
            ) : (
              s.miktar
            )}
          </td>
          <td className="border p-2">
            {duzenlenen?.satisId === s.satisId ? (
              <InputField
                value={duzenlenen.satisFiyati ?? ''}
                type="number"
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    satisFiyati: e.target.value
                      ? parseInt(e.target.value, 10)
                      : null,
                  })
                }
              />
            ) : (
              s.satisFiyati ?? '-'
            )}
          </td>
          <td className="border p-2">
            {duzenlenen?.satisId === s.satisId ? (
              <InputField
                type="datetime-local"
                value={duzenlenen.satisTarihi?.slice(0, 16) ?? ''}
                onChange={(e) =>
                  setDuzenlenen({ ...duzenlenen, satisTarihi: e.target.value })
                }
              />
            ) : (
              s.satisTarihi?.replace('T', ' ').slice(0, 16) ?? '-'
            )}
          </td>
          <td className="border p-2">
            <div className="grid grid-cols-2 gap-1">
              {duzenlenen?.satisId === s.satisId ? (
                <>
                  <KaydetButton onClick={handleGuncelle} />
                  <IptalButton onClick={() => setDuzenlenen(null)} />
                </>
              ) : (
                <>
                  <DuzenleButton onClick={() => setDuzenlenen(s)} />
                  <SilButton onClick={() => handleSil(s.satisId)} />
                </>
              )}
            </div>
          </td>
        </>
      )}
    />
  );
}

export default SatisListeModule;
