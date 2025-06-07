import { useEffect, useState } from 'react';
import api from '../util/api';
import TableMaster from '../components/TableMaster';

export default function IslemLogAdminPanel() {
  const [loglar, setLoglar] = useState([]);

  useEffect(() => {
    api.get('/api/islemlog/dto').then((res) => {
      setLoglar(res.data);
    });
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">İşlem Kayıtları</h2>

      <TableMaster
        columns={[
          { key: 'logId', label: 'ID' },
          { key: 'kullaniciAdi', label: 'Kullanıcı' },
          { key: 'islemTuru', label: 'İşlem' },
          { key: 'hedefTablo', label: 'Tablo' },
          { key: 'hedefId', label: 'Hedef ID' },
          { key: 'tarih', label: 'Tarih' },
        ]}
        data={loglar}
        keyField="logId"
        pagination={true}
        pageSize={12}
        sortable={true}
        defaultSortKey="tarih"
        defaultSortDir="desc"
        renderRow={(log) => (
          <>
            <td className="border p-2">{log.logId}</td>
            <td className="border p-2">{log.kullaniciAdi || '-'}</td>
            <td className="border p-2">{log.islemTuru}</td>
            <td className="border p-2">{log.hedefTablo}</td>
            <td className="border p-2">{log.hedefId}</td>
            <td className="border p-2">
              {log.tarih?.replace('T', ' ').slice(0, 16)}
            </td>
          </>
        )}
      />
    </div>
  );
}
