import SelectField from '../../components/SelectField';
import InputField from '../../components/InputField';
import TableMaster from '../../components/TableMaster';
import {
  KaydetButton,
  IptalButton,
  DuzenleButton,
  SilButton,
} from '../../components/buttons';

function UrunListeModule({
  urunler,
  duzenlenen,
  setDuzenlenen,
  handleGuncelle,
  handleSil,
  birimSecenekleri,
  altKategoriSecenekleri,
  rolId,
}) {
  const labelGetir = (id, from) => {
    const secenek = from.find((s) => s.id === id);
    return secenek ? secenek.label : id;
  };
  const columns = [
    { key: 'urunAdi', label: 'Ürün Adı' },
    { key: 'birimId', label: 'Birim' },
    { key: 'guncelSatisFiyati', label: 'Satış Fiyatı' },
    { key: 'altKategoriId', label: 'Alt Kategori' },
  ];

  if (rolId !== 3) {
    columns.push({
      key: 'actions',
      label: 'İşlemler',
      sortable: false,
      thClassName: 'p-2 border w-40 sticky right-0 bg-white z-10',
      tdClassName: 'border p-2 w-40 sticky right-0 bg-white z-0',
    });
  }
  return (
    <TableMaster
      data={urunler}
      keyField="urunId"
      columns={columns}
      pagination={true}
      pageSize={8}
      sortable={true}
      defaultSortKey="urunAdi"
      renderRow={(u) => (
        <>
          <td className="border p-2">
            {duzenlenen?.urunId === u.urunId ? (
              <InputField
                value={duzenlenen.urunAdi}
                onChange={(e) =>
                  setDuzenlenen({ ...duzenlenen, urunAdi: e.target.value })
                }
              />
            ) : (
              u.urunAdi
            )}
          </td>
          <td className="border p-2">
            {duzenlenen?.urunId === u.urunId ? (
              <SelectField
                value={duzenlenen.birimId}
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    birimId: parseInt(e.target.value, 10),
                  })
                }
                options={birimSecenekleri}
              />
            ) : (
              labelGetir(u.birimId, birimSecenekleri)
            )}
          </td>
          <td className="border p-2">
            {duzenlenen?.urunId === u.urunId ? (
              <InputField
                type="number"
                value={duzenlenen.guncelSatisFiyati}
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    guncelSatisFiyati: parseFloat(e.target.value),
                  })
                }
              />
            ) : (
              (u.guncelSatisFiyati?.toFixed(2) || '0.00') + ' ₺'
            )}
          </td>
          <td className="border p-2">
            {duzenlenen?.urunId === u.urunId ? (
              <SelectField
                value={duzenlenen.altKategoriId}
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    altKategoriId: parseInt(e.target.value, 10),
                  })
                }
                options={altKategoriSecenekleri}
              />
            ) : (
              labelGetir(u.altKategoriId, altKategoriSecenekleri)
            )}
          </td>
          {rolId !== 3 && (
            <td className="border p-2">
              <div className="grid grid-cols-2 gap-1">
                {duzenlenen?.urunId === u.urunId ? (
                  <>
                    <KaydetButton onClick={handleGuncelle} />
                    <IptalButton onClick={() => setDuzenlenen(null)} />
                  </>
                ) : (
                  <>
                    <DuzenleButton onClick={() => setDuzenlenen(u)} />
                    <SilButton onClick={() => handleSil(u.urunId)} />
                  </>
                )}
              </div>
            </td>
          )}
        </>
      )}
    />
  );
}

export default UrunListeModule;
