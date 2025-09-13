import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import seferlerData from "../data/seferler.json";

const InquiryPage = () => {
  const location = useLocation();
  const searchParams = location.state || {};

  const [filteredSeferler, setFilteredSeferler] = useState([]);

  useEffect(() => {
    const { kalkis, varis, tarih } = searchParams;

    if (kalkis && varis && tarih) {
      const filtered = seferlerData.filter((sefer) => {
        const seferTarih = new Date(sefer.tarih).toISOString().slice(0, 10);
        const aramaTarih = new Date(tarih).toISOString().slice(0, 10);

        return (
          sefer.kalkis === kalkis &&
          sefer.varis === varis &&
          seferTarih === aramaTarih
        );
      });
      setFilteredSeferler(filtered);
    } else {
      setFilteredSeferler([]);
    }
  }, [searchParams]);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "3rem auto",
        padding: "2rem",
        backgroundColor: "#f4f4f4",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>
        Sefer Listesi
      </h2>

      {filteredSeferler.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#999",
            fontSize: "1.1rem",
            fontStyle: "italic",
          }}
        >
          Uygun Sefer Bulunamadı
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredSeferler.map((sefer) => (
            <li
              key={sefer.id}
              style={{
                border: "1px solid #ddd",
                marginBottom: "1.5rem",
                padding: "1.5rem",
                color:"black",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Kalkış:</strong> {sefer.kalkis} &nbsp;|&nbsp;
                <strong>Varış:</strong> {sefer.varis}
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Tarih:</strong> {sefer.tarih}
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Boş Koltuk:</strong> {sefer.bosKoltuklar.length}
              </p>
              <p style={{ marginBottom: "1rem" }}>
                <strong>Fiyat:</strong> {sefer.fiyat} TL
              </p>

              <Link to={`/sefer/${sefer.id}`}>
                <button
                  style={{
                    padding: "0.7rem 1.2rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#0056b3")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#007bff")
                  }
                >
                  Detaylar
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InquiryPage;
