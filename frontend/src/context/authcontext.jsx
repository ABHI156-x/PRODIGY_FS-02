import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

// 1. Create context
const UserContext = createContext(null);

// 2. Provider component
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading , setLoading ] = useState(true)
  

  useEffect(()=>{
    const verifyUser = async () =>{
      try{

          const token =localStorage.getItem('token')
          if(token){
          const response = await axios.get('http://localhost:5000/api/auth/verify' ,{
            headers: {
              "Authorization" : `Bearer ${token}`
            }
          })
          if(response.data.success){
            setUser(response.data.user)
          }
        } else {
          setUser(null)
        }  
      } catch(error) {
         if(error.response && error.response.data.error){
          setUser(null);
          
         }
      } finally{
        setLoading(false)
      }
    }
    verifyUser()
  },  [])

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom hook
export const useAuth = () => useContext(UserContext);

export default AuthContextProvider;
