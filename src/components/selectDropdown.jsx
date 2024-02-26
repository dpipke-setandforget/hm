const selectDropdown = ({data}) => {
    return (
        <div className="flex flex-col items-start py-2 w-full">
            <label className="text-center text-neutral-500 text-base font-bold py-2" htmlFor={data.labelName}>{data.labelName}</label>
            <select className="p-5 rounded-2xl border border-zinc-400 flex-col justify-start items-start gap-3 inline-flex w-full" name="" id="">
                <option  className="text-center text-zinc-400 text-xs font-medium " value={data.labelName}>{data.defaultValue}</option>
                {data.array.map(item => {
                    <option className="text-center text-zinc-400 text-xs font-medium " value={item}>{item}</option>
                })}
            </select>
        </div>
        )
}

export default selectDropdown;
