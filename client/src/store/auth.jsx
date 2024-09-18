import {  createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const [token, setToken]= useState(localStorage.getItem('token'));
    const[user , setUser]=useState("");
    const[services , setServices] = useState("");
    const[isLoading , setIsLoading]=useState(true);
    const authorizationToken =`Bearer ${token}`;

    const storeTokenInLS=(servertoken)=>{
        setToken(servertoken);
       return localStorage.setItem('token' , servertoken);
    };

let isloggedIn = !!token;
console.log("isloggedIN" , isloggedIn);

    //logout functionalities
    const LogoutUser=()=>{
       setToken("");
       localStorage.removeItem('token');
    };
    //JWT AUTHENTICATION- to get currently user data
const userAuthentication=async()=>{
   try {
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/api/auth/user",
        {
            method:"GET",
            headers:{
                Authorization:authorizationToken
            },
        }
    );
    if(response.ok){
        const data= await response.json();
        console.log('user data' , data.userData)
        setUser(data.userData);
        setIsLoading(false);
    }
    else{
        console.log("Error Fetching user data");
        setIsLoading(false);
    }
   } catch (error) {
    console.log("Error fetching user data")
   }
}
//to fetch the service data from the database
const getServices=async()=>{
try {
    const response = await fetch("http://localhost:3000/api/data/service",{
        method:"GET",
    });
    if(response.ok){
        const data= await response.json();
        console.log(data.msg);
        setServices(data.msg);
    }
} catch (error) {
    console.log(`service frontend error: ${error}`)
}
}
    useEffect(()=>{
        getServices();
        userAuthentication()
    },[])

    return <AuthContext.Provider value={{isloggedIn, storeTokenInLS , LogoutUser , user , services , authorizationToken , isLoading}}>
  {children}
    </AuthContext.Provider>
}

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
        
    }
    return authContextValue;
}