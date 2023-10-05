import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
import Loader from "./components/Loader";
import toast from "react-hot-toast";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
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


  return !loading ? (
    <div className="min-h-screen w-full flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main className="min-h-[90vh]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (<Loader height={"90vh"} />);
}

export default App;
