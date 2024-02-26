import SelectDropdown from "./selectDropdown";
import Input from "./Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useHMContext } from "@/app/hooks/useContext";

const ItemComponent = ({id}) => {
    const { items, setItems, categories } = useHMContext();
    const category = {
        labelName: "Category", 
        defaultValue: "Select a category", 
        array: categories
    }
    const item = {
        labelName: "Item", 
        defaultValue: "Select an item", 
        array: []
    }
    const quantity = {
        labelName: "Quantity",
        type: "number"
    }

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };


    return (
        <div className="p-5 rounded-2xl border border-zinc-400 flex-col justify-start items-start gap-3 inline-flex w-full relative">
            <FontAwesomeIcon className="absolute right-10 text-[#7C8486] w-5"  icon={faXmark}  onClick={() => removeItem(id)}/>
                <form action="" className="w-full">
                <SelectDropdown  data ={category} />
                <SelectDropdown  data ={item} />
                <Input data={quantity}/>
                </form>
        </div>
        )
}

export default ItemComponent;
