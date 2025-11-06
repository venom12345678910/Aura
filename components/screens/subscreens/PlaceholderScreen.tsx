import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';

interface PlaceholderScreenProps {
  onBack: () => void;
  title?: string;
}

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ onBack, title="Coming Soon" }) => {
  return (
    <SubScreenWrapper title={title} onBack={onBack}>
      <div className="p-4 flex flex-col items-center justify-center h-full text-center">
        <span className="text-5xl mb-4">🚧</span>
        <h2 className="mt-4 text-xl font-bold">Under Construction</h2>
        <p className="mt-1 text-gray-400">This feature is coming soon!</p>
      </div>
    </SubScreenWrapper>
  );
};
