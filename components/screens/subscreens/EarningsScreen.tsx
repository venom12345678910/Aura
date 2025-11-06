import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import { EarningIcon } from '../../icons/EarningIcon';
import { CoinIcon } from '../../icons/CoinIcon';
import { DiamondIcon } from '../../icons/DiamondIcon';

interface EarningsScreenProps {
  onBack: () => void;
}

const EarningItem: React.FC<{ icon: React.ReactNode, label: string, amount: string, subtext: string, amountType: 'coins' | 'diamonds' }> = ({ icon, label, amount, subtext, amountType }) => (
    <div className="p-3 bg-slate-800/50 rounded-lg flex items-center gap-4">
        <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <div className="flex-grow">
            <p className="font-semibold text-white">{label}</p>
            <p className="text-xs text-gray-400">{subtext}</p>
        </div>
        <div className={`flex items-center gap-1 font-bold ${amountType === 'coins' ? 'text-yellow-400' : 'text-cyan-300'}`}>
            {amountType === 'coins' ? <CoinIcon className="w-5 h-5" /> : <DiamondIcon className="w-5 h-5" />}
            <span>{amount}</span>
        </div>
    </div>
);


export const EarningsScreen: React.FC<EarningsScreenProps> = ({ onBack }) => {
  return (
    <SubScreenWrapper title="Earnings" onBack={onBack}>
      <div className="p-4 space-y-4">
          <div className="p-4 rounded-lg glassmorphism text-center">
              <p className="text-sm text-gray-300">Available to Withdraw</p>
              <p className="text-4xl font-bold text-green-400 my-2">$1,250.00</p>
              <button className="w-full max-w-xs mx-auto mt-2 bg-green-500 text-white font-bold py-2 rounded-lg">
                  Withdraw
              </button>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-bold text-gray-300 text-lg px-1">Earnings Breakdown</h3>
            <EarningItem 
                icon={<DiamondIcon className="w-8 h-8"/>} 
                label="Gift Diamonds" 
                amount="125,000" 
                subtext="From gifts received"
                amountType="diamonds"
            />
             <EarningItem 
                icon={<EarningIcon />} 
                label="Target Rewards" 
                amount="50,000" 
                subtext="From completed 15-day targets"
                amountType="coins"
            />
             <EarningItem 
                icon={<CoinIcon className="w-8 h-8"/>} 
                label="Activity Bonus" 
                amount="15,000" 
                subtext="From special events"
                amountType="coins"
            />
          </div>

      </div>
    </SubScreenWrapper>
  );
};