import {auth,logout} from "../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Logout = ({setUserInfo})=>{

  const [user, loading, error] = useAuthState(auth);

useEffect(()=>{
  if (!user){
    setUserInfo(null)
  }
}, [user, loading])
  return(
    <div>
       <button className="login-with-google-btn" onClick={() => {
        setUserInfo(null)
        logout()
        }}>Log Out</button>
    </div>
  )
}

export default Logout