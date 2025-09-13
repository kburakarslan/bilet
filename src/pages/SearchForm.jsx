import { useState } from "react";

const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];

const SearchForm = ({ onSearch }) => {
  const [kalkis, setKalkis] = useState("");
  const [varis, setVaris] = useState("");
  const [tarih, setTarih] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!kalkis || !varis || !tarih) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    if (kalkis === varis) {
      alert("Kalkış ve varış şehirleri aynı olamaz.");
      return;
    }

    onSearch({ kalkis, varis, tarih });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div>
        <label>Kalkış Yeri:</label>
        <select value={kalkis} onChange={(e) => setKalkis(e.target.value)} required>
          <option value="">Seçiniz</option>
          {cities.map((city, i) => (
            <option key={`k-${i}`} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Varış Yeri:</label>
        <select value={varis} onChange={(e) => setVaris(e.target.value)} required>
          <option value="">Seçiniz</option>
          {cities.map((city, i) => (
            <option key={`v-${i}`} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Sefer Tarihi:</label>
        <input
          type="date"
          value={tarih}
          onChange={(e) => setTarih(e.target.value)}
          required
        />
      </div>

      <button type="submit">Sefer Ara</button>
    </form>
  );
};

export default SearchForm;
