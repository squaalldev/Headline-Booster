import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fdf8f5] to-[#f4e8e1]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[#e8d1c4] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌎</span>
            <span className="text-xl font-semibold text-[#6e4433]">Compartir</span>
          </Link>
          <div className="text-[#8d5c48] text-sm">
            live the language
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-[#e8d1c4] py-4">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#c09984]">
          <p>💬 Conversar en inglés — sin presión, solo compartir</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;