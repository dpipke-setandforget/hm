import { useState, useCallback } from 'react';
import axios from 'axios'; // You might need to install axios

const useGoogleSheets = () => {
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (spreadsheetId, range) => {
        try {
            const response = await axios.get('/api/sheets', { params: { spreadsheetId, range } });
            return response.data;
           
        } catch (err) {
            setError(err);
            return null;
        }
    }, []);

    const submitData = useCallback(async (spreadsheetId, range, values, file) => {
        try {    
            // Wrap FileReader in a Promise
            const readFile = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64String = reader.result
                            .replace('data:', '')
                            .replace(/^.+,/, '');
                        resolve(base64String);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            };
    
            const base64String = await readFile(file);
            
            const uploadFileToDrive = await axios.post('/api/drive', { file: base64String, invoiceNr: values[0][2] });
          
            const fileId = "https://drive.google.com/file/d/"+ uploadFileToDrive.data.data.id + "/view";

            values = values.map(subArray => {
                let modifiedSubArray = [...subArray];
                modifiedSubArray.splice(6, 0, fileId); 
                return modifiedSubArray;
            });
    
            const response = await axios.post('/api/sheets', { spreadsheetId, range, values });

            return response;
        } catch (err) {
            console.error(err);
            setError(err); // Make sure setError is defined in this context
            return null;
        }
    }, []);
    

    return {  error, fetchData, submitData };
};

export default useGoogleSheets;
