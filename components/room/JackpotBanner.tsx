import React from 'react';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';

export const JackpotBanner: React.FC = () => (
    <div className="w-full my-2 px-1">
        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-2.5 flex justify-between items-center text-black shadow-lg">
            <span className="font-bold text-sm ml-2">Send a gift and win the jackpot</span>
            <ChevronRightIcon className="w-6 h-6" />
        </button>
    </div>
);
