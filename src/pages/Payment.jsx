import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { seferId, seats } = location.state || {};

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  if (!seferId || !seats || seats.length === 0) {
    return <p>Ödeme sayfasına erişim hatası. Lütfen sefer ve koltuk seçimi yapınız.</p>;
  }

  const handlePayment = (e) => {
    e.preventDefault();

    // Basit validasyonlar
    if (!name.trim()) {
      alert("Lütfen kart sahibinin adını girin.");
      return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Lütfen geçerli 16 haneli kart numarası girin.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry)) {
      alert("Lütfen geçerli bir son kullanma tarihi (MM/YY) girin.");
      return;
    }
    if (!/^\d{3}$/.test(cvv)) {
      alert("Lütfen 3 haneli CVV kodunu girin.");
      return;
    }

    setIsLoading(true);

    // Simüle edilmiş ödeme işlemi (1.5 saniye bekleme)
    setTimeout(() => {
      setIsLoading(false);
      setIsPaid(true);
    }, 1500);
  };

  if (isPaid) {
    return (
      <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
        <h2>Ödeme Başarılı!</h2>
        <p>Sefer ID: {seferId}</p>
        <p>Seçilen Koltuklar: {seats.join(", ")}</p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Ödeme Bilgileri</h2>
      <form onSubmit={handlePayment}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Kart Sahibinin Adı Soyadı:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Adınız Soyadınız"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Kart Numarası:</label><br />
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            maxLength={16}
            placeholder="16 haneli kart numarası"
            required
            style={{ width: "100%", padding: "0.5rem", letterSpacing: "2px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label>Son Kullanma Tarihi (MM/YY):</label><br />
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              maxLength={5}
              placeholder="MM/YY"
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>CVV:</label><br />
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              maxLength={3}
              placeholder="CVV"
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: isLoading ? "#6c757d" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {isLoading ? (
            <span>
              <Spinner /> Ödeme İşleniyor...
            </span>
          ) : (
            "Ödemeyi Onayla"
          )}
        </button>
      </form>
    </div>
  );
};

// Basit spinner bileşeni
const Spinner = () => (
  <svg
    style={{ margin: "0 auto", display: "inline-block", verticalAlign: "middle" }}
    width="20px"
    height="20px"
    viewBox="0 0 50 50"
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="#fff"
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="31.4 31.4"
      transform="rotate(0 25 25)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default Payment;
