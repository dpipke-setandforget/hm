const Input = ({data}) => {
    const additionalProps = data.type === "number" ? { min: "0" } : {};

    return (
        <div className="flex flex-col items-start py-2 w-full">
            <label className="text-sm md:text-base lg:text-lg font-bold text-neutral-500 py-1 md:py-2" htmlFor={data.labelName}>{data.labelName}</label>
            <input
              type={data.type}
              value={data.value}
              onChange={(event) =>  data.onChange(event)}
              className="p-3 md:p-4 lg:p-5 rounded-lg md:rounded-xl border border-zinc-400 active:border-blue-500 w-full text-sm md:text-base lg:text-lg"
            required
            {...additionalProps}

            />
        </div>
    );
}

export default Input;
