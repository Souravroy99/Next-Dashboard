import { Loader } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md z-50">
      <div className="flex flex-col items-center">
        <Loader className="animate-spin h-16 w-16 text-blue-600" />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
