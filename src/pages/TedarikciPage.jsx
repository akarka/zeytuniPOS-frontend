import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function TedarikciPage() {
  const [order, setOrder] = useState("asc");
  const [tedarikci, setTedarikciler] = useState([]);

  useEffect(() => {
    api
      .get("/tedarikciler")
      .then((res) => {
        console.log("Tedarik:", tedarikci);
        setTedarikciler(res.data);
      })
      .catch((err) => console.error("Tedarikçiler alınamadı:", err));
  }, [order]);

  return (
    <div>
      <nav>
        <Link to="/">Ana Sayfa</Link>
      </nav>

      <table>
        <thead>
          <tr>
            <th>Tedarikçi Adı</th>
            <th>Tedarikçi İletişim</th>
            <th>Tedarikçi Adres</th>
            <th>Notlar</th>
          </tr>
        </thead>
        <tbody>
          {tedarikci.map((tedarikci, index) => (
            <tr key={tedarikci.id ?? `${index}`}>
              <td>{tedarikci.tedarikciAdi}</td>
              <td>{tedarikci.tedarikciIletisim}</td>
              <td>{tedarikci.tedarikciAdres}</td>
              <td>{tedarikci.notlar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TedarikciPage;
