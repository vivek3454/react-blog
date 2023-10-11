import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/slices/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import toast from "react-hot-toast";
import { changeTheme } from "./store/slices/themeSlice";
import { getAllPost } from "./store/slices/postSlice";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTheme(`${localStorage.getItem("theme") || "light"}`));
    dispatch(getAllPost());
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        }
        else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  return !loading ? (
    <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main className="min-h-[90vh] bg-white dark:bg-black text-black dark:text-white">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="bg-white h-screen dark:bg-black">
      <Loader height={"90vh"} />
    </div>
  );
}

export default App;
