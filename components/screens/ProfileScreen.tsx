import React, { useState } from 'react';
import type { User, Screen } from '../../types';
import { TargetProgressWidget } from '../TargetProgressWidget';
import { ExpBar } from '../ExpBar';
import { ResellerIcon } from '../icons/ResellerIcon';
import { AdminIcon } from '../icons/AdminIcon';
import { CoinIcon } from '../icons/CoinIcon';
import { DiamondIcon } from '../icons/DiamondIcon';
import { EditIcon } from '../icons/EditIcon';
import { mockStoreItems } from '../../data/mock';
import { Svip3DIcon } from '../icons/3d/Svip3DIcon';
import { Level3DIcon } from '../icons/3d/Level3DIcon';
import { Family3DIcon } from '../icons/3d/Family3DIcon';
import { Store3DIcon } from '../icons/3d/Store3DIcon';
import { Items3DIcon } from '../icons/3d/Items3DIcon';
import { Invite3DIcon } from '../icons/3d/Invite3DIcon';
import { Medal3DIcon } from '../icons/3d/Medal3DIcon';
import { Settings3DIcon } from '../icons/3d/Settings3DIcon';

interface ProfileScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onViewUserList: (title: string) => void;
}

const Stat: React.FC<{ value: number; label: string; onClick: () => void }> = ({ value, label, onClick }) => (
  <button onClick={onClick} className="text-center p-2 rounded-lg transition-colors hover:bg-white/5 flex-1">
    <p className="text-lg font-bold text-white">{value.toLocaleString()}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </button>
);

const MenuItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; hasBadge?: boolean }> = ({ icon, label, onClick, hasBadge }) => (
    <button onClick={onClick} className="relative flex flex-col items-center justify-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors group">
        <div className="w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-110">{icon}</div>
        <span className="text-xs font-semibold text-gray-300">{label}</span>
        {hasBadge && (
            <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[var(--color-background-deep)]"></div>
        )}
    </button>
);

const AdminMenu: React.FC<{onNavigate: (s: Screen) => void, onClose: () => void}> = ({ onNavigate, onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
        <div className="glassmorphism rounded-lg p-4 space-y-2 border-cyan-400/50" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-white text-center">Secret Menu</h3>
            <button className="w-full flex items-center gap-2 p-2 rounded hover:bg-white/10 text-gray-200" onClick={() => onNavigate('admin-panel')}><AdminIcon className="w-5 h-5"/> Admin Panel</button>
            <button className="w-full flex items-center gap-2 p-2 rounded hover:bg-white/10 text-gray-200" onClick={() => onNavigate('reseller-panel')}><ResellerIcon className="w-5 h-5"/> Reseller Panel</button>
        </div>
    </div>
);

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onNavigate, onViewUserList }) => {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const frame = mockStoreItems.find(item => item.id === user.equippedFrameId);

  const handleAvatarLongPress = (e: React.MouseEvent) => {
      e.preventDefault();
      if(user.role === 'admin' || user.role === 'reseller'){
        setShowAdminMenu(true);
      }
  };

  return (
    <div className="pb-24 min-h-full">
       {showAdminMenu && <AdminMenu onNavigate={onNavigate} onClose={() => setShowAdminMenu(false)} />}
      
       <div className="p-4 pt-8">
            <div 
                className="relative p-4 rounded-xl overflow-hidden glassmorphism"
                style={{
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.1), transparent 40%)',
                    borderColor: 'rgba(0, 255, 255, 0.3)',
                }}
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                    <button onClick={() => onNavigate('profile-edit')} className="absolute top-[-8px] right-[-8px] p-2 bg-white/10 rounded-full">
                        <EditIcon className="w-5 h-5 text-gray-300" />
                    </button>
                    <div className="flex items-center">
                        <button onContextMenu={handleAvatarLongPress} className="relative w-20 h-20">
                            <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full rounded-full shadow-md border-2 border-cyan-400/50" />
                            {frame && (
                                <img src={frame.imageUrl} alt="Avatar Frame" className="absolute -inset-2 w-24 h-24 pointer-events-none" />
                            )}
                        </button>
                        <div className="ml-4 flex-1">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-white drop-shadow-md">{user.displayName}</h1>
                                {user.isSvip && <img src="https://i.postimg.cc/C1j3wL2r/starburst-light.png" className="w-8 h-8" alt="SVIP" />}
                            </div>
                            <p className="text-gray-200 text-sm mt-1 drop-shadow">id: {user.numericId} 📋</p>
                        </div>
                    </div>
                     <div className="mt-3 w-full">
                        <ExpBar currentExp={user.currentExp} totalExp={user.totalExp} level={user.level} />
                    </div>
                    <div className="flex justify-around mt-2 -mx-2">
                        <Stat value={user.followers} label="Followers" onClick={() => onViewUserList('Followers')} />
                        <Stat value={user.following} label="Following" onClick={() => onViewUserList('Following')} />
                        <Stat value={user.visitors} label="Visitors" onClick={() => onViewUserList('Visitors')} />
                    </div>
                </div>
            </div>

            <div className="mt-4 p-4 rounded-xl glassmorphism">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-white">My Wallet</h3>
                     <button onClick={() => onNavigate('wallet')} className="text-xs font-semibold text-cyan-300">Details {'>'}</button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
                        <CoinIcon className="w-8 h-8"/>
                        <div>
                            <p className="text-sm text-gray-400">Coins</p>
                            <p className="font-bold text-white">{user.coinsBalance.toLocaleString()}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
                        <DiamondIcon className="w-8 h-8"/>
                        <div>
                            <p className="text-sm text-gray-400">Diamonds</p>
                            <p className="font-bold text-white">{user.diamondsBalance.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <TargetProgressWidget targetCycle={user.targetCycle} onNavigate={() => onNavigate('target')} />
            </div>
            
            <div className="mt-4 p-3 rounded-xl glassmorphism">
                <div className="grid grid-cols-4 gap-2">
                    <MenuItem icon={<Svip3DIcon />} label="SVIP" onClick={() => onNavigate('svip')} hasBadge={!user.isSvip} />
                    <MenuItem icon={<Level3DIcon />} label="Level" onClick={() => onNavigate('level')} />
                    <MenuItem icon={<Family3DIcon />} label="Family" onClick={() => onNavigate('family')} />
                    <MenuItem icon={<Store3DIcon />} label="Store" onClick={() => onNavigate('store')} />
                    <MenuItem icon={<Items3DIcon />} label="My Items" onClick={() => onNavigate('items')} />
                    <MenuItem icon={<Invite3DIcon />} label="Invite" onClick={() => onNavigate('invite')} />
                    <MenuItem icon={<Medal3DIcon />} label="Medal" onClick={() => onNavigate('medal')} />
                    <MenuItem icon={<Settings3DIcon />} label="Settings" onClick={() => onNavigate('settings')} />
                </div>
            </div>
       </div>
    </div>
  );
};