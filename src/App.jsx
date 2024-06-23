import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ResepAfter from "./pages/ResepAfter";
import ResepBefore from './pages/ResepBefore'
import detalbefore from './component/before/resep/detail'
import HomePage from "./pages/HomePage";
import DetailResep from "./pages/DetailResepPage";
import AboutMePage from "./pages/AboutMePage";
import ArtikelPage from "./pages/ArtikelPage";
import LoginPage from "./component/Login";
import RakResep from "./component/after/resep/RakResep";
import RegisterPage from "./component/Register";
import UnggahanPage from "./pages/UnggahanPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateUser from "./pages/UpdateUser";
import DetailArtikelPage from "./pages/DetailArtikelPage";
import ResepAdmin from "./component/admin/ResepAdmin";
import DashboardPage from "./pages/DashboardPage";
import DetailAllArtikel from "./pages/DetailAllArtikelPage";
import KategoriPage from "./pages/KategoriPage";
import ArtikelAdminPage from "./pages/ArtikelAdminPage";
import About from "./component/before/about/About";
About

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={IndexPage} />
        <Route path="/resep" Component={ResepAfter} />
        <Route path="/resepp" Component={ResepBefore} />
        <Route path="/detailbef/:id" Component={detalbefore} />
        <Route path="/home" Component={HomePage} />
        <Route path="/detail/:id" Component={DetailResep} />
        <Route path="/about" Component={AboutMePage} />
        <Route path="/aboutbef" Component={About} />
        <Route path="/artikel" Component={ArtikelPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/rakresep" Component={RakResep} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/dashboard" Component={DashboardPage} />
        <Route path="/unggahan" Component={UnggahanPage} />
        <Route path="/profil" Component={ProfilePage} />
        <Route path="/update/:id" Component={UpdateUser} />
        <Route path="/detail-artikel/:id" Component={DetailArtikelPage} />
        <Route path="/detail-all-artikel/:id" Component={DetailAllArtikel} />
        <Route path="/resep-admin" Component={ResepAdmin} />
        <Route path="/artikel-admin" Component={ArtikelAdminPage} />
        <Route path="/kategori/:kategori" Component={KategoriPage} />
      </Routes>
    </div>
  );
}

export default App;
