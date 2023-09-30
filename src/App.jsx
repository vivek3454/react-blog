import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer, PostForm } from "./components/index";
import { BrowserRouter, Outlet } from "react-router-dom";
import Loader from "./components/Loader";


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
        console.log("Error", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);


  return !loading ? (
    <div className="min-h-screen w-full flex flex-wrap content-between">
      <div className="w-full block">
        <BrowserRouter>
          <Header />
          <main className="min-h-[90vh]">
            {/* todo: <Outlet /> */}
            <PostForm />
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  ) : (<Loader />);
}

export default App;
