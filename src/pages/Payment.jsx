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
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "3rem auto",
          padding: "2rem",
          backgroundColor: "#fff3f3",
          color: "#a94442",
          border: "1px solid #ebccd1",
          borderRadius: "8px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h3 style={{ textAlign: "center" }}>⚠️ Erişim Hatası</h3>
        <p>Lütfen önce sefer ve koltuk seçimi yapınız.</p>
      </div>
    );
  }

  function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")                   
    .replace(/(.{4})/g, "$1 ")            
    .trim();                              
  }

  function formatExpiryDate(value) {
  const cleaned = value.replace(/\D/g, ""); // Sadece rakamları al
  if (cleaned.length >= 3) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4); // MM/YY
  }
  return cleaned;
  }

  const handlePayment = (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Lütfen kart sahibinin adını girin.");
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) return alert("Lütfen geçerli 16 haneli kart numarası girin.");
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry))
      return alert("Lütfen geçerli bir son kullanma tarihi (MM/YY) girin.");
    if (!/^\d{3}$/.test(cvv)) return alert("Lütfen 3 haneli CVV kodunu girin.");

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsPaid(true);
    }, 1500);
  };

  if (isPaid) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "3rem auto",
          padding: "2rem",
          backgroundColor: "#e6ffed",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          color:"black",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ color: "#28a745" }}>🎉 Ödeme Başarılı!</h2>
        <p>✅ Sefer ID: {seferId}</p>
        <p>🪑 Seçilen Koltuklar: {seats.join(", ")}</p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "3rem auto",
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        color:"black",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>💳 Ödeme Bilgileri</h2>
      <form onSubmit={handlePayment}>
        <div style={{ marginBottom: "1.2rem" }}>
          <label style={{ fontWeight: "bold" }}>Kart Sahibinin Adı Soyadı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Adınız Soyadınız"
            style={{
              width: "100%",
              padding: "0.7rem",
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: "0.3rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.2rem" }}>
          <label style={{ fontWeight: "bold" }}>Kart Numarası</label>
           <input
    type="text"
    value={cardNumber}
    onChange={(e) => {
      const raw = e.target.value;
      setCardNumber(formatCardNumber(raw));
    }}
    maxLength={19} // 16 rakam + 3 boşluk = 19 karakter
    placeholder="4444 1234 5678 9012"
    required
    style={{
      width: "100%",
      padding: "0.7rem",
      borderRadius: 6,
      border: "1px solid #ccc",
      letterSpacing: "1.5px",
      marginTop: "0.3rem",
    }}
  />
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: "bold" }}>Son Kullanma (MM/YY)</label>
            <input
  type="text"
  value={expiry}
  onChange={(e) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiry(formatted);
  }}
  maxLength={5}
  placeholder="MM/YY"
  required
  style={{
    width: "100%",
    padding: "0.7rem",
    borderRadius: 6,
    border: "1px solid #ccc",
    marginTop: "0.3rem",
  }}
/>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: "bold" }}>CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              maxLength={3}
              placeholder="CVV"
              required
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: 6,
                border: "1px solid #ccc",
                marginTop: "0.3rem",
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: isLoading ? "#6c757d" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
          }}
        >
          {isLoading ? (
            <>
              <Spinner />
              Ödeme İşleniyor...
            </>
          ) : (
            "Ödemeyi Onayla"
          )}
        </button>
      </form>
    </div>
  );
};

// 🌀 Basit Spinner (Dönen yuvarlak)
const Spinner = () => (
  <svg
    style={{ verticalAlign: "middle" }}
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
