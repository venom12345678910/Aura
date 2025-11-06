import React, { useState } from 'react';

interface ToggleSwitchProps {
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ initialValue = false, onChange }) => {
  const [isOn, setIsOn] = useState(initialValue);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
        isOn ? 'bg-green-400' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out shadow ${
          isOn ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
};