import { useEffect, useState } from "react";
import api from "../util/api";
import { Link } from "react-router-dom";

function IslemLogAdminPanel() {
  const [loglar, setLoglar] = useState([]);

  useEffect(() => {
    api.get("/api/islemlog/dto").then((res) => {
      setLoglar(res.data);
    });
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">İşlem Kayıtları</h2>

      <table className="w-full border text-center text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Kullanıcı</th>
            <th className="p-2 border">İşlem</th>
            <th className="p-2 border">Tablo</th>
            <th className="p-2 border">Hedef ID</th>
            <th className="p-2 border">Tarih</th>
          </tr>
        </thead>
        <tbody>
          {loglar.map((log) => (
            <tr key={log.logId}>
              <td className="border p-2">{log.logId}</td>
              <td className="border p-2">{log.kullaniciAdi || "-"}</td>
              <td className="border p-2">{log.islemTuru}</td>
              <td className="border p-2">{log.hedefTablo}</td>
              <td className="border p-2">{log.hedefId}</td>
              <td className="border p-2">
                {log.tarih?.replace("T", " ").slice(0, 16)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IslemLogAdminPanel;
