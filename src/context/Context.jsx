'use client'
import React, { createContext, useState, useEffect } from 'react';
import useGoogleSheets from '@/app/hooks/useGoogleSheets';
export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [items, setItems] = useState([{ id: 0 }]);
    const { loading, error, fetchData } = useGoogleSheets();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchData('1hTQ5_zW24rTpqo_WYprJQATSW--3YbHLxPq6br6_BXE', 'Categories!A2:A');
            if (data) {
                setCategories(data);
            }
        };

        loadCategories();
    }, [fetchData]);

    return (
        <Context.Provider value={{ items, setItems, categories, loading, error }}>
            {children}
        </Context.Provider>
    );
};
