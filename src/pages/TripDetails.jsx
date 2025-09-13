import { useParams, useNavigate } from "react-router-dom";
import seferlerData from "../data/seferler.json";
import { useState } from "react";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // id parametresi string, numaraya çevirelim
  const sefer = seferlerData.find((s) => s.id === Number(id));

  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!sefer) {
    return <p>Sefer bulunamadı!</p>;
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
    // Devam et sayfasına seçilen sefer ve koltuk bilgileri gönderilebilir
    navigate("/payment", { state: { seferId: sefer.id, seats: selectedSeats } });
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h2>Sefer Detayları</h2>
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

      <h3>Koltuk Seçimi</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {sefer.bosKoltuklar.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: selectedSeats.includes(seat) ? "green" : "white",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer",
              color: selectedSeats.includes(seat) ? "white" : "black",
            }}
          >
            {seat}
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Devam Et
      </button>
    </div>
  );
};

export default TripDetails;
