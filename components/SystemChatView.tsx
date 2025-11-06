

import React from 'react';
import { SubScreenWrapper } from './screens/subscreens/SubScreenWrapper';
import { mockUsers } from '../data/mock';

interface SystemChatViewProps {
  type: 'system' | 'friends' | 'activity' | 'family' | 'feedback';
  onBack: () => void;
}

const SystemMessage: React.FC<{ logo: string; body: React.ReactNode; time: string; cta?: string }> = ({ logo, body, time, cta }) => (
    <div className="p-4">
        <div className="text-center text-xs text-gray-400 mb-2">{time}</div>
        <div className="bg-slate-800/70 p-4 rounded-lg shadow-sm w-full max-w-sm mx-auto">
            <div className="flex items-start gap-3">
                <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
                <div className="text-sm text-gray-300">{body}</div>
            </div>
            {cta && <div className="border-t border-slate-700 mt-3 pt-2 text-center text-sm text-cyan-400 font-semibold">{cta}</div>}
        </div>
    </div>
);

const FriendRequest: React.FC<{ name: string; avatar: string }> = ({ name, avatar }) => (
    <div className="flex items-center p-4 bg-slate-800/70 rounded-lg shadow-sm">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
        <div className="ml-4 flex-grow">
            <p className="font-semibold text-white">{name}</p>
            <p className="text-sm text-gray-400">Sent you a friend request</p>
        </div>
        <div className="ml-auto flex gap-2">
            <button className="px-4 py-1.5 bg-slate-600 text-white font-semibold rounded-full text-sm">Ignore</button>
            <button className="px-4 py-1.5 bg-cyan-500 text-black font-semibold rounded-full text-sm">Accept</button>
        </div>
    </div>
);

const YariLogo = "https://i.postimg.cc/j5G3P3Wb/yari-logo.png";


export const SystemChatView: React.FC<SystemChatViewProps> = ({ type, onBack }) => {
  const titleMap = {
      system: 'Notifications',
      friends: 'Friend Requests',
      activity: 'Activity',
      family: 'Family',
      feedback: 'Feedback'
  };
  const title = titleMap[type];
  const userBilal = mockUsers.find(u => u.displayName === 'Bilal');

  const renderContent = () => {
      switch(type) {
          case 'system':
              return (
                 <div className="py-2 space-y-4">
                    <SystemMessage 
                        logo={YariLogo}
                        time="30/10/2025 16:38"
                        body={
                            <p>Dear user, Yari will carry out a product update. Service will be suspended from October 30, 10:30 PM (IST) to October 31, 10:30 AM (IST) and will be restarted at October 31, 10:30 AM (IST). Thank You for your understanding. After the update is completed, the purchase of coins, gifts and activity reward will be more favorable!</p>
                        }
                        cta="Tap to view more >"
                    />
                    <SystemMessage 
                        logo={YariLogo}
                        time="29/10/2025 2:33"
                        body={<p>Congratulations! You got reward from the Fighter Launch in the room (ID:10192897):Coin coin*2012</p>}
                        cta="Tap to view more >"
                    />
                 </div>
              );
          case 'friends':
              return userBilal ? (
                <div className="p-4"><FriendRequest name={userBilal.displayName} avatar={userBilal.avatarUrl} /></div>
              ) : <div className="p-8 text-center text-gray-400">No friend requests.</div>
          default:
              return <div className="p-8 text-center text-gray-400">No {title} messages.</div>;
      }
  }

  return (
    <SubScreenWrapper title={title} onBack={onBack}>
        <div className="flex-grow overflow-y-auto">
            {renderContent()}
        </div>
    </SubScreenWrapper>
  );
};