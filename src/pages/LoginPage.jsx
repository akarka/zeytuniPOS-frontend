import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../util/api';
import ContentContainer from '../components/ContentContainer';
import InputField from '../components/InputField';
import { GirisButton } from '../components/buttons';

function LoginPage({ setAktifKullanici }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);

      await api.post('/api/auth/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });

      // Başarılı giriş sonrası kullanıcı bilgisini çekelim
      const res = await api.get('http://localhost:8080/api/kullanicilar/dto', {
        withCredentials: true,
      });

      const bulunan = res.data.find((k) => k.kullaniciAdi === username);
      if (!bulunan) throw new Error('Kullanıcı verisi çekilemedi');

      setAktifKullanici(bulunan);
      localStorage.setItem('aktifKullanici', JSON.stringify(bulunan));
      navigate('/');
    } catch (err) {
      console.error('Giriş başarısız:', err);
      alert('Giriş başarısız. Lütfen bilgileri kontrol edin.');
    }
  };

  return (
    <ContentContainer>
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto mt-16 p-6 border rounded bg-gray-50 shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>

        <InputField
          placeholder="Kullanıcı adı"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputField
          placeholder="Şifre"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mt-6 text-center">
          <GirisButton type="submit" />
        </div>
      </form>
    </ContentContainer>
  );
}

export default LoginPage;
