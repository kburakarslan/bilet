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
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h2>Sefer Listesi</h2>

      {filteredSeferler.length === 0 ? (
        <p>Uygun Sefer Bulunamadı</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredSeferler.map((sefer) => (
            <li
              key={sefer.id}
              style={{
                border: "1px solid #ddd",
                marginBottom: "1rem",
                padding: "1rem",
                borderRadius: 6,
              }}
            >
              <p>
                <strong>Kalkış:</strong> {sefer.kalkis} -{" "}
                <strong>Varış:</strong> {sefer.varis}
              </p>
              <p>
                <strong>Tarih:</strong> {sefer.tarih}
              </p>
              <p>
                <strong>Boş Koltuk Sayısı:</strong> {sefer.bosKoltuklar.length}
              </p>
              <p>
                <strong>Fiyat:</strong> {sefer.fiyat} TL
              </p>
              <Link to={`/sefer/${sefer.id}`}>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
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
