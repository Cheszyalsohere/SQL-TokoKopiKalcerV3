import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import ScrollToHash from './components/ScrollToHash/ScrollToHash.jsx';

import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Login from './pages/Login/Login.jsx';
import ArtikelArsip from './pages/ArtikelArsip/ArtikelArsip.jsx';
import ArtikelDetail from './pages/ArtikelDetail/ArtikelDetail.jsx';
import KatalogProduk from './pages/KatalogProduk/KatalogProduk.jsx';
import DetailProduk from './pages/DetailProduk/DetailProduk.jsx';
import Keranjang from './pages/Keranjang/Keranjang.jsx';
import Pembayaran from './pages/Pembayaran/Pembayaran.jsx';
import HistoryTransaksi from './pages/HistoryTransaksi/HistoryTransaksi.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import KelolaArtikel from './pages/KelolaArtikel/KelolaArtikel.jsx';
import KelolaProduk from './pages/KelolaProduk/KelolaProduk.jsx';
import KelolaPengguna from './pages/KelolaPengguna/KelolaPengguna.jsx';
import KelolaTransaksi from './pages/KelolaTransaksi/KelolaTransaksi.jsx';

export default function App() {
  const location = useLocation();
  const hideChrome = location.pathname === '/login';

  return (
    <>
      <ScrollToHash />
      {!hideChrome && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artikel" element={<ArtikelArsip />} />
          <Route path="/artikel/:id" element={<ArtikelDetail />} />
          <Route path="/produk" element={<KatalogProduk mode="shop" />} />
          <Route path="/menu" element={<KatalogProduk mode="menu" />} />
          <Route path="/produk/:id" element={<DetailProduk />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/pembayaran" element={<Pembayaran />} />
          <Route path="/history" element={<HistoryTransaksi />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/artikel"
            element={
              <ProtectedRoute>
                <KelolaArtikel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/produk"
            element={
              <ProtectedRoute>
                <KelolaProduk />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/pengguna"
            element={
              <ProtectedRoute>
                <KelolaPengguna />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/transaksi"
            element={
              <ProtectedRoute>
                <KelolaTransaksi />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
    </>
  );
}
