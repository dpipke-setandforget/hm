import SelectDropdown from "./selectDropdown";
import Input from "./input";
import Button from "./Button";

const MainForm = () => {
    const vendor = {
        labelName: "Vendor", 
        defaultValue: "Select a vendor", 
        array: []
    }
    const invoiceNr = {
        labelName: "Invoice Nr",
        type: "number"
    }
    const truck = {
        labelName: "Truck", 
        defaultValue: "Select truck", 
        array: []
    }
    const trailer = {
        labelName: "Trailer", 
        defaultValue: "Select trailer", 
        array: []
    }
    const purchaseDate = {
        labelName: "Purchase",
        type: "date"
    }
    const paymentMethod = {
        labelName: "Payment Method", 
        defaultValue: "Select Payment Method", 
        array: []
    }
    const employee = {
        labelName: "Employee", 
        defaultValue: "Select Employee", 
        array: []
    }
    const fileButton = {
        value: "Choose file", bgColor: "blue"
    }
    return (
        <div className="p-5 rounded-2xl border border-zinc-400 flex-col justify-start items-start gap-3 inline-flex w-full">
            <SelectDropdown data={vendor} />
            <div className="flex flex-col">
                <p  className="text-center text-neutral-500 text-base font-bold ">Upload Image</p>
            <Button className="absolute right-10" data={fileButton}/>
            </div>
            <Input data={invoiceNr} />
            <SelectDropdown data={truck} />
            <SelectDropdown data={trailer} />
            <Input data={purchaseDate} />
            <SelectDropdown data={paymentMethod} />
            <SelectDropdown data={employee} />


        </div>
    )
}

export default MainForm;
