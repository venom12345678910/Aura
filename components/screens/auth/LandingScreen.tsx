import React from 'react';
import { ParticleBackground } from '../../ParticleBackground';
import { GoogleIcon } from '../../icons/GoogleIcon';
import { FacebookIcon } from '../../icons/FacebookIcon';
import { AppleIcon } from '../../icons/AppleIcon';
import { PhoneIcon } from '../../icons/PhoneIcon';

interface LandingScreenProps {
  onSocialLogin: () => void;
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
}

const SocialButton: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-center gap-3 bg-white/90 text-gray-800 font-semibold py-3 px-4 rounded-full transition-transform hover:scale-105 shadow-md backdrop-blur-sm"
    >
        {icon}
        <span>{label}</span>
    </button>
);

export const LandingScreen: React.FC<LandingScreenProps> = ({ onSocialLogin, onNavigateToLogin, onNavigateToRegister }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-end relative p-6">
      <div className="absolute top-0 left-0 right-0 h-3/5 flex flex-col items-center justify-center text-center z-10 animate-fade-in">
        <span className="text-6xl mb-4 inline-block drop-shadow-lg">🎤</span>
        <h1 className="text-5xl font-bold cyan-text-glow">Aura</h1>
        <p className="text-gray-300 mt-2 text-lg">Find your voice. Find your tribe.</p>
      </div>
      
      <div className="w-full max-w-sm z-10 space-y-4 animate-slide-up">
        <SocialButton icon={<GoogleIcon className="w-6 h-6" />} label="Continue with Google" onClick={onSocialLogin} />
        <SocialButton icon={<FacebookIcon className="w-6 h-6" />} label="Continue with Facebook" onClick={onSocialLogin} />
        <SocialButton icon={<AppleIcon className="w-6 h-6" />} label="Continue with Apple" onClick={onSocialLogin} />

        <button
            onClick={onNavigateToRegister}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-full transition-transform hover:scale-105 shadow-lg shadow-purple-500/30"
        >
            <PhoneIcon className="w-6 h-6" />
            <span>Sign up with Phone or Email</span>
        </button>
        
        <p className="text-center text-gray-300">
            Already have an account?{' '}
            <button onClick={onNavigateToLogin} className="font-bold text-white underline hover:text-cyan-300">
                Log in
            </button>
        </p>

        <p className="text-center text-xs text-gray-400 pt-2">
            By continuing, you agree to Aura's <br/>
            <a href="#" className="underline">Terms of Service</a> & <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};