
import React, { useState } from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onHomeClick: () => void;
  onMoviesClick: () => void;
  onTVClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onHomeClick, onMoviesClick, onTVClick }) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          onClick={onHomeClick}
        >
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors">
            <span className="text-white font-black text-xl">M</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-100 hidden sm:inline">mappl<span className="text-purple-500">.tv</span></span>
        </div>

        {/* Desktop Search Bar */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={inputValue}
              placeholder="Search movies, TV shows..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-5 pr-12 py-2.5 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            />
            <button 
              onClick={handleSearchClick}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-purple-600 hover:bg-purple-500 text-white rounded-full flex items-center justify-center transition-all shadow-lg shadow-purple-900/40"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Toggle & Nav Items */}
        <div className="flex items-center gap-3 md:gap-6">
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
          
          <button onClick={onMoviesClick} className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors hidden sm:block">Movies</button>
          <button onClick={onTVClick} className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors hidden sm:block">TV Shows</button>
          <button className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-purple-900/20 whitespace-nowrap">
            Sign In
          </button>
        </div>
      </div>

      {/* Mobile Search Input (Expandable) */}
      {isMobileSearchOpen && (
        <div className="mt-4 md:hidden animate-in slide-in-from-top duration-200">
          <div className="relative flex items-center">
            <input 
              type="text" 
              autoFocus
              value={inputValue}
              placeholder="Search..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-600/50"
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && setIsMobileSearchOpen(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
