import React, { useState, useEffect } from 'react';
import type { User } from '../../types';
import { useToast } from '../Toast';
import { TreasureChestIcon } from '../icons/TreasureChestIcon';
import { CoinIcon } from '../icons/CoinIcon';

interface GreedyGameProps {
  user: User;
  onClose: () => void;
  onUpdateUser: (updates: Partial<User>) => void;
}

type GameState = 'betting' | 'playing' | 'jackpot-spin' | 'result';
const betSteps = [100, 500, 1000, 5000];
const multipliers = ['jackpot', 0, 0.5, 2, 5] as const;
const jackpotMultipliers = [10, 50, 20];

const Chest: React.FC<{ isRevealed: boolean; isChosen: boolean; multiplier: typeof multipliers[number]; onChoose: () => void; gameState: GameState }> = ({ isRevealed, isChosen, multiplier, onChoose, gameState }) => {
    const isLoss = multiplier === 0;
    const isWin = typeof multiplier === 'number' && multiplier > 0;
    const isJackpot = multiplier === 'jackpot';
    
    return (
        <button 
            onClick={onChoose}
            disabled={gameState !== 'playing'}
            className={`relative w-20 h-20 transition-all duration-300 transform-gpu ${gameState === 'playing' ? 'hover:scale-110 cursor-pointer' : ''} ${isRevealed && !isChosen ? 'opacity-50 scale-90' : ''}`}
        >
            <div className={`absolute inset-0 transition-transform duration-500 ${isRevealed ? '[transform:rotateY(180deg)]' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                {/* Front */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-yellow-800/20 rounded-lg" style={{ backfaceVisibility: 'hidden' }}>
                     <TreasureChestIcon className={`w-16 h-16 ${isJackpot ? 'text-yellow-400 animate-pulse filter drop-shadow(0 0 10px #fbbf24)' : 'text-yellow-600'}`} />
                </div>
                {/* Back */}
                <div className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center rounded-lg ${isLoss ? 'bg-slate-600' : 'bg-green-600'} border-2 ${isChosen ? 'border-yellow-400 gold-glow-border' : 'border-slate-500'}`} style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                    {isWin ? (
                        <>
                            <p className="text-2xl font-bold text-yellow-300 gold-text-glow">x{multiplier}</p>
                            <CoinIcon className="w-6 h-6 text-yellow-300 mt-1" />
                        </>
                    ) : isJackpot ? (
                         <p className="text-xl font-bold text-yellow-300 gold-text-glow">JACKPOT</p>
                    ) : (
                        <p className="text-2xl font-bold text-slate-300">0</p>
                    )}
                </div>
            </div>
        </button>
    )
}

const JackpotWheel: React.FC<{ onResult: (multiplier: number) => void }> = ({ onResult }) => {
    const [spinning, setSpinning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSpinning(false);
            const result = jackpotMultipliers[Math.floor(Math.random() * jackpotMultipliers.length)];
            onResult(result);
        }, 3000); // spin animation duration
        return () => clearTimeout(timer);
    }, [onResult]);

    return (
        <div className="flex flex-col items-center justify-center animate-fade-in">
            <h2 className="text-2xl font-bold text-yellow-300 gold-text-glow mb-4">JACKPOT WHEEL!</h2>
            <div className="relative w-48 h-48 rounded-full border-4 border-yellow-400 bg-slate-800 flex items-center justify-center overflow-hidden">
                <div className={`w-full h-full animate-jackpot-wheel-spin`} style={{ animationDuration: spinning ? '3s' : '0s', animationTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)', animationFillMode: 'forwards' }}>
                    {jackpotMultipliers.map((m, i) => (
                        <div key={i} className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-left" style={{ transform: `rotate(${i * 120}deg)` }}>
                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold" style={{ transform: 'rotate(60deg)' }}>{m}x</div>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-12 border-t-red-500 z-10"></div>
            </div>
        </div>
    );
}

export const GreedyGame: React.FC<GreedyGameProps> = ({ user, onClose, onUpdateUser }) => {
    const [gameState, setGameState] = useState<GameState>('betting');
    const [bet, setBet] = useState(betSteps[1]);
    const [lastWin, setLastWin] = useState(0);
    const [chests, setChests] = useState<(typeof multipliers[number])[]>([]);
    const [chosenIndex, setChosenIndex] = useState<number | null>(null);
    const { addToast } = useToast();

    const setupChests = () => {
        const shuffled = [...multipliers].sort(() => Math.random() - 0.5);
        setChests(shuffled);
    };
    
    useEffect(() => {
        setupChests();
    }, []);

    const handlePlay = () => {
        if (user.coinsBalance < bet) {
            addToast("Not enough coins!", "error");
            return;
        }
        onUpdateUser({ coinsBalance: user.coinsBalance - bet });
        setLastWin(0);
        setChosenIndex(null);
        setGameState('playing');
    };

    const handleJackpotResult = (multiplier: number) => {
        const winAmount = bet * multiplier;
        setLastWin(winAmount);
        setTimeout(() => {
             setGameState('result');
             onUpdateUser({ coinsBalance: user.coinsBalance - bet + winAmount });
             addToast(`JACKPOT! You won ${winAmount.toLocaleString()} coins!`, 'success');
        }, 1500);
    }
    
    const handleChooseChest = (index: number) => {
        if (gameState !== 'playing') return;
        setChosenIndex(index);
        const multiplier = chests[index];
        
        if(multiplier === 'jackpot') {
            setTimeout(() => setGameState('jackpot-spin'), 1000);
            return;
        }

        const winAmount = bet * multiplier;
        setLastWin(winAmount);

        setTimeout(() => {
             setGameState('result');
             if(winAmount > 0) {
                 onUpdateUser({ coinsBalance: user.coinsBalance - bet + winAmount });
                 addToast(`You won ${winAmount.toLocaleString()} coins!`, 'success');
             } else {
                 addToast('Better luck next time!', 'info');
             }
        }, 1000);
    };
    
    const handlePlayAgain = () => {
        setupChests();
        setGameState('betting');
    }

    const changeBet = (increment: boolean) => {
        const currentIndex = betSteps.indexOf(bet);
        if (increment) {
            if (currentIndex < betSteps.length - 1) setBet(betSteps[currentIndex + 1]);
        } else {
            if (currentIndex > 0) setBet(betSteps[currentIndex - 1]);
        }
    };

    return (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in" onClick={onClose}>
            <div 
                className="w-full max-w-sm bg-gradient-to-b from-blue-900 to-indigo-900 rounded-2xl shadow-2xl border-4 border-yellow-500 p-4 text-white animate-slide-up gold-glow-border"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-yellow-300 gold-text-glow">Greedy Treasure</h1>
                    <button onClick={onClose} className="text-2xl opacity-70 hover:opacity-100">&times;</button>
                </header>
                <div className="p-4 bg-black/20 rounded-lg min-h-[300px] flex flex-col justify-between">
                    <div className="text-center h-12">
                        {(gameState === 'result' || gameState === 'jackpot-spin') && (
                            <div className="animate-fade-in">
                                <p className="text-sm text-gray-300">{lastWin > bet * 5 ? 'JACKPOT WIN' : 'YOU WON'}</p>
                                <p className="text-2xl font-bold text-yellow-400 gold-text-glow">{lastWin.toLocaleString()}</p>
                            </div>
                        )}
                         {gameState === 'playing' && (
                            <div className="animate-fade-in">
                                <p className="text-lg font-semibold text-gray-300">Choose a chest!</p>
                            </div>
                        )}
                    </div>
                    
                    {gameState === 'jackpot-spin' ? (
                        <JackpotWheel onResult={handleJackpotResult} />
                    ) : (
                        <div className="flex justify-center gap-2 my-4">
                            {chests.map((multiplier, i) => (
                                <Chest 
                                    key={i}
                                    isRevealed={gameState === 'result' || gameState === 'jackpot-spin'}
                                    isChosen={i === chosenIndex}
                                    multiplier={multiplier}
                                    onChoose={() => handleChooseChest(i)}
                                    gameState={gameState}
                                />
                            ))}
                        </div>
                    )}
                    
                    <div className="flex justify-between items-center bg-black/20 p-2 rounded-md">
                        <div>
                            <p className="text-xs text-gray-400">YOUR COINS</p>
                            <p className="font-bold flex items-center"><CoinIcon className="w-4 h-4 mr-1" />{user.coinsBalance.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 text-right">BET</p>
                            <div className="flex items-center gap-2">
                                <button onClick={() => changeBet(false)} disabled={gameState !== 'betting'} className="w-6 h-6 bg-slate-600 rounded disabled:opacity-50 font-bold">-</button>
                                <p className="w-16 text-center font-bold">{bet.toLocaleString()}</p>
                                <button onClick={() => changeBet(true)} disabled={gameState !== 'betting'} className="w-6 h-6 bg-slate-600 rounded disabled:opacity-50 font-bold">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                 {gameState === 'betting' && <button onClick={handlePlay} className="w-full mt-4 h-14 rounded-lg bg-gradient-to-b from-yellow-500 to-orange-500 text-black font-bold text-2xl shadow-lg hover:opacity-90 transition-opacity">PLAY</button>}
                 {gameState === 'playing' && <div className="w-full mt-4 h-14 flex items-center justify-center text-yellow-400 font-bold text-lg">PICK ONE...</div>}
                 {gameState === 'result' && <button onClick={handlePlayAgain} className="w-full mt-4 h-14 rounded-lg bg-gradient-to-b from-cyan-500 to-blue-500 text-black font-bold text-2xl shadow-lg hover:opacity-90 transition-opacity">PLAY AGAIN</button>}
                 {gameState === 'jackpot-spin' && <div className="w-full mt-4 h-14 flex items-center justify-center text-yellow-400 font-bold text-lg animate-pulse">SPINNING...</div>}
            </div>
        </div>
    );
};