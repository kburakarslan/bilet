const BusList = ({ seferler }) => {
  if (seferler.length === 0) {
    return <p style={{ textAlign: "center" }}>Uygun sefer bulunamadı.</p>;
  }

  return (
    <div className="bus-list">
      {seferler.map((sefer) => (
        <div key={sefer.id} className="bus-card">
          <h3>{sefer.firma}</h3>
          <p>
            {sefer.kalkis} → {sefer.varis}
          </p>
          <p>Tarih: {sefer.tarih} | Saat: {sefer.saat}</p>
          <p>Fiyat: {sefer.fiyat}₺</p>
          <button>Bilet Al</button>
        </div>
      ))}
    </div>
  );
};

export default BusList;
