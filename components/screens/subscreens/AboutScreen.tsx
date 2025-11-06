import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';

export const AboutScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <SubScreenWrapper title="About Us" onBack={onBack}>
      <div className="p-6 flex flex-col items-center text-center h-full">
        <span className="text-6xl mb-4">🎤</span>
        <h1 className="text-3xl font-bold cyan-text-glow">Aura</h1>
        <p className="text-lg text-gray-300">Version 2.1.0</p>
        <p className="mt-4 text-gray-400 max-w-sm">
          Aura is a social voice chat application designed to help you find your voice and your tribe. Connect with people from around the world, join live rooms, and share your moments.
        </p>
        <p className="text-xs text-gray-500 mt-8">© 2025 Aura Voice Chat. All Rights Reserved.</p>
      </div>
    </SubScreenWrapper>
  );
};
