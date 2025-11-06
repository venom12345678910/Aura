import React, { useState, useEffect } from 'react';
import type { User } from '../../types';
import { useToast } from '../Toast';
import { CoinIcon } from '../icons/CoinIcon';
import { PinballIcon } from '../icons/gifts/PinballIcon';

interface PinballGameProps {
  user: User;
  onClose: () => void;
  onUpdateUser: (updates: Partial<User>) => void;
}

type GameState = 'betting' | 'playing' | 'result';
const betSteps = [100, 500, 1000, 5000, 10000];
const prizes = [
    { multiplier: 0.5, label: 'x0.5' },
    { multiplier: 2, label: 'x2' },
    { multiplier: 5, label: 'x5' },
    { multiplier: 1, label: 'x1' },
    { multiplier: 0.5, label: 'x0.5' },
    { multiplier: 2, label: 'x2' },
];

const Bumper: React.FC<{ id: string }> = ({ id }) => (
    <div id={id} className="absolute w-8 h-8 bg-purple-500 rounded-full border-4 border-purple-300 transition-all" style={{boxShadow: '0 0 15px #a855f7'}}></div>
);

export const PinballGame: React.FC<PinballGameProps> = ({ user, onClose, onUpdateUser }) => {
    const [gameState, setGameState] = useState<GameState>('betting');
    const [bet, setBet] = useState(betSteps[1]);
    const [result, setResult] = useState<{ multiplier: number; index: number } | null>(null);
    const [skillShotActive, setSkillShotActive] = useState(false);
    const [skillShotBonus, setSkillShotBonus] = useState(1);
    const { addToast } = useToast();

    useEffect(() => {
        let interval: number;
        if (gameState === 'betting') {
            interval = window.setInterval(() => {
                setSkillShotActive(prev => !prev);
            }, 700);
        }
        return () => {
            if (interval) clearInterval(interval);
        }
    }, [gameState]);

    useEffect(() => {
        if (gameState === 'playing') {
            const resultIndex = Math.floor(Math.random() * prizes.length);
            const prize = prizes[resultIndex];

            const ball = document.getElementById('pinball-ball');
            const prizeSlot = document.getElementById(`prize-slot-${resultIndex}`);
            if (ball) {
                ball.style.animation = `pinball-launch 3s cubic-bezier(0.3, 0, 0.7, 1) forwards`;
                
                [1000, 1800, 2500].forEach(delay => {
                    setTimeout(() => {
                        const bumper = document.getElementById(`bumper-${Math.ceil(Math.random()*3)}`);
                        bumper?.animate([{filter: 'drop-shadow(0 0 20px #0ff)'}, {filter: 'drop-shadow(0 0 5px #fff)'}], {duration: 300});
                    }, delay);
                });
            }

            setTimeout(() => {
                const winAmount = bet * prize.multiplier * skillShotBonus;
                if (winAmount > 0) {
                    onUpdateUser({ coinsBalance: user.coinsBalance - bet + winAmount });
                    addToast(`You won ${winAmount.toLocaleString()} coins!`, 'success');
                } else {
                    addToast('Better luck next time!', 'info');
                }
                setResult({ multiplier: prize.multiplier, index: resultIndex });
                if (prizeSlot) prizeSlot.classList.add('animate-pinball-prize-glow');

                setTimeout(() => {
                    setGameState('result');
                }, 1000);
            }, 3000);
        }
    }, [gameState, bet, onUpdateUser, addToast, skillShotBonus]);

    const handlePlay = () => {
        if (user.coinsBalance < bet) {
            addToast("Not enough coins!", "error");
            return;
        }
        
        if (skillShotActive) {
            setSkillShotBonus(2);
            addToast("Skill Shot! 2x Bonus!", 'success');
        } else {
            setSkillShotBonus(1);
        }

        onUpdateUser({ coinsBalance: user.coinsBalance - bet });
        setResult(null);
        setGameState('playing');
        const prizeSlots = document.querySelectorAll('.prize-slot');
        prizeSlots.forEach(slot => slot.classList.remove('animate-pinball-prize-glow'));
    };
    
    const handlePlayAgain = () => {
        setGameState('betting');
        const ball = document.getElementById('pinball-ball');
        if (ball) ball.style.animation = 'none';
    };

    const changeBet = (increment: boolean) => {
        const currentIndex = betSteps.indexOf(bet);
        if (increment && currentIndex < betSteps.length - 1) setBet(betSteps[currentIndex + 1]);
        else if (!increment && currentIndex > 0) setBet(betSteps[currentIndex - 1]);
    };

    return (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in" onClick={onClose}>
            <div 
                className="w-full max-w-sm bg-gradient-to-b from-[#1a237e] to-[#0d47a1] rounded-2xl shadow-2xl border-4 border-cyan-400 p-4 text-white animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-cyan-300" style={{ textShadow: '1px 1px 2px #000' }}>Cosmic Pinball</h1>
                    <button onClick={onClose} className="text-2xl opacity-70 hover:opacity-100">&times;</button>
                </header>
                
                {/* Game Area */}
                <div className="relative h-80 bg-[#0c1445] rounded-lg border-2 border-cyan-800 shadow-inner overflow-hidden" style={{backgroundImage: 'radial-gradient(circle, #1a237e 1px, transparent 1px)', backgroundSize: '15px 15px'}}>
                    <Bumper id="bumper-1" style={{ top: '20%', left: '50%', transform: 'translateX(-50%)' }} />
                    <Bumper id="bumper-2" style={{ top: '40%', left: '25%' }} />
                    <Bumper id="bumper-3" style={{ top: '40%', right: '25%' }} />

                    <div id="pinball-ball" className="absolute bottom-2 left-1/2 -ml-3 w-6 h-6 rounded-full bg-white" style={{boxShadow: '0 0 10px #fff'}}></div>

                    <div className="absolute bottom-0 left-0 right-0 flex">
                        {prizes.map((prize, i) => (
                            <div key={i} id={`prize-slot-${i}`} className="prize-slot flex-1 py-1 text-center font-bold text-black bg-yellow-400 border-l border-r border-yellow-600">
                                {prize.label}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 p-2 glassmorphism rounded-lg">
                     <div className="flex justify-between items-center bg-black/20 p-2 rounded-md">
                        <div>
                            <p className="text-xs text-gray-400">YOUR COINS</p>
                            <p>{user.coinsBalance.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 text-right">BET</p>
                            <div className="flex items-center gap-2">
                                <button onClick={() => changeBet(false)} disabled={gameState !== 'betting'} className="w-6 h-6 bg-slate-600 rounded disabled:opacity-50">-</button>
                                <p className="w-16 text-center font-semibold">{bet.toLocaleString()}</p>
                                <button onClick={() => changeBet(true)} disabled={gameState !== 'betting'} className="w-6 h-6 bg-slate-600 rounded disabled:opacity-50">+</button>
                            </div>
                        </div>
                    </div>

                    {gameState === 'betting' && <button onClick={handlePlay} className={`w-full mt-2 h-14 rounded-lg bg-gradient-to-b from-cyan-500 to-blue-500 text-black font-bold text-2xl shadow-lg hover:opacity-90 transition-all ${skillShotActive ? 'animate-button-glow' : ''}`}>LAUNCH</button>}
                    {gameState === 'playing' && <div className="w-full mt-2 h-14 flex items-center justify-center text-cyan-400 font-bold text-lg animate-pulse">Good Luck!</div>}
                    {gameState === 'result' && <button onClick={handlePlayAgain} className="w-full mt-2 h-14 rounded-lg bg-gradient-to-b from-green-500 to-emerald-600 text-black font-bold text-2xl shadow-lg hover:opacity-90 transition-opacity">PLAY AGAIN</button>}
                </div>
            </div>
        </div>
    );
};