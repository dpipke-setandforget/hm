const Button = ({data}) => {
    return (
        <button 
            className={` px-4 py-3  bg-blue-500 rounded justify-start items-center gap-2.5 inline-flex text-center text-white text-base font-medium rounded-xl ${data.className}`}
            onClick={data.onClick} 
        >
            {data.value}
        </button>
    )
}

export default Button;
