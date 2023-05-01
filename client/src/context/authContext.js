import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );


    const login = async (inputs) => {

        const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, inputs);

        setCurrentUser(res.data);
    };
    const register = async (input) => {

        const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, input);

        setCurrentUser(res.data);
    };

    const logout = async () => {
        setCurrentUser(null);
        localStorage.removeItem("accessToken");
    };


    useEffect(() => {

        localStorage.setItem("user", JSON.stringify(currentUser));

    }, [currentUser]);



    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>



    );
};