import { useState } from "react";
import SelectDropdown from "./selectDropdown";
import Input from "./input";
import Button from "./Button";
import { useHMContext } from "@/app/hooks/useContext";

const MainForm = () => {
    const { vendors, mainFormData, setMainFormData, file, setFile } = useHMContext();

    const vendor = {
        labelName: "Vendor",
        defaultValue: "Select a vendor",
        array: [],
        onSave: (selectedValue) => setMainFormData(currentState => ({
            ...currentState,
            vendor: selectedValue,
        })),
        selectedValue: mainFormData.vendor
    }
    const invoiceNr = {
        labelName: "Invoice Nr",
        type: "number",
        onChange: (selectedValue) => setMainFormData(currentState => ({
            ...currentState,
            invoiceNr: selectedValue.target.value,
        })),
        value: mainFormData.invoiceNr

    }

    const checkbox = {
        labelName: "Is this a refund?",
        type: "checkbox",
        onChange: (selectedValue) => setMainFormData(currentState => ({
            ...currentState,
            invoiceNr: selectedValue.target.value,
        })),
        value: mainFormData.invoiceNr

    }
    const purchaseDate = {
        labelName: "Purchase",
        type: "date",
        onChange: (selectedValue) => setMainFormData(currentState => ({
            ...currentState,
            purchaseDate: selectedValue.target.value,
        })),
        value: mainFormData.purchaseDate

    }
    const paymentMethod = {
        labelName: "Payment Method",
        defaultValue: "Select Payment Method",
        array: ["Cash", "Credit Card", "Bank Transfer"],
        onSave: (selectedValue) => setMainFormData(currentState => ({
            ...currentState,
            paymentMethod: selectedValue,
        })),
        selectedValue: mainFormData.paymentMethod
    }
    const employee = {
        labelName: "Employee",
        defaultValue: "Select Employee",
        array: ["Dani", "Josie"],
        onSave: (selectedValue) => setMainFormData(currentState => ({
            ...currentState,
            employee: selectedValue,
        })),
        selectedValue: mainFormData.employee
    }
    const fileButton = {
        value: "Choose file", bgColor: "blue",
        onClick: () => document.getElementById('file-input').click(),
        disabled: file

    }
    const handleFileChange = (event) => {
        console.log("Event at handle file change ", event)
        console.log("Event target at handle file change ", event.target.files[0])

        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <div className="p-2 sm:p-5 rounded-2xl border border-zinc-400 flex flex-col justify-start items-start gap-2 sm:gap-3 w-full md:w-2/4">
            <SelectDropdown data={vendor} arrayList={vendors} />
            <div className="flex flex-col items-center sm:items-start">
                <p className="text-center text-neutral-500 text-sm sm:text-base font-bold py-1 sm:py-2">Upload Image</p>
                {/* Adjusting the Button position might need custom handling since it's absolute. Consider wrapping in a relative div if needed. */}
                <div className="relative w-full flex justify-center sm:justify-start">
                    <Button className="absolute sm:relative right-10 sm:right-auto" data={fileButton} />
                </div>
                <form action="" id="form">
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/*"
                        id="file-input"
                    />

                </form>
            </div>
            <Input data={invoiceNr} />
            <Input data={purchaseDate} />
            <SelectDropdown data={paymentMethod} arrayList={paymentMethod.array} />
            <SelectDropdown data={employee} arrayList={employee.array} />
            <div className="ml-3 text-sm md:text-baseleading-6 flex items-center gap-3 py-4">
            <input
              id="checkbox"
              aria-describedby="checkbox"
              name="checkbox"
              type="checkbox"
              value={mainFormData.isRefund}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              onChange={() => setMainFormData(currentState => ({
                ...currentState,
                isRefund: !currentState.isRefund,
            }))}
            />
            <label htmlFor="checkbox" className="font-medium text-gray-900">
              Is this a refund?
            </label>

          </div>
        </div>

    )
}

export default MainForm;
