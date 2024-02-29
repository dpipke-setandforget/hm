const SelectDropdown = ({data, arrayList}) => {
    return (
        <div className="flex flex-col items-start py-2 w-full">
            <label className="text-sm md:text-base lg:text-lg font-bold text-neutral-500 py-1 md:py-2" htmlFor={data.labelName}>{data.labelName}</label>
            <select
              className="p-3 md:p-4 lg:p-5 text-sm md:text-base lg:text-lg rounded-lg border border-zinc-400 flex-col justify-start items-start w-full cursor-pointer"
              value={data.selectedValue} // Bind select value to state
              onChange={(event) => data.onSave(event.target.value)}
              required
            >
                <option className="text-center text-zinc-400 py-2" key={data.labelName} value="">{data.defaultValue}</option>
                {arrayList.map(item => 
                    <option className="text-center text-zinc-400 py-2" key={item} value={item}>{item}</option>
                )}
            </select>
        </div>
    );
}

export default SelectDropdown;
