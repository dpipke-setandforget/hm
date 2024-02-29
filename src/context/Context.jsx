'use client'
import React, { createContext, useState, useEffect } from 'react';
import useGoogleSheets from '@/app/hooks/useGoogleSheets';
export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([{ id: 0, category: "", item: "", quantity: "", tax: "", freight: "", amount: "" }]);
    const {  error, fetchData } = useGoogleSheets();
    const [categories, setCategories] = useState([]);
    const [itemsNames, setItemsNames] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [file, setFile] = useState(""); 

    const [mainFormData, setMainFormData] = useState({
        vendor: '',
        invoiceNr: '',
        purchaseDate: '',
        paymentMethod: '',
        employee: '',
        isRefund: false

    });

    useEffect(() => {
        const loadCategories = async () => {
            setLoading(true);

            let data = await fetchData('1hTQ5_zW24rTpqo_WYprJQATSW--3YbHLxPq6br6_BXE', 'Categories!A2:A');
            setLoading(false);

            if (data) {
                data = data?.flat().filter((value, index, array) => array.indexOf(value) === index);
                setCategories(data);
            }
        };

        loadCategories();

        const loadItemNames = async () => {
            let data = await fetchData('1UZNP_pY1rlFkrUMGkeOsIv9FUfMML0hIbbvVmHnbTR8', 'uniqueParts!B2:B');
            if (data) {
                data = data?.flat().filter((value, index, array) => array.indexOf(value) === index);
                setItemsNames(data);
            }
        };

        loadItemNames();

         const loadVendors = async () => {
            let data = await fetchData('1UZNP_pY1rlFkrUMGkeOsIv9FUfMML0hIbbvVmHnbTR8', 'VENDORS!A2:A');
            if (data) {
                data = data?.flat().filter((value, index, array) => array.indexOf(value) === index);
                setVendors(data);
            }
        };

        loadVendors();

        
    }, []);

    const resetForm = () => {
        console.log("executing reset form")
        // Reset items to initial state (with one empty item for the user to fill)
        setItems([{ id: 0, category: "", item: "", quantity: "", tax: "", freight: "", amount: "" }]);
    
        // Reset main form data to initial state
        setMainFormData({
            vendor: '',
            invoiceNr: '',
            purchaseDate: '',
            paymentMethod: '',
            employee: '',
            isRefund: ""
        });
    
        // Reset file to null
        setFile("");
    
        // Additional resets if necessary
        document.getElementById("form").reset()
    };

    return (
        <Context.Provider value={{ items, setItems, 
        categories, loading, error, setLoading, itemsNames, vendors, mainFormData, setMainFormData, file, setFile, resetForm}}>
            {children}
        </Context.Provider>
    );
};
