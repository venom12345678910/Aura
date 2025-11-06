import React, { useState } from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import { useData } from '../../../contexts/DataContext';
import { useToast } from '../../Toast';

export const AdminPanelScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { updateUser, findUser } = useData();
    const { addToast } = useToast();
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState<'coins' | 'diamonds'>('coins');

    const handleGrant = () => {
        const targetUser = findUser(userId);
        const grantAmount = parseInt(amount, 10);

        if (!targetUser) {
            addToast(`User with ID "${userId}" not found.`, 'error');
            return;
        }
        if (isNaN(grantAmount) || grantAmount <= 0) {
            addToast('Please enter a valid amount.', 'error');
            return;
        }

        if (currency === 'coins') {
            updateUser(targetUser.id, { coinsBalance: targetUser.coinsBalance + grantAmount });
        } else {
            updateUser(targetUser.id, { diamondsBalance: targetUser.diamondsBalance + grantAmount });
        }
        
        addToast(`Granted ${grantAmount.toLocaleString()} ${currency} to ${targetUser.displayName}.`, 'success');
        setUserId('');
        setAmount('');
    };

    return (
        <SubScreenWrapper title="Admin Panel" onBack={onBack}>
            <div className="p-4 space-y-6">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="font-bold text-lg text-cyan-300 mb-3">Grant Currency</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="User ID or Numeric ID"
                            className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                        />
                         <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount"
                            className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                        />
                        <div className="flex gap-2">
                             <button onClick={() => setCurrency('coins')} className={`flex-1 py-2 rounded-md font-semibold ${currency === 'coins' ? 'bg-yellow-400 text-black' : 'bg-slate-600 text-white'}`}>Coins</button>
                             <button onClick={() => setCurrency('diamonds')} className={`flex-1 py-2 rounded-md font-semibold ${currency === 'diamonds' ? 'bg-cyan-400 text-black' : 'bg-slate-600 text-white'}`}>Diamonds</button>
                        </div>
                        <button onClick={handleGrant} className="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition-colors">
                            Grant
                        </button>
                    </div>
                </div>

                 <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="font-bold text-lg text-red-400 mb-3">Other Actions</h3>
                     <div className="space-y-2">
                        <button className="w-full bg-red-500 text-white font-bold py-2 rounded-md opacity-50 cursor-not-allowed">Ban User</button>
                        <button className="w-full bg-purple-500 text-white font-bold py-2 rounded-md opacity-50 cursor-not-allowed">Broadcast System Message</button>
                    </div>
                 </div>
            </div>
        </SubScreenWrapper>
    );
};