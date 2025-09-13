import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [kalkis, setKalkis] = useState("");
  const [varis, setVaris] = useState("");
  const [tarih, setTarih] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (kalkis && varis && tarih) {
      navigate("/seferler", { state: { kalkis, varis, tarih } });
    } else {
      alert("Lütfen tüm alanları doldurun");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Hoşgeldiniz!</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "2rem" }}>
        <div>
          <label>Kalkış Yeri</label>
          <select value={kalkis} onChange={(e) => setKalkis(e.target.value)} required>
            <option value="">Seçiniz</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
            {/* İstersen daha fazla şehir ekleyebilirsin */}
          </select>
        </div>

        <div>
          <label>Varış Yeri</label>
          <select value={varis} onChange={(e) => setVaris(e.target.value)} required>
            <option value="">Seçiniz</option>
            <option value="Ankara">Ankara</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Antalya">Antalya</option>
          </select>
        </div>

        <div>
          <label>Sefer Tarihi</label>
          <input
            type="date"
            value={tarih}
            onChange={(e) => setTarih(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          Sefer Ara
        </button>
      </form>

      <button
        onClick={handleLogout}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Çıkış Yap
      </button>
    </div>
  );
};

export default HomePage;
