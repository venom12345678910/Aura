import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import { ToggleSwitch } from '../../ToggleSwitch';

const PrivacyItem: React.FC<{ label: string, description: string, initialValue?: boolean }> = ({ label, description, initialValue = true }) => (
    <div className="flex items-center w-full p-3.5">
        <div>
            <p className="font-medium text-gray-200">{label}</p>
            <p className="text-xs text-gray-400">{description}</p>
        </div>
        <div className="ml-auto">
            <ToggleSwitch initialValue={initialValue} />
        </div>
    </div>
);


export const PrivacyScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <SubScreenWrapper title="Privacy Settings" onBack={onBack}>
      <div className="p-4 space-y-4">
        <div className="rounded-lg glassmorphism divide-y divide-[var(--color-border)] overflow-hidden">
          <PrivacyItem label="Show Online Status" description="Allow others to see when you are online." />
          <PrivacyItem label="Allow DMs from Strangers" description="Receive direct messages from users you don't follow." initialValue={false} />
          <PrivacyItem label="Allow Friend Requests" description="Let other users send you friend requests." />
          <PrivacyItem label="Show in Rankings" description="Appear in public leaderboards." />
        </div>
      </div>
    </SubScreenWrapper>
  );
};
