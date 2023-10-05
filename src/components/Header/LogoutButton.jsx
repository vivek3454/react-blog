import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { Button } from "../index";
import toast from "react-hot-toast";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        toast.promise(

            authService.logout()
                .then(() => {
                    dispatch(logout());
                })
                .catch((error) => toast.error(error)),
            {
                loading: "Loading...",
                success: "User Logged out",
                error: "Could not logout",
            }
        );
    };
    return (
        <Button
            bgColor="bg-[#9ED5CB]"
            textColor="text-black"
            className="px-6"
            onClick={logoutHandler}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;