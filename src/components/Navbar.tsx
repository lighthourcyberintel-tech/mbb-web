import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Classes", path: "/classes" },
  { label: "Schedule", path: "/schedule" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95"
      }`}
    >
      <div className="container-max px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/B00AAEA9-E619-4209-ACD8-CBCCFD678F39.png"
              alt="MBB"
              className="h-10"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-teal border-b-2 border-teal pb-0.5"
                    : "text-charcoal hover:text-teal"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary text-sm py-2 px-4">
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden text-charcoal hover:text-teal transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-cream-dark shadow-lg">
          <div className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold py-2 transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-teal"
                    : "text-charcoal hover:text-teal"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary text-sm text-center">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
