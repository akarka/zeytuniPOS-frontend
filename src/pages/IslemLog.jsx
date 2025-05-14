import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function islemLog() {

    const [order, setOrder] = useState('asc');
    const [loglar, setLoglar] = useState([]);

    useEffect(() => {
        api.get('/islemlog')
            .then(res => {
                console.log("İşlem Logları:", loglar);
                setLoglar(res.data)
            })
            .catch(err => console.error("İşlem logu alınamadı:", err));
    }, [order]);

    return (
        <div>
            <nav>
                <Link to="/">Ana Sayfa</Link>
            </nav>

            <table>
                <thead>
                    <tr>
                        <th>Tablo</th>
                        <th>İşlem ID</th>
                        <th>İşlem Türü</th>
                        <th>Tarih{order === 'desc'}</th>
                        <th>Kullanıcı</th>
                    </tr>
                </thead>
                <tbody>
                    {loglar.map((log, index) => (
                        <tr key={log.id ?? `${log.hedefTablo}-${log.hedefId}-${index}`}>
                            <td>{log.hedefTablo}</td>
                            <td>{log.hedefId}</td>
                            <td>{log.islemTuru}</td>
                            <td>{log.tarih}</td>
                            <td>{log.kullaniciId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default islemLog;