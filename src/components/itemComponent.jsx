import SelectDropdown from "./selectDropdown";
import Input from "./Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useHMContext } from "@/app/hooks/useContext";
import { useState } from "react";

const ItemComponent = ({ id }) => {
    const { items, setItems, categories, itemsNames } = useHMContext();
    // const [category, setCategory] = useState({
    //     labelName: "Category",
    //     defaultValue: "Select a category",
    //     array: categories,
    //     onSave: value => updateItemInContext('category', value),
    //     selectedValue: items[id].category
    // })

    const category = {
        labelName: "Category",
        defaultValue: "Select a category",
        array: categories,
        onSave: value => updateItemInContext('category', value),
        selectedValue: items[id].category
    }

    const item = {
        labelName: "Item",
        defaultValue: "Select an item",
        array: itemsNames,
        onSave: value => updateItemInContext('item', value),
        selectedValue: items[id].item

    }
    const quantity = {
        labelName: "Quantity",
        type: "number",
        onChange: e => updateItemInContext('quantity', e.target.value),
        value: items[id].quantity
    }
    const freight = {
        labelName: "Slot for freight",
        type: "number",
        onChange: e => updateItemInContext('freight', e.target.value),
        value: items[id].freight

    }
    const tax = {
        labelName: "Tax percentage",
        type: "number",
        onChange: e => updateItemInContext('tax', e.target.value),
        value: items[id].tax

    }
    const amount = {
        labelName: "Amount",
        type: "number",
        onChange: e => updateItemInContext('amount', e.target.value),
        value: items[id].amount

    }

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItemInContext = (property, value) => {
        const updatedItems = items.map(item => {
            if (item.id === id) {
                return { ...item, [property]: value };
            }
            return item;
        });
        setItems(updatedItems);
    };


    return (
        <div className="p-3 sm:p-5 rounded-2xl border border-zinc-400 flex flex-col justify-start items-start gap-2 sm:gap-3 w-full md:w-2/4 relative">
            <FontAwesomeIcon className="absolute right-5 top-5 text-[#7C8486] w-5 h-5 cursor-pointer" icon={faXmark} onClick={() => removeItem(id)} />
            <form action="" className="w-full">
                <SelectDropdown data={category} arrayList={categories} />
                <SelectDropdown data={item} arrayList={itemsNames} />
                <Input data={quantity} />
                <Input data={freight} />
                <Input data={tax} />
                <Input data={amount} />

            </form>
        </div>
    )
}

export default ItemComponent;
