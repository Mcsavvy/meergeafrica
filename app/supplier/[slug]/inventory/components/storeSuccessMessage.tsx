interface StoreSuccessMessageProps {
  onBack: () => void;
}

const StoreSuccessMessage = ({ onBack }: StoreSuccessMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      {/* Success Icon */}
      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path 
            d="M20 6L9 17L4 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Success Text */}
      <h2 className="text-xl font-semibold text-black">Successful</h2>
      <p className="text-sm text-gray-600">You have created a new store successfully</p>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="w-full mt-2 bg-[#14213D] text-white py-2.5 rounded-md hover:bg-opacity-90 transition-colors text-sm"
      >
        Back
      </button>
    </div>
  );
};

export default StoreSuccessMessage;
