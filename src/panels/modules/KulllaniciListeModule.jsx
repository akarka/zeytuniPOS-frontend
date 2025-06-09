import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import TableMaster from '../../components/TableMaster';
import {
  DuzenleButton,
  SilButton,
  KaydetButton,
  IptalButton,
} from '../../components/buttons';

function KullaniciListeModule({
  kullanicilar,
  duzenlenen,
  setDuzenlenen,
  handleGuncelle,
  handleSil,
  rolSecenekleri,
  aktiflikSecenekleri,
}) {
  return (
    <TableMaster
      columns={[
        { key: 'kullaniciAdi', label: 'Kullanıcı Adı' },
        { key: 'rolId', label: 'Rol' },
        { key: 'aktif', label: 'Aktiflik' },
        {
          key: 'actions',
          label: 'İşlemler',
          sortable: false,
          thClassName: 'p-2 border w-40 sticky right-0 bg-white z-10',
          tdClassName: 'border p-2 w-40 sticky right-0 bg-white z-0',
        },
      ]}
      data={kullanicilar}
      keyField="kullaniciId"
      pagination={true}
      pageSize={8}
      sortable={true}
      renderRow={(k) => (
        <>
          <td className="border p-2">
            {duzenlenen?.kullaniciId === k.kullaniciId ? (
              <InputField
                value={duzenlenen.kullaniciAdi}
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    kullaniciAdi: e.target.value,
                  })
                }
              />
            ) : (
              k.kullaniciAdi
            )}
          </td>
          <td className="border p-2">
            {duzenlenen?.kullaniciId === k.kullaniciId ? (
              <SelectField
                value={duzenlenen.rolId}
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    rolId: parseInt(e.target.value, 10),
                  })
                }
                options={rolSecenekleri}
              />
            ) : (
              k.rolAdi
            )}
          </td>
          <td className="border p-2">
            {duzenlenen?.kullaniciId === k.kullaniciId ? (
              <SelectField
                value={duzenlenen.aktif ? '1' : '0'}
                onChange={(e) =>
                  setDuzenlenen({
                    ...duzenlenen,
                    aktif: e.target.value === '1',
                  })
                }
                options={aktiflikSecenekleri}
              />
            ) : k.aktif ? (
              'Aktif'
            ) : (
              'Deaktif'
            )}
          </td>
          <td className="border sticky right-0 bg-white w-40">
            <div className="grid grid-cols-2">
              {duzenlenen?.kullaniciId === k.kullaniciId ? (
                <>
                  <KaydetButton onClick={handleGuncelle} />
                  <IptalButton onClick={() => setDuzenlenen(null)} />
                </>
              ) : (
                <>
                  <DuzenleButton onClick={() => setDuzenlenen(k)} />
                  <SilButton onClick={() => handleSil(k.kullaniciId)} />
                </>
              )}
            </div>
          </td>
        </>
      )}
    />
  );
}

export default KullaniciListeModule;
