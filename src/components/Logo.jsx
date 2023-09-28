import React from "react";
import logo from "../assets/logo.png";

const Logo = ({ width }) => {
    return (
        <div className="bg-red-600 w-full">

        <img src={logo} className="-my-5" width={width} alt="Logo" />
        </div>
    );
};

export default Logo;