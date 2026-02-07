
import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { getMovieAIInsight } from '../services/geminiService';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const [insight, setInsight] = useState<{aiScore: number, insight: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInsight() {
      setLoading(true);
      const data = await getMovieAIInsight(movie.title);
      setInsight(data);
      setLoading(false);
    }
    loadInsight();
  }, [movie]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Modal Body */}
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-zinc-900/50 backdrop-blur-md hover:bg-zinc-800 text-white rounded-full flex items-center justify-center transition-all border border-zinc-800"
          onClick={onClose}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Poster Section */}
        <div className="md:w-2/5 relative h-96 md:h-auto border-r border-zinc-900">
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-black tracking-widest text-zinc-400 rounded-md">
              {movie.year}
            </span>
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-black tracking-widest text-zinc-400 rounded-md uppercase">
              {movie.type === 'tv' ? `${movie.seasons} Seasons` : movie.duration}
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xl font-bold text-white">{movie.rating}</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">{movie.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-[10px] font-black rounded border border-purple-500/30 uppercase tracking-widest">
              {movie.type === 'tv' ? 'Series' : 'Film'}
            </span>
            {movie.genres.map(genre => (
              <span key={genre} className="px-4 py-1 bg-zinc-900/50 text-xs font-medium text-zinc-400 rounded-full border border-zinc-800">
                {genre}
              </span>
            ))}
          </div>

          <div className="bg-purple-600/10 border border-purple-500/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">AI Critical Score</span>
                <span className="text-3xl font-black text-white">
                  {loading ? '...' : (insight?.aiScore || movie.aiScore)}%
                </span>
              </div>
              <div className="h-12 w-[1px] bg-purple-500/20"></div>
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Deep Insight</span>
                <p className="text-sm font-semibold text-zinc-200 leading-tight">
                  {loading ? 'Analyzing cinematic nuances...' : (insight?.insight || movie.aiInsight)}
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-zinc-400 leading-relaxed mb-8">
            {movie.description}
          </p>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Director / Creator</h4>
              <p className="text-zinc-200 font-bold">{movie.director}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Starring</h4>
              <p className="text-zinc-200 font-bold">{movie.cast.join(', ')}</p>
            </div>
          </div>

          <button className="w-full py-5 bg-white text-black text-lg font-black rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Watch on Netflix
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
