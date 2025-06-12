import TableMaster from '../../components/TableMaster';
import { DetayButton } from '../../components/buttons';

function GecmisListeModule({ kayitlar, expanded, toggleDetayGoster }) {
  return (
    <TableMaster
      data={kayitlar}
      keyField="urunId"
      columns={[
        { key: 'urunAdi', label: 'Ürün Adı' },
        { key: 'satisFiyati', label: 'Son Fiyat' },
        { key: 'tarih', label: 'Son Tarih' },
        {
          key: 'actions',
          label: 'İşlemler',
          sortable: false,
          thClassName: 'p-2 border w-32 sticky right-0 bg-white z-10',
          tdClassName: 'border p-2 w-32 sticky right-0 bg-white z-0',
        },
      ]}
      pagination={true}
      pageSize={10}
      sortable={true}
      defaultSortKey="tarih"
      renderRow={(k) => (
        <>
          <td className="border p-2">{k.urunAdi || '?'}</td>
          <td className="border p-2">{k.satisFiyati} ₺</td>
          <td className="border p-2">{k.tarih}</td>
          <td className="border p-0">
            <DetayButton
              expanded={expanded === k.urunId}
              onClick={() => toggleDetayGoster(k.urunId)}
              className="w-full h-full rounded-none"
            />
          </td>
        </>
      )}
    />
  );
}

export default GecmisListeModule;
