/* eslint-disable react/prop-types */
import React from "react";

const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
})=> {
    return (
        <button type={type} className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all duration-200 border-[#9ED5CB] ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;