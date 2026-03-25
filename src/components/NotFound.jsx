// src/components/NotFound.js
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 tracking-display">404</h1>
        <p className="text-xl text-on-surface-variant mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
