import axios from "axios";
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [update, setUpdate] = useState("");
    
    useEffect(() => {
        if(currentUser === null || update){
            axios.get("/current_user").then(({ data }) => {
                setCurrentUser(data && data[0]);
                setUpdate("");
            }) 
        }
    }, [update]);

    return(
        <UserContext.Provider value={{ currentUser, setCurrentUser, setUpdate }}>
            {children}
        </UserContext.Provider>
    )
}