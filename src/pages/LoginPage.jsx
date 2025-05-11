import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setAktifKullanici }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Sahte kullanıcı kimliği — backend'e bağlı değil - password kontrolü yok
    const sahteKullanicilar = [
      { id: 1, ad: 'admin', rolId: 1 },
      { id: 2, ad: 'editor1', rolId: 2 },
      { id: 3, ad: 'kasiyer', rolId: 3 }
    ];

    const bulunan = sahteKullanicilar.find(k => k.ad === username);
    if (!bulunan) {
      alert("Kullanıcı bulunamadı");
      return;
    }

    setAktifKullanici(bulunan);
    localStorage.setItem('aktifKullanici', JSON.stringify(bulunan));
    navigate('/');
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Giriş Yap</h2>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button type="submit">Giriş</button>
    </form>
  );
}

export default LoginPage;
