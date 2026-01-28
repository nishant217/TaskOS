import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-app">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">404</h1>
        <p className="mt-2 text-muted">Page not found</p>
        <div className="mt-6">
          <Link to="/" className="inline-block bg-accent text-inverse px-4 py-2 rounded-lg">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
