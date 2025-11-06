import React from 'react';
import { ArrowLeftIcon } from '../../icons/ArrowLeftIcon';
import { GoogleIcon } from '../../icons/GoogleIcon';
import { FacebookIcon } from '../../icons/FacebookIcon';
import { AppleIcon } from '../../icons/AppleIcon';
import { UserOutlineIcon } from '../../icons/UserOutlineIcon';
import { EmailOutlineIcon } from '../../icons/EmailOutlineIcon';
import { PasswordLockIcon } from '../../icons/PasswordLockIcon';


interface RegisterScreenProps {
  onBack: () => void;
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

const InputField: React.FC<{ icon: React.ReactNode, type: string, placeholder: string }> = ({ icon, type, placeholder }) => (
    <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-white/10 text-white text-lg pl-12 pr-4 py-3 rounded-full border-2 border-transparent focus:border-cyan-400 focus:bg-white/5 outline-none transition-colors placeholder-gray-400"
        />
    </div>
);

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack, onRegister, onNavigateToLogin }) => {
  return (
    <div className="h-full flex flex-col p-6 animate-fade-in">
      <header className="flex-shrink-0">
        <button onClick={onBack} className="p-1 text-white">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </header>
      
      <main className="flex-grow flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-white mb-8 text-center cyan-text-glow">Create Account</h1>

        <form className="space-y-6">
          <InputField icon={<UserOutlineIcon className="w-6 h-6" />} type="text" placeholder="Username" />
          <InputField icon={<EmailOutlineIcon className="w-6 h-6" />} type="text" placeholder="Phone or Email" />
          <InputField icon={<PasswordLockIcon className="w-6 h-6" />} type="password" placeholder="Create a Password" />

          <p className="text-xs text-gray-400 text-center pt-2">
              By signing up, you agree to our{' '}
              <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
          <button
            type="button"
            onClick={onRegister}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 rounded-full text-lg shadow-lg shadow-purple-500/30 transition-all hover:shadow-cyan-500/40 hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400">or sign up with</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        
        <div className="flex justify-center gap-6">
             <button onClick={onRegister} className="w-14 h-14 rounded-full glassmorphism flex items-center justify-center transition-transform hover:scale-110"><GoogleIcon className="w-7 h-7" /></button>
             <button onClick={onRegister} className="w-14 h-14 rounded-full glassmorphism flex items-center justify-center transition-transform hover:scale-110"><FacebookIcon className="w-7 h-7" /></button>
             <button onClick={onRegister} className="w-14 h-14 rounded-full glassmorphism flex items-center justify-center transition-transform hover:scale-110"><AppleIcon className="w-7 h-7" /></button>
        </div>
      </main>

      <footer className="flex-shrink-0 text-center py-4">
        <p className="text-gray-300">
            Already have an account?{' '}
            <button onClick={onNavigateToLogin} className="font-bold text-white underline hover:text-cyan-300">
                Log In
            </button>
        </p>
      </footer>
    </div>
  );
};