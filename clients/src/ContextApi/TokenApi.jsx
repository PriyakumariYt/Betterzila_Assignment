import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
const authorizationToken = `Bearer ${token}`;

/*..........................
............................
TOKEN LOGIC GET IN FRONTEND 
......................................
........................*/
const storeTokenInLS = (serverToken) => {
  setToken(serverToken);
  localStorage.setItem("token", serverToken);
};

  const isLoggedIn = !!token;
/*..........................
............................
USER LOGOUT LOGIC
......................................
........................*/
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  /*..........................
............................
USER AUTHENTICATION LOGIC
......................................
........................*/
  const userAuthentication = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.msg);
        setIsLoading(false)
      } else {
        console.error("Error fetching user data");
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };



/*..........................
............................
NAVBAR RESPONSIVE LOGIC
......................................
........................*/
  function showMenu() {
    let menu = document.querySelector("#menu-bar");
    let navlink = document.querySelector("#navlinks");
    menu.classList.toggle("fa-times");
    navlink.classList.toggle("active");
  }

  useEffect(() => {
    userAuthentication();
  
  }, [token]);



  const contextValue = {
    isLoggedIn,
    token,
    storeTokenInLS,
    LogoutUser,
    user,
    showMenu,
    authorizationToken,
    isLoading,
   
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
