import { useParams, useNavigate } from "react-router-dom";
import seferlerData from "../data/seferler.json";
import { useState } from "react";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const sefer = seferlerData.find((s) => s.id === Number(id));
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!sefer) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "4rem",
          fontSize: "1.2rem",
          color: "#555",
        }}
      >
        Sefer bulunamadı!
      </div>
    );
  }

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Lütfen en az bir koltuk seçin.");
      return;
    }

    navigate("/payment", { state: { seferId: sefer.id, seats: selectedSeats } });
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "3rem auto",
        padding: "2rem",
        color:"black",
        backgroundColor: "#f4f4f4",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>
        Sefer Detayları
      </h2>

      <div style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
        <p>
          <strong>Kalkış:</strong> {sefer.kalkis}
        </p>
        <p>
          <strong>Varış:</strong> {sefer.varis}
        </p>
        <p>
          <strong>Tarih:</strong> {sefer.tarih}
        </p>
        <p>
          <strong>Fiyat:</strong> {sefer.fiyat} TL
        </p>
        <p>
          <strong>Boş Koltuklar:</strong> {sefer.bosKoltuklar.length}
        </p>
      </div>

      <h3 style={{ marginBottom: "1rem", color: "#444" }}>Koltuk Seçimi</h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.6rem",
          marginBottom: "2rem",
        }}
      >
        {sefer.bosKoltuklar.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          return (
            <button
              key={seat}
              onClick={() => toggleSeat(seat)}
              style={{
                padding: "0.6rem 1rem",
                backgroundColor: isSelected ? "#28a745" : "#fff",
                color: isSelected ? "#fff" : "#333",
                border: `2px solid ${isSelected ? "#28a745" : "#ccc"}`,
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                if (!isSelected) e.target.style.backgroundColor = "#f1f1f1";
              }}
              onMouseOut={(e) => {
                if (!isSelected) e.target.style.backgroundColor = "#fff";
              }}
            >
              {seat}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleContinue}
        style={{
          display: "block",
          width: "100%",
          padding: "1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Devam Et
      </button>
    </div>
  );
};

export default TripDetails;
