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
    <div
      style={{
        maxWidth: "500px",
        margin: "3rem auto",
        padding: "2rem",
        borderRadius: "12px",
        backgroundColor: "#f4f4f4",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        color:"black",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>
        Hoşgeldiniz!
      </h1>

      <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Kalkış Yeri</label>
          <select
            value={kalkis}
            onChange={(e) => setKalkis(e.target.value)}
            style={{
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          >
            <option value="">Seçiniz</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Varış Yeri</label>
          <select
            value={varis}
            onChange={(e) => setVaris(e.target.value)}
            style={{
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          >
            <option value="">Seçiniz</option>
            <option value="Ankara">Ankara</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Antalya">Antalya</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Sefer Tarihi</label>
          <input
            type="date"
            value={tarih}
            onChange={(e) => setTarih(e.target.value)}
            style={{
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "0.8rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Sefer Ara
        </button>
      </form>

      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          marginTop: "1.5rem",
          padding: "0.8rem",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#a71d2a")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
      >
        Çıkış Yap
      </button>
    </div>
  );
};

export default HomePage;
