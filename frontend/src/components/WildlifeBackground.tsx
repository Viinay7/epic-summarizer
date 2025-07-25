import React from 'react';

const WildlifeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base forest gradient background */}
      <div className="absolute inset-0 forest-gradient opacity-90"></div>
      
      {/* Floating particles - forest dust */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-primary-glow/30 rounded-full animate-gentle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Animated birds silhouettes */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`bird-${i}`}
            className="absolute text-primary-glow/20 text-xl animate-bird-fly"
            style={{
              left: `-5%`,
              top: `${20 + Math.random() * 40}%`,
              animationDelay: `${i * 4}s`,
              animationDuration: '20s',
            }}
          >
            🦅
          </div>
        ))}
      </div>

      {/* Floating leaves */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute text-2xl animate-leaf-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            {['🍃', '🌿', '🍂'][Math.floor(Math.random() * 3)]}
          </div>
        ))}
      </div>

      {/* Subtle wildlife silhouettes */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-10">
        <div className="absolute bottom-0 left-10 text-6xl text-primary animate-gentle-sway">
          🌲
        </div>
        <div className="absolute bottom-0 left-32 text-4xl text-primary-glow animate-gentle-sway" style={{ animationDelay: '1s' }}>
          🦌
        </div>
        <div className="absolute bottom-0 right-32 text-5xl text-primary animate-gentle-sway" style={{ animationDelay: '2s' }}>
          🌲
        </div>
        <div className="absolute bottom-0 right-10 text-3xl text-primary-glow animate-gentle-sway" style={{ animationDelay: '3s' }}>
          🐺
        </div>
      </div>

      {/* Fireflies effect */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`firefly-${i}`}
            className="absolute w-2 h-2 bg-primary-glow rounded-full animate-firefly-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Grass silhouettes at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-20 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={`grass-${i}`}
            className="absolute bottom-0 w-1 bg-primary-glow animate-grass-sway"
            style={{
              left: `${i * 2}%`,
              height: `${20 + Math.random() * 60}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WildlifeBackground;