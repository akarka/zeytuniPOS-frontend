import TableMaster from '../../components/TableMaster';
import { KaydetButton, SilButton } from '../../components/buttons';

function SiparisListeModule({
  sepet,
  urunSecenekleri,
  handleSil,
  onaylaSiparis,
}) {
  const urunAdiGetir = (id) => {
    const u = urunSecenekleri.find((x) => x.id === id);
    return u?.label || id;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Sepetteki Ürünler</h3>
      <TableMaster
        data={sepet}
        keyField="siparisKalemiId"
        columns={[
          { key: 'urunId', label: 'Ürün' },
          { key: 'miktar', label: 'Miktar' },
          { key: 'satisFiyati', label: 'Fiyat' },
          { key: 'eklenmeTarihi', label: 'Eklenme Tarihi' },
          {
            key: 'actions',
            label: 'İşlemler',
            sortable: false,
            thClassName: 'p-2 border w-32 sticky right-0 bg-white z-10',
            tdClassName: 'border p-2 w-32 sticky right-0 bg-white z-0',
          },
        ]}
        pagination={false}
        renderRow={(s) => (
          <>
            <td className="border p-2">{urunAdiGetir(s.urunId)}</td>
            <td className="border p-2">{s.miktar}</td>
            <td className="border p-2">{s.satisFiyati ?? '-'}</td>
            <td className="border p-2">
              {s.eklenmeTarihi?.replace('T', ' ').slice(0, 16)}
            </td>
            <td className="border p-2">
              <div className="flex justify-center">
                <SilButton onClick={() => handleSil(s.siparisKalemiId)} />
              </div>
            </td>
          </>
        )}
      />

      {sepet.length > 0 && (
        <div className="mt-6 text-center">
          <KaydetButton
            onClick={onaylaSiparis}
            label="Siparişi Onayla"
          />
        </div>
      )}
    </div>
  );
}

export default SiparisListeModule;
