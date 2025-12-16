import React from "react";

const TypingIndicator = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
            <span className="text-xs text-gray-400 font-medium italic">Sedang mengetik...</span>
        </div>
    );
};

export default TypingIndicator;
