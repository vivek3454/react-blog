import React from "react";
import { Container, Logo, LogoutButton } from "../index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../store/themeSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const themeStatus = useSelector((state) => state.theme.status);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Favorite Posts",
      slug: "/favorite-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow shadow-gray-200 dark:shadow-lg dark:shadow-gray-900 sticky top-0 z-20 flex items-center h-20 bg-white dark:bg-black">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link>
              <Logo width="90px" />
            </Link>
          </div>
          <ul className="flex items-center ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="mr-1">
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block font-semibold px-6 py-2 duration-300 ${pathname === item.slug ? "bg-[#9ED5CB] text-black" : ""} hover:bg-[#9ED5CB] hover:text-black rounded-full`}
                  >{item.name}</button>
                </li>
              ) : null
            )}
            <li className="ml-2 cursor-pointer">
              {themeStatus === "light" &&
                <MdDarkMode onClick={() => dispatch(changeTheme(themeStatus === "light" ? "dark" : "light"))} size={24} />
              }
              {themeStatus === "dark" &&
                <MdLightMode onClick={() => dispatch(changeTheme(themeStatus === "light" ? "dark" : "light"))} size={24} />
              }
            </li>
            {authStatus && (
              <li className="ml-1">
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>

  );
};

export default Header;