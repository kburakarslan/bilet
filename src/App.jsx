import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Payment from "./pages/Payment";
import InquiryPage from "./pages/InquiryPage";
import TripDetails from "./pages/TripDetails";
import SeatSelection from "./pages/SeatSelection";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login sayfası korumasız */}
        <Route path="/login" element={<Login />} />

        {/* Korunan sayfalar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seferler"
          element={
            <ProtectedRoute>
              <InquiryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sefer/:id"
          element={
            <ProtectedRoute>
              <TripDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sefer/:id/koltuk"
          element={
            <ProtectedRoute>
              <SeatSelection />
            </ProtectedRoute>
          }
        />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
