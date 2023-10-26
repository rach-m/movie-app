import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../services/firebase";
import { useEffect } from "react";
import { onValue, set, ref, get } from "firebase/database";
import { db } from "../services/firebase";

const Login = ({ setUserInfo }) => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const query = ref(db, "users/" + user.uid);
      onValue(
        query,
        (snapshot) => {
          if (snapshot.exists()) {
          } else {
            set(ref(db, "users/" + user.uid), {
              userId: user.uid,
            });
          }
        },
        {
          onlyOnce: true,
        }
      );
      setUserInfo(user);
    }
  }, [user, loading]);

  return (
    <div>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
