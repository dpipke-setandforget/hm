import { useState, useCallback } from 'react';
import axios from 'axios'; // You might need to install axios

const useGoogleSheets = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (spreadsheetId, range) => {
        setLoading(true);
        try {
            const response = await axios.get('/api/sheets', { params: { spreadsheetId, range } });
            console.log("response", response)
            setLoading(false);
            return response.data;
           
        } catch (err) {
            setLoading(false);
            setError(err);
            return null;
        }
    }, []);

    const submitData = useCallback(async (spreadsheetId, range, values) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/route', { spreadsheetId, range, values });
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err);
            return null;
        }
    }, []);

    return { loading, error, fetchData, submitData };
};

export default useGoogleSheets;
