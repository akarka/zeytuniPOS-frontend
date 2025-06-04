import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../util/api";

function LoginPage({ setAktifKullanici }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      await api.post("/api/auth/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      });

      // Başarılı giriş sonrası kullanıcı bilgisini çekelim
      const res = await api.get("http://localhost:8080/api/kullanicilar/dto", {
        withCredentials: true,
      });

      const bulunan = res.data.find((k) => k.kullaniciAdi === username);
      if (!bulunan) throw new Error("Kullanıcı verisi çekilemedi");

      setAktifKullanici(bulunan);
      localStorage.setItem("aktifKullanici", JSON.stringify(bulunan));
      navigate("/");
    } catch (err) {
      console.error("Giriş başarısız:", err);
      alert("Giriş başarısız. Lütfen bilgileri kontrol edin.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Giriş Yap</h2>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Giriş</button>
    </form>
  );
}

export default LoginPage;
