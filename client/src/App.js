import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.scss';
import Home from "./Pages/Home/Home";
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Navbar from './Components/Navbar/Navbar';
import LeftBar from './Components/LeftBar/LeftBar';
import RightBar from './Components/RightBar/RightBar';
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import "./style.scss";
import { DarkModeContext } from "./context/darkModeContext";
import Message from "./Pages/Messages/Message";

function App() {

  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (

      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode === true ? "dark" : "light"}`}>
          <Navbar />
          <div className="d-home" >
            <LeftBar />
            <div className="outlet">
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider >
    );
  };

  const ProtectedRoute = ({ children }) => {

    if (!currentUser) {
      return <Navigate to="/login" />;
    };
    return children;

  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>

      ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        },
        {
          path: "/message/:id",
          element: <Message />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
