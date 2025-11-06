import React, { useCallback } from 'react';
import type { User } from '../types';
import { useAppState } from './StateContext';

// The useData hook provides a convenient way to access data and dispatch actions
// from the global state. It's a layer on top of useAppState.

export const useData = () => {
    const { state, dispatch } = useAppState();

    const updateUser = useCallback((userId: string, updates: Partial<User>) => {
        dispatch({ type: 'UPDATE_USER', payload: { userId, updates } });
    }, [dispatch]);

    const findUser = useCallback((id: string) => {
        return state.users.find(u => u.id === id || u.numericId === id);
    }, [state.users]);

    return {
        ...state,
        updateUser,
        findUser,
    };
};
