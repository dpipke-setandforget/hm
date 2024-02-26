'use client'

import { useContext } from 'react';
import { Context } from '@/context/Context';
export const useHMContext = () => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error('useContext must be used within a ContextProvider');
    }

    return context;
};
