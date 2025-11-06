import type { AppState, Action, User } from '../types';
import { mockUsers, mockRooms, mockConversations, mockCurrentUser } from '../data/mock';

export const initialState: AppState = {
  isLoggedIn: false,
  users: mockUsers,
  rooms: mockRooms,
  conversations: mockConversations,
  currentUser: mockUsers.find(u => u.id === mockCurrentUser.id)!,
};

export const mainReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return { ...state, isLoggedIn: action.payload };
    
    case 'SET_USERS':
      return { ...state, users: action.payload };

    case 'UPDATE_USER':
      const newUsers = state.users.map(user =>
        user.id === action.payload.userId
          ? { ...user, ...action.payload.updates }
          : user
      );
      return {
        ...state,
        users: newUsers,
        currentUser: newUsers.find(u => u.id === state.currentUser.id) || state.currentUser,
      };

    case 'SET_ROOMS':
      return { ...state, rooms: action.payload };

    case 'ADD_ROOM':
        return { ...state, rooms: [action.payload, ...state.rooms] };

    case 'SET_CONVERSATIONS':
        return { ...state, conversations: action.payload };

    case 'ADD_CONVERSATION':
        return { ...state, conversations: [action.payload, ...state.conversations] };
        
    case 'ADD_CHAT_MESSAGE':
        return {
            ...state,
            conversations: state.conversations.map(convo => {
                if (convo.id === action.payload.conversationId) {
                    return {
                        ...convo,
                        messages: [...convo.messages, action.payload.message],
                        lastMessage: action.payload.message,
                    };
                }
                return convo;
            }),
        };

    default:
      return state;
  }
};
