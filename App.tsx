
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import { MOVIES } from './constants';
import { Movie, Category } from './types';

const App: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [activeType, setActiveType] = useState<'movie' | 'tv' | 'all'>('all');

  const filteredMovies = useMemo(() => {
    return MOVIES.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || movie.genres.includes(activeCategory);
      const matchesType = activeType === 'all' || movie.type === activeType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, activeCategory, activeType]);

  const featuredMovie = useMemo(() => {
    // Pick something iconic like Stranger Things or RRR
    return MOVIES.find(m => m.title === 'Stranger Things') || MOVIES[0];
  }, []);

  const handleHomeClick = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setActiveType('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMoviesClick = () => {
    setActiveType('movie');
    setActiveCategory('All');
    setSearchQuery('');
  };

  const handleTVClick = () => {
    setActiveType('tv');
    setActiveCategory('All');
    setSearchQuery('');
  };

  const categories: Category[] = ['All', 'Action', 'Sci-Fi', 'Drama', 'Comedy', 'Animation', 'Documentary', 'Thriller', 'Horror'];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-purple-600/30 selection:text-purple-200">
      <Navbar 
        onSearch={setSearchQuery} 
        onHomeClick={handleHomeClick} 
        onMoviesClick={handleMoviesClick}
        onTVClick={handleTVClick}
      />
      
      {/* Hero Section */}
      {!searchQuery && activeCategory === 'All' && activeType === 'all' && (
        <Hero 
          movie={featuredMovie} 
          onViewDetails={setSelectedMovie} 
        />
      )}

      {/* Main Content */}
      <main className={`px-6 md:px-12 py-12 ${!searchQuery && activeCategory === 'All' && activeType === 'all' ? '-mt-24 relative z-10' : 'pt-28'}`}>
        
        {/* Genre/Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/20' 
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Heading */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : 
               activeType === 'movie' ? 'Netflix Movies' : 
               activeType === 'tv' ? 'Netflix TV Shows' : 
               'Netflix Popular Now'}
            </h2>
            <p className="text-sm font-medium text-zinc-500 mt-1">Sourced from Netflix India and Worldwide trends.</p>
          </div>
          <div className="flex items-center gap-4">
             <span className="hidden md:inline text-xs font-black text-zinc-600 uppercase tracking-widest">{filteredMovies.length} TITLES</span>
          </div>
        </div>

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
            {filteredMovies.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={setSelectedMovie} 
              />
            ))}
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-3xl">
            <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="font-bold text-lg">No content found matching your criteria</p>
            <button 
              className="mt-4 text-purple-500 font-bold hover:underline"
              onClick={() => {setSearchQuery(''); setActiveCategory('All'); setActiveType('all');}}
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Bottom Call to Action */}
        <div className="mt-24 p-12 bg-gradient-to-br from-purple-600 to-indigo-900 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
          
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-4xl font-black text-white mb-4 leading-tight">Your favorite Netflix shows, <br/> curated by AI.</h2>
            <p className="text-white/80 font-medium max-w-lg mb-8 md:mb-0">
              Mappl uses advanced reasoning to search through thousands of Netflix titles to find exactly what fits your current mood.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col gap-3 w-full md:w-auto">
            <button className="px-10 py-5 bg-white text-purple-900 font-black rounded-2xl shadow-xl hover:bg-zinc-100 transition-all active:scale-95">
              Start Discovery
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-12 py-12 border-t border-zinc-900 text-zinc-600">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="w-6 h-6 bg-zinc-600 rounded flex items-center justify-center">
              <span className="text-zinc-950 font-black text-sm">M</span>
            </div>
            <span className="text-sm font-bold tracking-tight">mappl.tv</span>
          </div>
          <div className="text-xs">
            © {new Date().getFullYear()} Mappl TV. Powered by JustWatch Data.
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
};

export default App;
