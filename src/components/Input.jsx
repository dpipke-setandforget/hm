const Input = ({data}) => {
    return (
        <div className="flex flex-col items-start py-2">
            <label className="text-center text-neutral-500 text-base font-bold py-2" htmlFor={data.labelName}>{data.labelName}</label>
            <input type={data.type} className="p-5 rounded-2xl border border-zinc-400  justify-start items-end gap-3 inline-flex active:border-blue-500 w-full" />
        </div>
        )
}

export default Input;
