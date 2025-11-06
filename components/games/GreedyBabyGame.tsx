import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { User } from '../../types';
import { useToast } from '../Toast';
import { CoinIcon } from '../icons/CoinIcon';
import { AppleIcon } from '../icons/games/greedy-baby/AppleIcon';
import { BurgerIcon } from '../icons/games/greedy-baby/BurgerIcon';
import { ElephantIcon } from '../icons/games/greedy-baby/ElephantIcon';
import { FishIcon } from '../icons/games/greedy-baby/FishIcon';
import { LemonIcon } from '../icons/games/greedy-baby/LemonIcon';
import { MangoIcon } from '../icons/games/greedy-baby/MangoIcon';
import { PizzaIcon } from '../icons/games/greedy-baby/PizzaIcon';
import { StrawberryIcon } from '../icons/games/greedy-baby/StrawberryIcon';
import { ClockIcon } from '../icons/games/greedy-baby/ClockIcon';
import { HelpIcon } from '../icons/games/greedy-baby/HelpIcon';
import { SoundOnIcon } from '../icons/games/greedy-baby/SoundOnIcon';
import { RankOneIcon } from '../icons/games/greedy-baby/RankOneIcon';
import { RankTwoIcon } from '../icons/games/greedy-baby/RankTwoIcon';
import { RankThreeIcon } from '../icons/games/greedy-baby/RankThreeIcon';
import { mockUsers } from '../../data/mock';
import { FruitBasketIcon } from '../icons/games/greedy-baby/FruitBasketIcon';
import { PizzaSliceIcon } from '../icons/games/greedy-baby/PizzaSliceIcon';


interface GreedyBabyGameProps {
  user: User;
  onClose: () => void;
  onUpdateUser: (updates: Partial<User>) => void;
}

const wheelItems = [
  { id: 'apple', icon: <AppleIcon className="w-10 h-10" />, multiplier: 5, category: 'fruits' },
  { id: 'lemon', icon: <LemonIcon className="w-10 h-10" />, multiplier: 5, category: 'fruits' },
  { id: 'strawberry', icon: <StrawberryIcon className="w-10 h-10" />, multiplier: 5, category: 'fruits' },
  { id: 'mango', icon: <MangoIcon className="w-10 h-10" />, multiplier: 5, category: 'fruits' },
  { id: 'fish', icon: <FishIcon className="w-10 h-10" />, multiplier: 10, category: 'fastfood' },
  { id: 'burger', icon: <BurgerIcon className="w-10 h-10" />, multiplier: 15, category: 'fastfood' },
  { id: 'pizza', icon: <PizzaIcon className="w-10 h-10" />, multiplier: 25, category: 'fastfood' },
  { id: 'chicken', icon: <img src="https://i.postimg.cc/pT3Y73b5/chicken-leg.png" alt="chicken" className="w-10 h-10" />, multiplier: 45, category: 'fastfood' },
];

const betTiers = {
    low: [100, 1000, 5000, 10000, 50000],
    high: [50000, 100000, 500000, 1000000, 5000000]
};

const BET_TIME = 15;
const SHOW_TIME = 7;

const mockWinners = [
    { user: mockUsers[2], amount: 3250000 },
    { user: mockUsers[3], amount: 1000000 },
    { user: mockUsers[4], amount: 1000000 },
];

export const GreedyBabyGame: React.FC<GreedyBabyGameProps> = ({ user, onClose, onUpdateUser }) => {
  const [gameState, setGameState] = useState<'BETTING' | 'SPINNING' | 'SHOWING_RESULT'>('BETTING');
  const [timer, setTimer] = useState(BET_TIME);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  const [currentBetAmount, setCurrentBetAmount] = useState(100);
  const [betTier, setBetTier] = useState<'low' | 'high'>('low');
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [spinningIndex, setSpinningIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [winAmount, setWinAmount] = useState(0);
  const { addToast } = useToast();

  const totalBet = useMemo(() => Object.values(bets).reduce((sum: number, b: number) => sum + b, 0), [bets]);
  const timerIntervalRef = useRef<number>();
  const spinIntervalRef = useRef<number>();

  useEffect(() => {
    timerIntervalRef.current = window.setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timerIntervalRef.current);
  }, []);

  useEffect(() => {
    if (timer <= 0 && gameState === 'BETTING') {
        setGameState('SPINNING');
        const finalIndex = Math.floor(Math.random() * wheelItems.length);
        
        let spinCount = 0;
        let speed = 50;
        
        const spin = () => {
          spinCount++;
          setSpinningIndex(prev => (prev + 1) % wheelItems.length);
          
          if (spinCount > 40 + wheelItems.length * 2) { // End condition
             if(spinIntervalRef.current) clearInterval(spinIntervalRef.current);
             setResultIndex(finalIndex);
             const winningItem = wheelItems[finalIndex];
             const playerBetOnItem = bets[winningItem.id] || 0;
             const playerBetOnCategory = winningItem.category === 'fruits' ? (bets['fruits'] || 0) : (bets['fastfood'] || 0);

             const itemWinnings = playerBetOnItem * winningItem.multiplier;
             const categoryWinnings = playerBetOnCategory * 2;
             const totalWinnings = itemWinnings + categoryWinnings;

             setWinAmount(totalWinnings);
             
             if (totalWinnings > 0) {
               const newBalance = user.coinsBalance + totalWinnings;
               onUpdateUser({ coinsBalance: newBalance });
               addToast(`You won ${totalWinnings.toLocaleString()} coins!`, 'success');
             }

             setHistory(h => [winningItem.id, ...h.slice(0, 9)]);
             setGameState('SHOWING_RESULT');
             setTimer(SHOW_TIME);
          } else {
             if (spinCount > 40 && spinningIndex === finalIndex) speed = Math.min(speed + 50, 500);
             else if (spinCount > 20) speed = Math.min(speed + 10, 200);
             spinIntervalRef.current = window.setTimeout(spin, speed);
          }
        };
        spin();

      } else if (timer <= 0 && gameState === 'SHOWING_RESULT') {
        setGameState('BETTING');
        setTimer(BET_TIME);
        setBets({});
        setResultIndex(null);
        setWinAmount(0);
        setSpinningIndex(0);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, gameState]);

  const handlePlaceBet = (itemId: string) => {
    if (gameState !== 'BETTING') return;
    if (user.coinsBalance < currentBetAmount) {
        addToast("Not enough coins!", 'error');
        return;
    }
    setBets(prev => ({...prev, [itemId]: (prev[itemId] || 0) + currentBetAmount }));
    onUpdateUser({ coinsBalance: user.coinsBalance - currentBetAmount });
  };
  
  const toggleBetTier = () => {
    const newTier = betTier === 'low' ? 'high' : 'low';
    setBetTier(newTier);
    setCurrentBetAmount(betTiers[newTier][0]);
  }

  const getRotation = (index: number) => index * (360 / wheelItems.length);
  const formatBet = (amount: number) => {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)}M`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
    return amount.toString();
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-2" onClick={onClose}>
      <div 
        className="w-full max-w-md h-[95vh] max-h-[750px] bg-cover bg-center rounded-2xl shadow-2xl text-white animate-scale-in flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{backgroundImage: `url('https://i.postimg.cc/k47tXz9W/ferris-wheel-bg.png')`, backgroundColor: '#3e236e'}}
      >
        <div className="relative z-10 flex flex-col h-full p-2">
            <header className="flex justify-between items-center flex-shrink-0 px-2">
                <div className="flex items-center gap-1 p-1 rounded-full bg-black/40">
                    <img src="https://i.postimg.cc/Y0zSgY2d/coin-stack-99.png" alt="99+" className="w-8 h-8" />
                    <span className="font-bold text-sm text-yellow-300">{user.coinsBalance.toLocaleString()}</span>
                    <button className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-lg">+</button>
                </div>
                <h1 className="text-xl font-bold greedy-text-glow">Greedy Baby</h1>
                <div className="flex items-center gap-1.5">
                    <button className="p-1.5 rounded-full bg-black/40"><ClockIcon className="w-5 h-5"/></button>
                    <button className="p-1.5 rounded-full bg-black/40"><SoundOnIcon className="w-5 h-5"/></button>
                    <button className="p-1.5 rounded-full bg-black/40"><HelpIcon className="w-5 h-5"/></button>
                    <button onClick={onClose} className="p-1.5 rounded-full bg-black/40 text-lg font-bold leading-none">X</button>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center my-2 relative">
                <div className="absolute top-0 left-0">
                    <button onClick={() => handlePlaceBet('fruits')} disabled={gameState !== 'BETTING'} className="relative flex flex-col items-center gap-1 p-2 rounded-lg bg-black/40">
                        <FruitBasketIcon className="w-10 h-10" />
                        <span className="text-xs font-bold text-yellow-300">x2</span>
                        {bets['fruits'] > 0 && <div className="absolute -bottom-2 px-2 text-xs font-bold bg-red-600 text-white rounded-full border-2 border-white animate-scale-in">Bet {formatBet(bets['fruits'])}</div>}
                    </button>
                </div>
                 <div className="absolute top-0 right-0">
                    <button onClick={() => handlePlaceBet('fastfood')} disabled={gameState !== 'BETTING'} className="relative flex flex-col items-center gap-1 p-2 rounded-lg bg-black/40">
                        <PizzaSliceIcon className="w-10 h-10" />
                        <span className="text-xs font-bold text-yellow-300">x2</span>
                        {bets['fastfood'] > 0 && <div className="absolute -bottom-2 px-2 text-xs font-bold bg-red-600 text-white rounded-full border-2 border-white animate-scale-in">Bet {formatBet(bets['fastfood'])}</div>}
                    </button>
                </div>

                <div className="relative w-80 h-80">
                    <div className="absolute inset-0 animate-spin-slow">
                        <img src="https://i.postimg.cc/q7DypCg3/wheel-spokes.png" alt="spokes" className="w-full h-full opacity-30"/>
                    </div>

                    {wheelItems.map((item, index) => {
                        const angle = getRotation(index);
                        const isWinner = resultIndex === index && gameState === 'SHOWING_RESULT';
                        const isSpinningHighlight = spinningIndex === index && gameState === 'SPINNING';
                        return (
                            <div key={item.id} className="absolute w-20 h-20 top-1/2 left-1/2 -m-10" style={{ transform: `rotate(${angle}deg) translate(8.5rem) rotate(-${angle}deg)` }}>
                                <div className={`relative w-full h-full rounded-full bg-gradient-to-b from-purple-800 to-purple-900 border-4 transition-all duration-200 ${isSpinningHighlight ? 'border-white' : 'border-yellow-600'}`}>
                                     {isWinner && <div className="absolute -inset-2 rounded-full border-4 border-yellow-300 animate-greedy-baby-winner-burst" style={{animationIterationCount: 'infinite', animationDuration: '1s'}}></div>}
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {item.icon}
                                        <span className="text-xs font-bold text-yellow-300">x{item.multiplier}</span>
                                    </div>
                                    <button onClick={() => handlePlaceBet(item.id)} disabled={gameState !== 'BETTING'} className="absolute inset-0 rounded-full"></button>
                                    {bets[item.id] > 0 && <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 px-2 text-xs font-bold bg-red-600 text-white rounded-full border-2 border-white animate-scale-in">Bet {formatBet(bets[item.id])}</div>}
                                </div>
                            </div>
                        );
                    })}
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-red-500 border-4 border-yellow-400 flex flex-col items-center justify-center text-center">
                        <ElephantIcon className="w-16 h-16 text-blue-200" />
                        <div className="absolute bottom-2 w-full text-white font-bold text-lg leading-tight">
                            <p>{gameState === 'BETTING' ? 'Bet Time' : 'Show Time'}</p>
                            <p>{timer}s</p>
                        </div>
                    </div>
                </div>
                 {gameState === 'SHOWING_RESULT' && winAmount > 0 && (
                    <div className="absolute w-full max-w-xs p-1 bg-gradient-to-b from-yellow-500 to-orange-600 rounded-xl shadow-lg animate-greedy-win-banner" style={{bottom: '10%'}}>
                        <div className="bg-[#5c2e1f] rounded-lg p-2">
                             <div className="flex justify-between items-center mb-2 px-2">
                                <span className="text-sm font-bold">Winner</span>
                                 <div className="flex items-center gap-1 text-yellow-300 font-bold">
                                     <CoinIcon className="w-4 h-4" />
                                     {winAmount.toLocaleString()}
                                 </div>
                             </div>
                             <div className="space-y-1">
                                 {mockWinners.map((winner, i) => (
                                    <div key={i} className={`flex items-center p-1 rounded-md ${i === 0 ? 'bg-yellow-500/20' : ''}`}>
                                         {i === 0 && <RankOneIcon className="w-6 h-6 flex-shrink-0"/>}
                                         {i === 1 && <RankTwoIcon className="w-6 h-6 flex-shrink-0"/>}
                                         {i === 2 && <RankThreeIcon className="w-6 h-6 flex-shrink-0"/>}
                                         <img src={winner.user.avatarUrl} alt={winner.user.displayName} className="w-8 h-8 rounded-full ml-2 border-2 border-yellow-600"/>
                                         <p className="ml-2 font-semibold truncate">{winner.user.displayName}</p>
                                         <div className="ml-auto flex items-center gap-1 text-yellow-300 font-semibold text-sm">
                                             <CoinIcon className="w-4 h-4"/>
                                             {(winner.amount/1000).toLocaleString()}K
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>
                )}
            </main>
            
            <footer className="flex-shrink-0 mt-auto">
                {gameState === 'BETTING' && (
                    <>
                        <p className="text-center text-xs text-yellow-200 mb-1">Choose the amount wager -&gt; Choose food</p>
                        <div className="flex justify-around items-center gap-1 px-1">
                            {betTiers[betTier].map(amount => (
                                <button key={amount} onClick={() => setCurrentBetAmount(amount)} className={`w-12 h-12 flex items-center justify-center rounded-full text-xs font-bold transition-all bg-cover bg-center ${currentBetAmount === amount ? 'scale-110' : ''}`} style={{backgroundImage: 'url(https://i.postimg.cc/pXj2T52S/chip.png)'}}>
                                    <span className="drop-shadow-md">{formatBet(amount)}</span>
                                </button>
                            ))}
                            <button onClick={toggleBetTier} className={`w-8 h-12 flex items-center justify-center rounded-lg text-xs font-bold transition-all bg-slate-700/50`}>
                                {betTier === 'low' ? 'K' : 'M'}
                            </button>
                        </div>
                    </>
                )}
                 {gameState !== 'BETTING' && (
                     <div className="text-center p-4">
                        <p className="text-sm">Today's Win: <span className="text-yellow-300 font-bold">{winAmount.toLocaleString()}</span></p>
                    </div>
                 )}
                
                <div className="mt-2 p-1 bg-black/40 rounded-lg">
                    <div className="flex items-center gap-2">
                         <span className="text-xs font-bold px-2 bg-slate-600 rounded">New</span>
                         <div className="flex-grow flex items-center justify-around gap-1">
                            {history.concat(Array(10).fill(null)).slice(0, 10).map((id, i) => (
                                <div key={i} className="w-6 h-6 flex items-center justify-center bg-black/20 rounded">
                                  {id ? React.cloneElement(wheelItems.find(item => item.id === id)!.icon as React.ReactElement, { className: 'w-5 h-5' }) : <span className="text-gray-500">?</span>}
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </footer>
        </div>
      </div>
    </div>
  );
};