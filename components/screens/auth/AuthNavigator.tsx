import React, { useState } from 'react';
import { LandingScreen } from './LandingScreen';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';

interface AuthNavigatorProps {
  onLogin: () => void;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onLogin }) => {
  const [screen, setScreen] = useState<'landing' | 'login' | 'register'>('landing');

  const handleLoginSuccess = () => {
    onLogin();
    // Reset to landing for next time user logs out
    setScreen('landing');
  };

  switch (screen) {
    case 'login':
      return <LoginScreen onBack={() => setScreen('landing')} onLogin={handleLoginSuccess} onNavigateToRegister={() => setScreen('register')} />;
    case 'register':
      return <RegisterScreen onBack={() => setScreen('landing')} onRegister={handleLoginSuccess} onNavigateToLogin={() => setScreen('login')} />;
    default: // 'landing'
      return <LandingScreen onSocialLogin={handleLoginSuccess} onNavigateToLogin={() => setScreen('login')} onNavigateToRegister={() => setScreen('register')} />;
  }
};