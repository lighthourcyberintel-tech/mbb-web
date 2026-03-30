import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Classes", path: "/classes" },
  { label: "Schedule", path: "/schedule" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-max section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-teal font-extrabold text-xl mb-2">MBB</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mind and Body by Bre — women-centered fitness and wellness in
              Topeka, KS.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>Topeka, KS</p>

              <p>abreparker923@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-charcoal-light pt-8 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Mind and Body by Bre. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
