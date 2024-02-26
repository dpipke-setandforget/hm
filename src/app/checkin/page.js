'use client'

import ItemComponent from "@/components/itemComponent";
import MainForm from "@/components/mainForm";
import Button from "@/components/Button";
import { useHMContext } from "@/app/hooks/useContext";

export default function CheckIn() {
    const { items, setItems } = useHMContext();

    const addItem = () => {
        setItems([...items, { id: items.length }]);
    };


    const itemButtonData = {
        value: "Add Item", 
        bgColor: "green",
        onClick: addItem,
        className: "self-end" 
    };

    const submitButtonData = {
        value: "Submit", 
        bgColor: "blue",
        className: "self-end" 

    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-5 relative">
            <img src="/logo.png" alt="H&M Logo" />
            <h1 className="text-center text-zinc-900 text-2xl font-bold">Check In - H&M Inventory</h1>
            {items.map((item, index) => (
                <ItemComponent key={item.id} id={item.id}/>
            ))}
            <Button data={itemButtonData}/> 
            <MainForm />
            <Button data={submitButtonData}/>
        </main>
    )
}
