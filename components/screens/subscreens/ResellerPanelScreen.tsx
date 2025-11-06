import React, { useState } from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import type { User } from '../../../types';
import { useData } from '../../../contexts/DataContext';
import { useToast } from '../../Toast';

interface ResellerPanelScreenProps {
  onBack: () => void;
  currentUser: User;
}

export const ResellerPanelScreen: React.FC<ResellerPanelScreenProps> = ({ onBack, currentUser }) => {
    const { updateUser, findUser } = useData();
    const { addToast } = useToast();
    const [targetUserId, setTargetUserId] = useState('');
    const [amount, setAmount] = useState('');

    const handleSendCoins = () => {
        const targetUser = findUser(targetUserId);
        const sendAmount = parseInt(amount, 10);

        if (!targetUser) {
            addToast(`User with ID "${targetUserId}" not found.`, 'error');
            return;
        }
        if (isNaN(sendAmount) || sendAmount <= 0) {
            addToast('Please enter a valid amount.', 'error');
            return;
        }
        if (currentUser.role !== 'reseller' && (currentUser.role !== 'admin')) {
             addToast('You do not have permission to perform this action.', 'error');
             return;
        }
        
        updateUser(targetUser.id, { coinsBalance: targetUser.coinsBalance + sendAmount });
        addToast(`Successfully sent ${sendAmount.toLocaleString()} coins to ${targetUser.displayName}.`, 'success');
        setTargetUserId('');
        setAmount('');
    };

    return (
        <SubScreenWrapper title="Reseller Panel" onBack={onBack}>
            <div className="p-4 space-y-6">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="font-bold text-lg text-cyan-300 mb-3">Send Coins to User</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={targetUserId}
                            onChange={(e) => setTargetUserId(e.target.value)}
                            placeholder="Recipient User ID or Numeric ID"
                            className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                        />
                         <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount of Coins"
                            className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                        />
                        <button onClick={handleSendCoins} className="w-full bg-cyan-500 text-black font-bold py-2 rounded-md hover:bg-cyan-400 transition-colors">
                            Send Coins
                        </button>
                    </div>
                </div>
            </div>
        </SubScreenWrapper>
    );
};