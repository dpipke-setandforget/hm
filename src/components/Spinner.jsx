export default function Spinner() {
    return (
      <div className="flex flex-1 justify-center items-center">
          <div className="w-8 h-8 rounded-full animate-spin absolute top-1/2 border-4 border-solid border-black border-t-transparent shadow-md"></div>
      </div>
    );
  }