import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Navbar />}
      <main className={`flex-1 ${!isAdmin ? "pt-16 md:pt-20" : ""}`}>
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}
