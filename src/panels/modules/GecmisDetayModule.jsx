import TableMaster from '../../components/TableMaster';

export default function GecmisDetayModule({ detayVerisi }) {
  const columns = [
    { key: 'tarih', label: 'Tarih', sortable: true },
    { key: 'satisFiyati', label: 'Fiyat (₺)', sortable: true },
  ];

  return (
    <TableMaster
      columns={columns}
      data={detayVerisi}
      keyField="gecmisFiyatId"
      pagination={true}
      pageSize={10}
      sortable={true}
      defaultSortKey="tarih"
      renderRow={(item) => (
        <>
          <td className="border p-2">{item.tarih}</td>
          <td className="border p-2">{item.satisFiyati}</td>
        </>
      )}
    />
  );
}
