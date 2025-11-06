import React, { createContext, useReducer, useContext, FC } from 'react';
import { mainReducer, initialState } from '../reducers/mainReducer';
import type { AppState, Action } from '../types';

interface IStateContext {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const StateContext = createContext<IStateContext | undefined>(undefined);

export const StateProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const value = { state, dispatch };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
};
