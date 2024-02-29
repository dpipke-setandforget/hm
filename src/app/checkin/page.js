'use client'

import ItemComponent from "@/components/itemComponent";
import MainForm from "@/components/mainForm";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { useHMContext } from "@/app/hooks/useContext";
import useGoogleSheets from "../hooks/useGoogleSheets";
import SuccessModal from "@/components/successModal";
import { useState } from "react";

export default function CheckIn() {
    const { items, setItems, loading, mainFormData, file, resetForm} = useHMContext();
    const [isSuccessResponse, setIsSuccessResponse] = useState(false)
    const [isVisibleSuccessModal, setIsVisibleSuccessModal] = useState(true)
    const [ loadingResponse, setLoadingResponse ] = useState(false)

    const { submitData } = useGoogleSheets();
    const addItem = () => { 
        setItems([...items, { id: items.length,  category: "", item: "", quantity: "" ,  tax: "", freight: "", amount: "" }]);
    };

    const handleSubmitData = async () => {
        setLoadingResponse(true)
        const spreadsheetId = '1D7XoRaI18Q8wJ_3t4sUKOButPYYUzHrp-WxuYolCjL0'; // Replace with your actual spreadsheet ID
        const range = 'CHECK IN!A2:J'; // Replace with your actual range if needed
        const spreadsheetData = items.map(item => [
            new Date().toISOString(), // Timestamp
            mainFormData.vendor,
            mainFormData.invoiceNr,
            mainFormData.purchaseDate,
            mainFormData.paymentMethod,
            mainFormData.employee,
            item.category,
            item.item,
            item.quantity.toString(), 
            item.tax.toString(), 
            item.freight.toString(), 
            mainFormData.isRefund ? - item.amount.toString() : item.amount.toString(), 

        ]);
    

        // Call the submitDataToApi function with the spreadsheet details and data
        const submission = await submitData(spreadsheetId, range, spreadsheetData, file);
        console.log("submission ", submission)
        if(submission.status == 200){
            setIsSuccessResponse(true)
            setLoadingResponse(false)
            resetForm();
            console.log("items ", items)
            console.log("file ", file)
            console.log("mainFormData ", mainFormData)

        }
    };
    

    const itemButtonData = {
        value: "Add Item", 
        bgColor: "green",
        onClick: addItem,
        className: "self-end md:mr-[348px]",
        disabled: false
    };

    const submitButtonData = {
        value: "Submit", 
        bgColor: "blue",
        className: "self-end md:mr-[348px]",
        disabled: false,
        onClick: handleSubmitData 

    };
    

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center p-24">
                <Spinner /> 
            </main>
        );
    }

    return (
        <>
            {isSuccessResponse && (<SuccessModal setIsVisibleSuccessModal={setIsSuccessResponse} isVisibleSuccessModal={isSuccessResponse} />)}
            <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 gap-5 relative">
                <img src="/logo.png" alt="H&M Logo" />
                <h1 className="text-center text-zinc-900 text-2xl font-bold">Check In - H&M Inventory</h1>
                {items.map((item, index) => (
                    <ItemComponent key={item.id} id={item.id}/>
                ))}
                <Button data={itemButtonData}/> 
                <MainForm />
                <div className="flex justify-end w-full md:w-2/4"> 
                    {loadingResponse ? 
                          <div className="right-1/2 absolute mt-5 flex flex-1 justify-center items-center">
                          <div className="w-8 h-8 rounded-full animate-spin absolute  border-4 border-solid border-blue-500 border-t-transparent shadow-md"></div>
                      </div>
                    
                    : ""}
                    
                    <Button  data={submitButtonData}/>
                </div>
            </main>
        
        </>
    )
}
