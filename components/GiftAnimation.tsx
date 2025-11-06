import React, { useEffect, useState } from 'react';
import type { GiftEvent } from '../types';

interface GiftAnimationProps {
  event: GiftEvent;
  onComplete: () => void;
}

const Particle: React.FC<{ style: React.CSSProperties; className?: string }> = ({ style, className = 'particle' }) => (
    <div className={className} style={style}></div>
);

export const GiftAnimation: React.FC<GiftAnimationProps> = ({ event, onComplete }) => {
  const [particles, setParticles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const isPremium = event.gift.isPremium;
    const newParticles: React.CSSProperties[] = [];

    if (isPremium) {
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 8 + 2}px`,
          height: `${Math.random() * 8 + 2}px`,
          backgroundColor: ['#fbbf24', '#f0abfc', '#22d3ee'][Math.floor(Math.random() * 3)],
          animationDelay: `${Math.random() * 0.5}s`
        });
      }
    } else {
      const numParticles = 30;
      for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 60 + 20;
        newParticles.push({
          top: '50%',
          left: '85%', // Approximate horizontal center of the gift icon
          transform: 'translate(-50%, -50%)',
          width: `${Math.random() * 5 + 2}px`,
          height: `${Math.random() * 5 + 2}px`,
          backgroundColor: ['#fbbf24', '#ff8a80', '#22d3ee'][Math.floor(Math.random() * 3)],
          animationDelay: `${Math.random() * 0.2}s`,
          '--tx': `${Math.cos(angle) * radius}px`,
          '--ty': `${Math.sin(angle) * radius}px`,
        } as React.CSSProperties);
      }
    }
    setParticles(newParticles);
    
    const timer = setTimeout(onComplete, isPremium ? 4000 : 2500);
    return () => clearTimeout(timer);
  }, [event, onComplete]);

  if (event.gift.isPremium) {
    return (
      <div 
        className="absolute top-24 left-0 right-0 p-2 z-50 animate-cinematic-banner"
        aria-live="polite"
      >
        <div className="relative w-full h-20 bg-gradient-to-r from-purple-600/80 via-fuchsia-700/80 to-cyan-500/80 rounded-full shadow-2xl flex items-center p-2 border-2 border-yellow-300/50 backdrop-blur-sm overflow-hidden">
            {particles.map((style, i) => <Particle key={i} style={style} />)}
            <img 
                src={event.sender.avatarUrl} 
                alt={event.sender.displayName} 
                className="w-16 h-16 rounded-full border-2 border-yellow-300 animate-fade-in z-10"
                style={{ animationDelay: '0.2s' }}
            />
            <div 
                className="ml-4 text-white animate-fade-in z-10"
                style={{ animationDelay: '0.4s' }}
            >
                <p className="font-bold text-lg drop-shadow-md">{event.sender.displayName}</p>
                <p className="text-sm drop-shadow">sent a <span className="font-bold text-yellow-300">{event.gift.name}</span>!</p>
            </div>
            <div 
                className="ml-auto w-24 h-24 flex items-center justify-center drop-shadow-lg animate-gift-icon-swoosh z-10"
                style={{ animationDelay: '0.6s' }}
            >
                {event.gift.icon}
            </div>
        </div>
      </div>
    );
  }

  // Redesigned regular gift animation
  return (
    <div 
      className="absolute bottom-20 left-4 z-50 animate-gift-toast"
      aria-live="polite"
    >
      <div className="relative glassmorphism p-1.5 rounded-full shadow-lg flex items-center border border-cyan-400/30 pr-3">
          {particles.map((style, i) => <Particle key={i} style={style} className="gift-particle" />)}
          <img src={event.sender.avatarUrl} alt={event.sender.displayName} className="w-8 h-8 rounded-full z-10" />
          <div className="ml-2 text-white text-xs z-10">
              <p className="font-bold truncate max-w-[80px]">{event.sender.displayName}</p>
              <p>sent a <span className="font-bold text-yellow-300">{event.gift.name}</span></p>
          </div>
          <div className="ml-2 w-8 h-8 flex items-center justify-center animate-scale-in z-10">{event.gift.icon}</div>
      </div>
    </div>
  )
};