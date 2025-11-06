import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';
import { SettingsMenuItem } from './SettingsMenuItem';
import { useToast } from '../../Toast';

export const AccountScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addToast } = useToast();
  const handleComingSoon = () => addToast('This feature is coming soon!', 'info');

  return (
    <SubScreenWrapper title="Account" onBack={onBack}>
      <div className="p-4 space-y-4">
        <div className="rounded-lg glassmorphism divide-y divide-[var(--color-border)] overflow-hidden">
          <SettingsMenuItem label="Change Password" onClick={handleComingSoon} />
          <SettingsMenuItem label="Linked Accounts" info="Google" onClick={handleComingSoon} />
        </div>
        <div className="rounded-lg glassmorphism divide-y divide-[var(--color-border)] overflow-hidden">
          <SettingsMenuItem label="Delete Account" destructive onClick={() => addToast('Account deletion is not yet available.', 'error')} />
        </div>
      </div>
    </SubScreenWrapper>
  );
};
