import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Satislar() {

    const [order, setOrder] = useState('asc');
    const [satislar, setSatislar] = useState([]);

    useEffect(() => {
        api.get('/satislar')
            .then(res => {
                console.log("Satışlar:", satislar);
                setSatislar(res.data)
            })
            .catch(err => console.error("Satışlar alınamadı:", err));
    }, [order]);

    return (

        <div>
            <nav>
                <Link to="/">Ana Sayfa</Link>
            </nav>

            <table>
                <thead>
                    <tr>
                        <th>Satış ID</th>
                        <th>Ürün ID</th>
                        <th>Miktar</th>
                        <th>Satış Fiyatı{order === 'desc'}</th>
                        <th>Satış Tarihi</th>
                    </tr>
                </thead>
                <tbody>
                    {satislar.map((satislar, index) => (
                        <tr key={satislar.id ?? `${satislar.urunId}-${index}`}>
                            <td>{satislar.id}</td>
                            <td>{satislar.urunId}</td>
                            <td>{satislar.miktar}</td>
                            <td>{satislar.satisFiyati}</td>
                            <td>{satislar.satisTarihi}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Satislar;