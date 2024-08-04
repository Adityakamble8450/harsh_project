import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setuser] = useState({ user: null, token: "" });

    // Update Axios headers when the token changes
    useEffect(() => {
        if (user.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [user.token]);

    // Load user data from localStorage on initial render
    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parsedData = JSON.parse(data);
            setuser({
                user: parsedData.user,
                token: parsedData.token,
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setuser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};

export default UserContextProvider;
