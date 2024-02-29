const Button = ({data}) => {
    return (
        <button 
            className={`px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3.5 lg:px-10 lg:py-4 bg-blue-500 rounded justify-start items-center gap-2 sm:gap-4 inline-flex text-center text-white text-base sm:text-lg md:text-xl font-medium rounded-xl ${data.className} disabled:opacity-75`}
            onClick={data.onClick} 
            disabled={data.disabled}
        >
            {data.value}
        </button>
    )
}

export default Button;
