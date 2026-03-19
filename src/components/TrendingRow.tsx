import React from 'react';
import { Movie } from '../types';

interface TrendingRowProps {
  movies: Movie[];
  onClick: (movie: Movie) => void;
}

// ✅ motion.div সরানো — whileTap এর বদলে CSS active state
// ✅ React.memo — parent re-render এ এটা re-render হবে না
const TrendingRow: React.FC<TrendingRowProps> = React.memo(({ movies, onClick }) => {
  if (!movies || movies.length === 0) return null;
  
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '18px',
        paddingLeft: '4px',
        paddingRight: '4px',
        paddingBottom: '12px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        // ✅ scrollBehavior smooth সরানো — scroll jank করে
      }}
        className="no-scrollbar"
      >
        {movies.slice(0, 10).map((movie, index) => (
          <div
            key={movie.id}
            onClick={() => onClick(movie)}
            style={{
              position: 'relative',
              flexShrink: 0,
              width: '100px',
              height: '150px',
              cursor: 'pointer',
              // ✅ GPU layer
              transform: 'translateZ(0)',
              contain: 'layout style paint',
              // ✅ CSS active scale — JS animation নয়
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {/* Big Number — ✅ drop-shadow filter সরানো (GPU intensive) */}
            <div style={{
              position: 'absolute',
              left: '-14px',
              bottom: '-8px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '90px',
              fontWeight: 900,
              lineHeight: 1,
              zIndex: 10,
              userSelect: 'none',
              pointerEvents: 'none',
              WebkitTextStroke: '2px rgba(255,255,255,0.15)',
              color: 'transparent',
              // ✅ drop-shadow সরানো — text-stroke alone ভালো দেখায়
            }}>
              {index + 1}
            </div>

            {/* Card */}
            <div style={{
              position: 'absolute',
              right: 0, top: 0,
              width: '82px', height: '122px',
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#111114',
              zIndex: 20,
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            }}>
              <img
                src={movie.thumbnail}
                alt={movie.title}
                loading="lazy"
                decoding="async"
                style={{ 
                  width: '100%', height: '100%', 
                  objectFit: 'cover', objectPosition: 'center top',
                  transform: 'translateZ(0)',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

TrendingRow.displayName = 'TrendingRow';

export default TrendingRow;
