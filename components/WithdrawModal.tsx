import React, { useState } from 'react';
import { useToast } from './Toast';

interface WithdrawModalProps {
  onClose: () => void;
  onWithdraw: (amount: number) => void;
  availableBalance: number;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ onClose, onWithdraw, availableBalance }) => {
    const { addToast } = useToast();
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('paypal');

    const handleWithdraw = () => {
        const withdrawAmount = parseInt(amount, 10);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            addToast('Please enter a valid amount.', 'error');
            return;
        }
        if (withdrawAmount > availableBalance) {
            addToast('Withdrawal amount exceeds available balance.', 'error');
            return;
        }
        onWithdraw(withdrawAmount);
        addToast(`Withdrawal of $${withdrawAmount.toLocaleString()} initiated via ${method}.`, 'success');
        onClose();
    };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl shadow-2xl border-2 border-cyan-400/50 p-4 text-white animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-300">Withdraw Earnings</h2>
          <button onClick={onClose} className="text-2xl opacity-70 hover:opacity-100">&times;</button>
        </header>
        <div className="space-y-4">
            <p className="text-sm text-gray-400 text-center">Available Balance: <span className="font-bold text-green-400">${availableBalance.toLocaleString()}</span></p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount to withdraw"
              className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
             <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-slate-700/50 px-3 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
             >
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
             </select>
             <button
                onClick={handleWithdraw}
                className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors"
             >
                Confirm Withdrawal
             </button>
        </div>
      </div>
    </div>
  );
};
