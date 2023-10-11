import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/slices/authSlice";
import { Button } from "../index";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            toast.loading("Loading...");
            await authService.logout();
            toast.success("User Logged out");
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <Button
            bgColor="bg-[#9ED5CB]"
            textColor="text-black"
            className="bg-transparent border-transparent"
            onClick={logoutHandler}
        >
            <FiLogOut size={23} className="text-black dark:text-white" />
        </Button>
    );
};

export default LogoutButton;