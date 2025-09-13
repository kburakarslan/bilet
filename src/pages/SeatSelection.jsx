import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import seferler from "../data/seferler.json";

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const sefer = seferler.find((item) => item.id === parseInt(id));

  if (!sefer) return <p>Sefer bulunamadı.</p>;

  // Örnek koltuk düzeni: 20 koltuk (5 satır x 4 koltuk)
  const totalSeats = 20;
  const bookedSeats = sefer.doluKoltuklar || [3, 5, 12]; // örnek dolu koltuklar

  const handleSelect = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Lütfen en az bir koltuk seçin.");
      return;
    }

    // Koltuk ve sefer bilgilerini bir sonraki sayfaya aktar
    navigate(`/sefer/${id}/yolcu`, {
      state: {
        sefer,
        selectedSeats,
      },
    });
  };

  return (
    <div className="seat-selection-container">
      <h2>Koltuk Seçimi</h2>
      <div className="bus-layout">
        {[...Array(totalSeats)].map((_, index) => {
          const seatNumber = index + 1;
          const isBooked = bookedSeats.includes(seatNumber);
          const isSelected = selectedSeats.includes(seatNumber);

          return (
            <div
              key={seatNumber}
              className={`seat ${isBooked ? "booked" : ""} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => handleSelect(seatNumber)}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>

      <div className="actions">
        <p>
          Seçilen Koltuklar:{" "}
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "Henüz seçilmedi"}
        </p>
        <button onClick={handleContinue}>Devam Et</button>
      </div>
    </div>
  );
};

export default SeatSelection;
