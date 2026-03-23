import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <h1 className="text-8xl font-extrabold text-teal mb-4">404</h1>
        <h2 className="text-2xl font-bold text-charcoal mb-4">
          Page Not Found
        </h2>
        <p className="text-charcoal-light mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved. Let us
          get you back on track.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
