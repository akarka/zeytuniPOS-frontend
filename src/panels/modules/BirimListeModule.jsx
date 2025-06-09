import InputField from '../../components/InputField';
import TableMaster from '../../components/TableMaster';
import {
  SilButton,
  DuzenleButton,
  KaydetButton,
  IptalButton,
} from '../../components/buttons';

function BirimListeModule({
  birimler,
  duzenlenen,
  setDuzenlenen,
  handleGuncelle,
  handleSil,
}) {
  return (
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
  );
}

export default BirimListeModule;
