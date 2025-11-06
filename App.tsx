import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { MessagesScreen } from './components/screens/MessagesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { RoomScreen } from './components/RoomScreen';
import { ChatView } from './components/ChatView';
import { StateProvider, useAppState } from './contexts/StateContext';
import { ToastProvider, useToast } from './components/Toast';
import { ThemeProvider } from './contexts/ThemeContext';
import type { Tab, Screen, Room, Conversation, User, RocketReward } from './types';
import { AuthNavigator } from './components/screens/auth/AuthNavigator';
import { MissionScreen } from './components/MissionScreen';
import { RankingScreen } from './components/screens/RankingScreen';
import { WalletScreen } from './components/screens/subscreens/WalletScreen';
import { InviteScreen } from './components/screens/subscreens/InviteScreen';
import { MedalScreen } from './components/screens/subscreens/MedalScreen';
import { SvipScreen } from './components/screens/subscreens/SvipScreen';
import { LevelScreen } from './components/screens/subscreens/LevelScreen';
import { FamilyScreen } from './components/screens/subscreens/FamilyScreen';
import { StoreScreen } from './components/screens/subscreens/StoreScreen';
import { MyItemsScreen } from './components/screens/subscreens/MyItemsScreen';
import { SettingsScreen } from './components/screens/subscreens/SettingsScreen';
import { UserListScreen } from './components/screens/subscreens/UserListScreen';
import { SystemChatView } from './components/SystemChatView';
import { ProfileEditScreen } from './components/screens/subscreens/ProfileEditScreen';
import { CreateRoomModal } from './components/CreateRoomModal';
import { TargetScreen } from './components/screens/subscreens/TargetScreen';
import { AdminPanelScreen } from './components/screens/subscreens/AdminPanelScreen';
import { ResellerPanelScreen } from './components/screens/subscreens/ResellerPanelScreen';
import { FamilyListScreen } from './components/screens/subscreens/FamilyListScreen';
import { CreateFamilyScreen } from './components/screens/subscreens/CreateFamilyScreen';
import { LegalScreen } from './components/screens/subscreens/LegalScreen';
import { EventsScreen } from './components/screens/subscreens/EventsScreen';
import { PairsScreen } from './components/screens/subscreens/PairsScreen';
import { HomeMenu } from './components/HomeMenu';
import { ParticleBackground } from './components/ParticleBackground';
import { DailyRewardModal } from './components/DailyRewardModal';
import { RocketLaunchAnimation } from './components/RocketLaunchAnimation';
import { LevelUpModal } from './components/LevelUpModal';
import { RocketEventScreen } from './components/screens/RocketEventScreen';
import { RocketRewardModal } from './components/RocketRewardModal';
import { EarningsScreen } from './components/screens/subscreens/EarningsScreen';
import { SpeakerWaveIcon } from './components/icons/SpeakerWaveIcon';
import { FriendsScreen } from './components/screens/subscreens/FriendsScreen';
import { AccountScreen } from './components/screens/subscreens/AccountScreen';
import { PrivacyScreen } from './components/screens/subscreens/PrivacyScreen';
import { AboutScreen } from './components/screens/subscreens/AboutScreen';
import { ContactScreen } from './components/screens/subscreens/ContactScreen';
import { RoomSettingsScreen } from './components/screens/subscreens/RoomSettingsScreen';


const AppContent: React.FC = () => {
  const { state, dispatch } = useAppState();
  const { currentUser, rooms, conversations, isLoggedIn } = state;
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [userList, setUserList] = useState<{title: string, users: User[]}|null>(null);
  const [legalPageType, setLegalPageType] = useState<'tos' | 'privacy' | 'refund' | null>(null);
  const [systemChatType, setSystemChatType] = useState<'system' | 'friends' | 'activity' | 'family' | 'feedback' | null>(null);


  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showHomeMenu, setShowHomeMenu] = useState(false);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState<{ newLevel: number } | null>(null);
  const [rocketLaunchInfo, setRocketLaunchInfo] = useState<{ room: Room; launchedLevel: number } | null>(null);
  const [rocketReward, setRocketReward] = useState<RocketReward | null>(null);

  const updateUser = useCallback((userId: string, updates: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: { userId, updates } });
  }, [dispatch]);

  const handleLogin = () => {
    addToast(`Welcome back, ${currentUser.displayName}!`, 'success');
    dispatch({ type: 'SET_LOGGED_IN', payload: true });
    setTimeout(() => setShowDailyReward(true), 500);
  };
  
  const handleLogout = () => {
    dispatch({ type: 'SET_LOGGED_IN', payload: false });
    setActiveScreen('home');
  };
  
  const navigateToRootScreen = useCallback((screen: Screen) => {
    setActiveScreen(screen);
    setSelectedConversationId(null);
    setUserList(null);
    setLegalPageType(null);
    setSystemChatType(null);
  }, []);
  
  const handleNavigate = useCallback((screen: Screen, params?: any) => {
    if(screen === 'system-chat' && params?.type) {
      setSystemChatType(params.type);
    }
    if (screen === 'legal' && params?.type) {
      setLegalPageType(params.type);
    }
    setActiveScreen(screen);
    setShowHomeMenu(false);
  }, []);

  const handleTabChange = (newTab: Tab) => {
      const screenMap: { [key in Tab]: Screen } = { Home: 'home', Message: 'messages', Me: 'profile' };
      const rootScreenForTab = screenMap[newTab];

      if (activeTab === newTab && activeScreen !== rootScreenForTab) {
          navigateToRootScreen(rootScreenForTab);
      } else {
          setActiveTab(newTab);
          navigateToRootScreen(rootScreenForTab);
      }
  };


  const handleJoinRoom = useCallback((room: Room) => {
    if (room.isLocked && room.host.id !== currentUser.id) {
      addToast('This room is locked!', 'error');
      return;
    }
    setSelectedRoom(room);
    setActiveScreen('room');
    setShowHomeMenu(false);
  }, [addToast, currentUser.id]);

  const handleCreateRoom = useCallback((newRoom: Room) => {
    dispatch({ type: 'ADD_ROOM', payload: newRoom });
    setSelectedRoom(newRoom);
    setShowCreateRoom(false);
    setActiveScreen('room');
    setShowHomeMenu(false);
  }, [dispatch]);

  const handleCloseRoom = useCallback(() => {
    setSelectedRoom(null);
    const screenMap: { [key in Tab]: Screen } = { Home: 'home', Message: 'messages', Me: 'profile' };
    setActiveScreen(screenMap[activeTab]);
  }, [activeTab]);
  
  const handleMinimizeRoom = useCallback(() => {
    const screenMap: { [key in Tab]: Screen } = { Home: 'home', Message: 'messages', Me: 'profile' };
    setActiveScreen(screenMap[activeTab]);
  }, [activeTab]);

  const handleSelectConversation = useCallback((conversationId: string) => {
    setSelectedConversationId(conversationId);
    setActiveScreen('chat');
  }, []);
  
  const handleStartConversation = useCallback((userId: string) => {
    if (userId === currentUser.id) return;
    let convo = conversations.find(c => c.participants.some(p => p.id === userId));
    if (!convo) {
      const otherUser = state.users.find(u => u.id === userId);
      if (!otherUser) { addToast("User not found.", "error"); return; }
      const newLastMessage = { id: `mnew-${Date.now()}`, text: 'Start your conversation!', senderId: 'system', senderName: 'System', senderAvatar:'', timestamp: new Date(), isSystemMessage: true };
      const newConvo: Conversation = { id: `convo-${Date.now()}`, participants: [currentUser, otherUser], messages: [newLastMessage], lastMessage: newLastMessage, unreadCount: 0 };
      dispatch({ type: 'ADD_CONVERSATION', payload: newConvo });
      convo = newConvo;
    }
    handleSelectConversation(convo.id);
  }, [addToast, conversations, currentUser, handleSelectConversation, dispatch, state.users]);

  const handleViewUserList = useCallback((title: string) => {
    setUserList({title, users: state.users.slice(1, 6)});
    setActiveScreen('user-list');
  }, [state.users]);

  const handleUpdateUser = useCallback((updates: Partial<User>) => {
    const oldUser = { ...currentUser };
    const newUser = { ...currentUser, ...updates };

    if (updates.currentExp !== undefined && oldUser.totalExp > 0) {
        if (oldUser.currentExp < oldUser.totalExp && newUser.currentExp >= newUser.totalExp) {
            const newLevel = newUser.level + 1;
            const newTotalExp = newUser.totalExp * 2;
            updateUser(currentUser.id, { 
                level: newLevel, 
                currentExp: newUser.currentExp - oldUser.totalExp, 
                totalExp: newTotalExp 
            });
            setLevelUpInfo({ newLevel });
            return;
        }
    }
    updateUser(currentUser.id, updates);
  }, [currentUser, updateUser]);
  
  const renderContent = () => {
    if (!isLoggedIn) {
      return <AuthNavigator onLogin={handleLogin} />;
    }
    
    switch (activeScreen) {
      case 'home': return <HomeScreen rooms={rooms} onJoinRoom={handleJoinRoom} onNavigate={handleNavigate} onOpenHomeMenu={() => setShowHomeMenu(true)} />;
      case 'messages': return <MessagesScreen conversations={conversations} currentUser={currentUser} onSelectConversation={handleSelectConversation} onNavigate={handleNavigate} />;
      case 'profile': return <ProfileScreen user={currentUser} onNavigate={handleNavigate} onViewUserList={handleViewUserList} />;
      case 'profile-edit': return <ProfileEditScreen user={currentUser} onBack={() => navigateToRootScreen('profile')} onSave={(updates) => { updateUser(currentUser.id, updates); addToast('Profile Saved!', 'success'); navigateToRootScreen('profile'); }} />;
      case 'room': return selectedRoom ? <RoomScreen room={selectedRoom} currentUser={currentUser} onCloseRoom={handleCloseRoom} onMinimizeRoom={handleMinimizeRoom} onUpdateUser={handleUpdateUser} onViewUserList={handleViewUserList} onStartConversation={handleStartConversation} onNavigate={handleNavigate} /> : null;
      case 'room-settings': return selectedRoom ? <RoomSettingsScreen room={selectedRoom} onBack={() => setActiveScreen('room')} onEndRoom={handleCloseRoom} /> : null;
      case 'chat': const convo = conversations.find(c => c.id === selectedConversationId); return convo ? <ChatView conversation={convo} currentUser={currentUser} onBack={() => navigateToRootScreen('messages')} /> : null;
      case 'system-chat': return systemChatType ? <SystemChatView type={systemChatType} onBack={() => navigateToRootScreen('messages')} /> : null;
      case 'missions': return <MissionScreen onBack={() => navigateToRootScreen('home')} />;
      case 'ranking': return <RankingScreen onBack={() => navigateToRootScreen('home')} />;
      case 'events': return <EventsScreen onBack={() => navigateToRootScreen('home')} />;
      case 'pairs': return <PairsScreen onBack={() => navigateToRootScreen('home')} />;
      case 'rocket-event': return selectedRoom ? <RocketEventScreen onBack={() => setActiveScreen('room')} room={selectedRoom} /> : null;
      case 'wallet': return <WalletScreen onBack={() => navigateToRootScreen('profile')} user={currentUser} onUpdateUser={(updates) => updateUser(currentUser.id, updates)} onNavigate={handleNavigate} />;
      case 'target': return <TargetScreen onBack={() => setActiveScreen('profile')} user={currentUser} onUpdateUser={(updates) => updateUser(currentUser.id, updates)} />;
      case 'invite': return <InviteScreen onBack={() => navigateToRootScreen('profile')} />;
      case 'medal': return <MedalScreen onBack={() => navigateToRootScreen('profile')} />;
      case 'svip': return <SvipScreen onBack={() => navigateToRootScreen('profile')} />;
      case 'level': return <LevelScreen onBack={() => navigateToRootScreen('profile')} user={currentUser} />;
      case 'family': return <FamilyScreen onBack={() => navigateToRootScreen('profile')} user={currentUser} onNavigate={handleNavigate} />;
      case 'family-list': return <FamilyListScreen onBack={() => handleNavigate('family')} onNavigate={handleNavigate} />;
      case 'create-family': return <CreateFamilyScreen onBack={() => handleNavigate('family-list')} user={currentUser} onUpdateUser={(u) => updateUser(currentUser.id, u)} />;
      case 'store': return <StoreScreen onBack={() => navigateToRootScreen('profile')} user={currentUser} onUpdateUser={(updates) => updateUser(currentUser.id, updates)} />;
      case 'items': return <MyItemsScreen onBack={() => navigateToRootScreen('profile')} />;
      case 'settings': return <SettingsScreen onBack={() => navigateToRootScreen('profile')} onLogout={handleLogout} onNavigate={(screenOrType) => {
        if (['tos', 'privacy', 'refund'].includes(screenOrType)) {
          handleNavigate('legal', { type: screenOrType });
        } else {
          handleNavigate(screenOrType as Screen);
        }
      }} />;
      case 'legal': return legalPageType ? <LegalScreen onBack={() => handleNavigate('settings')} type={legalPageType} /> : null;
      case 'account': return <AccountScreen onBack={() => handleNavigate('settings')} />;
      case 'privacy': return <PrivacyScreen onBack={() => handleNavigate('settings')} />;
      case 'about': return <AboutScreen onBack={() => handleNavigate('settings')} />;
      case 'contact': return <ContactScreen onBack={() => handleNavigate('settings')} />;
      case 'user-list': return userList ? <UserListScreen title={userList.title} users={userList.users} onBack={() => navigateToRootScreen('profile')} /> : null;
      case 'friends': return <FriendsScreen onBack={() => handleNavigate('messages')} />;
      case 'admin-panel': return <AdminPanelScreen onBack={() => handleNavigate('profile')} />;
      case 'reseller-panel': return <ResellerPanelScreen onBack={() => handleNavigate('profile')} currentUser={currentUser} />;
      case 'earnings': return <EarningsScreen onBack={() => handleNavigate('wallet')} />;
      default: return <HomeScreen rooms={rooms} onJoinRoom={handleJoinRoom} onNavigate={handleNavigate} onOpenHomeMenu={() => setShowHomeMenu(true)} />;
    }
  };
  
  const mainContent = renderContent();
  const isFullScreen = ['room', 'chat', 'room-settings'].includes(activeScreen) || !isLoggedIn;
  const isRoomMinimized = selectedRoom && activeScreen !== 'room';

  return (
    <div className="h-full w-full max-w-2xl mx-auto font-sans relative overflow-hidden text-white app-bg">
       <ParticleBackground />
       <div key={activeScreen} className="relative h-full w-full overflow-y-auto animate-screen-entry" style={{ scrollbarWidth: 'none' }}>
          {mainContent}
          {isLoggedIn && showHomeMenu && <HomeMenu onClose={() => setShowHomeMenu(false)} onCreateRoom={() => {setShowCreateRoom(true); setShowHomeMenu(false);}} onJoinRoom={handleJoinRoom} allRooms={rooms} />}
          {isLoggedIn && !isFullScreen && <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} messageCount={conversations.reduce((acc, c) => acc + c.unreadCount, 0)} />}
          {showCreateRoom && <CreateRoomModal onClose={() => setShowCreateRoom(false)} onCreate={handleCreateRoom} />}
          {isLoggedIn && showDailyReward && <DailyRewardModal onClose={() => setShowDailyReward(false)} onClaimed={() => updateUser(currentUser.id, { coinsBalance: currentUser.coinsBalance + 300 })} />}
          {levelUpInfo && <LevelUpModal newLevel={levelUpInfo.newLevel} onComplete={() => setLevelUpInfo(null)} />}
          {rocketLaunchInfo && <RocketLaunchAnimation room={rocketLaunchInfo.room} launchedLevel={rocketLaunchInfo.launchedLevel} onComplete={() => setRocketLaunchInfo(null)} onUpdateUser={handleUpdateUser} />}
          {rocketReward && <RocketRewardModal reward={rocketReward} onClose={() => setRocketReward(null)} />}
          {isRoomMinimized && (
            <button 
              onClick={() => setActiveScreen('room')}
              className="fixed bottom-24 right-4 z-50 p-3 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 text-white shadow-lg animate-button-glow"
            >
              <SpeakerWaveIcon className="w-6 h-6"/>
            </button>
          )}
        </div>
    </div>
  );
};

const App: React.FC = () => (
  <StateProvider>
    <ThemeProvider>
        <ToastProvider>
            <AppContent />
        </ToastProvider>
    </ThemeProvider>
  </StateProvider>
);

export default App;