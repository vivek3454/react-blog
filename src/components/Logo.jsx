import React from "react";
import logo from "../assets/logo.png";

const Logo = ({ width }) => {
    return (
        <img src={logo} width={width} alt="Logo" />
    );
};

export default Logo;