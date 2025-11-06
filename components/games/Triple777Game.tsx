import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { User } from '../../types';
import { useToast } from '../Toast';
import { GrapeIcon } from '../icons/games/GrapeIcon';
import { BellIcon } from '../icons/games/BellIcon';
import { SevenIcon } from '../icons/games/SevenIcon';
import { DiamondIcon } from '../icons/games/slots/DiamondIcon';
import { CherryIcon } from '../icons/games/slots/CherryIcon';
import { BarIcon } from '../icons/games/slots/BarIcon';

interface Triple777GameProps {
  user: User;
  onClose: () => void;
  onUpdateUser: (updates: Partial<User>) => void;
}

const symbolComponents: { [key: string]: React.ReactNode } = {
  grape: <GrapeIcon />,
  bell: <BellIcon />,
  seven: <SevenIcon />,
  wild: <DiamondIcon />,
  cherry: <CherryIcon />,
  bar: <BarIcon />,
};

const payouts: { [key: string]: { [count: number]: number } } = {
  grape: { 3: 5 },
  cherry: { 3: 10 },
  bell: { 3: 15 },
  bar: { 3: 20 },
  seven: { 3: 50 },
};

const reelStrip = [
    'grape', 'bell', 'cherry', 'grape', 'seven', 'bar', 'grape', 'bell', 'grape', 'wild', 'cherry', 'bell', 'grape', 'seven', 'bar'
];


const formatBetDisplay = (num: number) => num.toString().padStart(7, '0');

const iconHeight = 96; // h-24 in Tailwind

const Reel: React.FC<{ symbols: string[]; finalIndex: number, delay: number, isSpinning: boolean }> = ({ symbols, finalIndex, delay, isSpinning }) => {
  const strip = useMemo(() => [...symbols, ...symbols, ...symbols, ...symbols, ...symbols], [symbols]);
  
  const [targetOffset, setTargetOffset] = useState(0);

  useEffect(() => {
    const finalPosition = -((3 * symbols.length) + finalIndex - 1) * iconHeight;
    
    if (isSpinning) {
        const startPosition = finalPosition + (10 * symbols.length * iconHeight);
        setTargetOffset(startPosition); 

        setTimeout(() => setTargetOffset(finalPosition), 50);
    } else {
        const currentPosition = -((3 * symbols.length) + finalIndex - 1) * iconHeight;
        setTargetOffset(currentPosition);
    }
  }, [isSpinning, finalIndex, symbols.length]);

  return (
    <div className="w-24 h-24 bg-white rounded-lg overflow-hidden relative border-4 border-slate-400 shadow-inner">
      <div 
        className="absolute top-0 left-0 w-full"
        style={{
            transform: `translateY(${targetOffset}px)`,
            transition: isSpinning ? `transform ${2500 + delay}ms cubic-bezier(0.33, 1, 0.68, 1)` : 'none',
        }}
      >
        {strip.map((s, i) => (
          <div key={i} className="w-full h-24 flex-shrink-0 flex items-center justify-center">
            <div className="w-20 h-20 flex items-center justify-center">
                {symbolComponents[s]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Coin: React.FC<{ delay: number; x: string; duration: number }> = ({ delay, x, duration }) => (
    <div 
        className="absolute top-0 text-3xl" 
        style={{ 
            animation: `coin-rain-slot ${duration}s linear ${delay}s forwards`,
            left: x,
            textShadow: '0 0 5px yellow'
        }}
    >
       💰
    </div>
);

const BigWinAnimation: React.FC<{ winAmount: number, isBigWin: boolean }> = ({ winAmount, isBigWin }) => (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center animate-big-win-burst">
        {isBigWin && <div className="absolute -inset-8 pointer-events-none">{[...Array(30)].map((_,i) => <Coin key={i} delay={i * 0.05} x={`${Math.random()*100}%`} duration={1.2} />)}</div>}
        <div className="relative w-full max-w-xs h-24 p-1 flex flex-col items-center justify-center">
            <img src={isBigWin ? "https://i.postimg.cc/bN3r4LSk/big-win-banner.png" : ""} className="absolute w-full h-full object-contain" alt="" />
            <p className="text-white text-xs -mt-2">{isBigWin ? 'BIG WIN' : ''}</p>
            <p className="text-5xl text-yellow-300 font-bold drop-shadow-lg glow-text">+ {winAmount.toLocaleString()}</p>
        </div>
    </div>
);

export const Triple777Game: React.FC<Triple777GameProps> = ({ user, onClose, onUpdateUser }) => {
  const [finalIndices, setFinalIndices] = useState([5, 5, 5]);
  const [spinning, setSpinning] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [bet, setBet] = useState(500);
  const [win, setWin] = useState<number>(0);
  const { addToast } = useToast();
  
  const betSteps = [100, 500, 1000, 5000, 10000];
  const reels = [reelStrip, reelStrip, reelStrip];
  
  useEffect(() => {
     const initialIndices = reels.map(() => Math.floor(Math.random() * reelStrip.length));
     setFinalIndices(initialIndices);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSpin = useCallback(() => {
    if (spinning) return;
    if (user.coinsBalance < bet) {
      addToast("Not enough coins!", "error");
      setIsAutoSpin(false); // Stop auto-spin if not enough coins
      return;
    }

    setSpinning(true);
    setWin(0);
    onUpdateUser({ coinsBalance: user.coinsBalance - bet });

    const newFinalIndices = reels.map(() => Math.floor(Math.random() * reelStrip.length));
    setFinalIndices(newFinalIndices);
    
    setTimeout(() => {
      const results = newFinalIndices.map(i => reelStrip[i]);
      calculateWinnings(results);
      setSpinning(false);
    }, 3200);
  }, [spinning, user.coinsBalance, bet, onUpdateUser, reels, addToast]);
  
   useEffect(() => {
    let autoSpinTimeout: number;
    if (isAutoSpin && !spinning) {
      autoSpinTimeout = window.setTimeout(() => {
        handleSpin();
      }, 1500); // 1.5 second delay between auto-spins
    }
    return () => clearTimeout(autoSpinTimeout);
  }, [isAutoSpin, spinning, handleSpin]);
  
  const toggleAutoSpin = () => {
    setIsAutoSpin(prev => !prev);
  }
  
  const calculateWinnings = (results: string[]) => {
    let winAmount = 0;
    const wildCount = results.filter(r => r === 'wild').length;

    if (wildCount === 3) {
        winAmount = bet * 100; // Jackpot
    } else if (wildCount === 2) {
        winAmount = bet * 20; // 2 wilds + anything
    } else if (wildCount === 1) {
        const nonWilds = results.filter(r => r !== 'wild');
        if (nonWilds[0] === nonWilds[1]) { // e.g., [wild, seven, seven]
            const symbol = nonWilds[0];
            winAmount = bet * (payouts[symbol]?.[3] || 0);
        } else {
            winAmount = bet * 2; // Consolation for 1 wild
        }
    } else { // 0 wilds
        if (results[0] === results[1] && results[1] === results[2]) {
            const symbol = results[0];
            winAmount = bet * (payouts[symbol]?.[3] || 0);
        }
    }

    if (winAmount > 0) {
      setWin(winAmount);
      onUpdateUser({ coinsBalance: user.coinsBalance - bet + winAmount });
    }
  };
  
  const changeBet = (increment: boolean) => {
    const currentIndex = betSteps.indexOf(bet);
    if (increment) {
        if (currentIndex < betSteps.length - 1) setBet(betSteps[currentIndex + 1]);
    } else {
        if (currentIndex > 0) setBet(betSteps[currentIndex - 1]);
    }
  };
  
  const bigWinners = useMemo(() => [
    { name: 'muskan', amount: 30000 },
    { name: 'MoaT', amount: 20710 },
  ], []);

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center p-2" onClick={onClose}>
        <div 
            className="w-full max-w-md rounded-2xl shadow-2xl text-white animate-scale-in border-[6px] border-yellow-400 bg-purple-900 overflow-hidden relative"
            onClick={e => e.stopPropagation()}
            style={{background: 'linear-gradient(180deg, #4a0e72 0%, #a438b1 100%)'}}
        >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
            {/* Side Lights */}
            <div className="absolute top-0 left-0 h-full w-8 bg-purple-800 flex flex-col justify-around items-center py-10">
                {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded-full bg-yellow-300 animate-star-flash shadow-lg" style={{ animationDelay: `${Math.random()}s` }} />)}
            </div>
            <div className="absolute top-0 right-0 h-full w-8 bg-purple-800 flex flex-col justify-around items-center py-10">
                {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded-full bg-yellow-300 animate-star-flash shadow-lg" style={{ animationDelay: `${Math.random()}s` }} />)}
            </div>
            
            <div className="relative p-2 pl-10 pr-10 flex flex-col h-full">
                {/* Header */}
                <div className="relative flex-shrink-0 flex items-center justify-between h-16 rounded-lg bg-black/30 mb-2 px-2">
                     <div className="flex items-center gap-1 p-1 rounded-full bg-black/40">
                        <img src="https://i.postimg.cc/Y0zSgY2d/coin-stack-99.png" alt="99+" className="w-8 h-8" />
                        <span className="font-bold text-sm text-yellow-300">{user.coinsBalance.toLocaleString()}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-yellow-300" style={{ fontFamily: 'Impact, sans-serif', textShadow: '2px 2px 0px #7b1fa2, 0 0 10px #fdd835' }}>Lucky 7z</h2>
                    <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-full bg-black/40"><ClockIcon className="w-5 h-5"/></button>
                        <button className="p-1.5 rounded-full bg-black/40"><SoundOnIcon className="w-5 h-5"/></button>
                        <button className="p-1.5 rounded-full bg-black/40"><HelpIcon className="w-5 h-5"/></button>
                        <button onClick={onClose} className="p-1.5 rounded-full bg-black/40 text-lg font-bold leading-none">X</button>
                    </div>
                </div>

                <div className="w-full h-6 bg-black/20 overflow-hidden relative mb-2">
                    <div className="flex absolute animate-big-win-ticker whitespace-nowrap">
                       {[...bigWinners, ...bigWinners].map((winner,i) => <p key={i} className="text-xs text-white mx-4">🎉 Congrats <span className="text-yellow-300">{winner.name}</span> on winning {winner.amount.toLocaleString()}!</p>)}
                    </div>
                </div>
                
                {/* Reel Area */}
                <div className="relative p-4 my-2 bg-gradient-to-b from-purple-800 to-purple-900 rounded-xl border-4 border-purple-400/50 shadow-inner">
                    <div className="relative flex justify-center gap-2">
                        {reels.map((_, i) => (
                            <Reel key={i} symbols={reelStrip} finalIndex={finalIndices[i]} delay={i * 150} isSpinning={spinning}/>
                        ))}
                         <div className={`absolute inset-1 border-4 border-yellow-400 rounded-lg pointer-events-none transition-all duration-300 ${win > 0 && !spinning ? 'opacity-100 animate-slot-win-glow' : 'opacity-0'}`}></div>
                    </div>
                    {win > 0 && !spinning && <BigWinAnimation winAmount={win} isBigWin={win >= bet * 10} />}
                </div>

                {/* Control Panel */}
                <div className="flex flex-col p-2 bg-black/30 rounded-lg mt-auto">
                    <div className="grid grid-cols-3 gap-2 mb-2 bg-black/20 p-2 rounded-md">
                         <div className="text-center"><p className="text-[10px] text-slate-400">TOTAL BET</p><p className="font-mono font-bold text-lg text-green-300">{formatBetDisplay(bet)}</p></div>
                         <div className="text-center"><p className="text-[10px] text-slate-400">TODAY'S WIN</p><p className="font-mono font-bold text-lg">0</p></div>
                         <div className="text-center"><p className="text-[10px] text-slate-400">WIN</p><p className="font-mono font-bold text-yellow-300 text-lg">{win.toLocaleString()}</p></div>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                        <div className="flex gap-1">
                            <button onClick={() => changeBet(false)} disabled={spinning || isAutoSpin} className="px-3 h-14 rounded-md bg-gradient-to-b from-blue-600 to-blue-800 font-bold text-xl disabled:opacity-50 border-2 border-blue-400/50 shadow-md active:translate-y-0.5">BET-</button>
                            <button onClick={() => changeBet(true)} disabled={spinning || isAutoSpin} className="px-3 h-14 rounded-md bg-gradient-to-b from-blue-600 to-blue-800 font-bold text-xl disabled:opacity-50 border-2 border-blue-400/50 shadow-md active:translate-y-0.5">BET+</button>
                        </div>
                         <button onClick={toggleAutoSpin} disabled={spinning && !isAutoSpin} className={`h-14 rounded-md font-bold text-xl border-2 shadow-md active:translate-y-0.5 px-3 transition-colors ${isAutoSpin ? 'bg-red-600 border-red-400' : 'bg-gradient-to-b from-blue-600 to-blue-800 border-blue-400/50'}`}>
                            {isAutoSpin ? 'STOP' : 'AUTO'}
                         </button>
                        <button 
                            onClick={handleSpin} 
                            disabled={spinning || isAutoSpin} 
                            className="w-28 h-16 rounded-lg bg-gradient-to-b from-blue-500 to-blue-700 border-2 border-blue-300/50 text-white font-bold text-2xl tracking-wider disabled:opacity-50 shadow-lg active:translate-y-0.5"
                        >
                            {spinning ? '...' : 'SPIN'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

// Dummy icons for the new header buttons
const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const SoundOnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);
const HelpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);