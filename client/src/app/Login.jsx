import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../services/firebase";
import { useEffect } from "react";


const Login = ({setUserInfo}) => {

const [user, loading, error] = useAuthState(auth);

useEffect(()=>{
  if (user){
    setUserInfo(user)
  }
}, [user, loading])

  return (
    <div>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>Login with Google</button>      
    </div>
  )
}

export default Login;