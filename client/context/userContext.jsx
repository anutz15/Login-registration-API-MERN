import axios from "axios";
import { createContext, useState, useEffect} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {

    // at this point assume no one is logged in
    const [user,setUser] = useState(null);

    //  this will fireoff everytime a page renders
    useEffect(() =>{
        if(!user){
            axios.get('/profile').then(({data})=>{
                setUser(data)
            })
        }
    }, [])
    // empty array depedency line 18
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}