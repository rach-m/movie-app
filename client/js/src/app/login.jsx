import { getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
export default function Login() {
    const firebaseConfig = {
        apiKey: "AIzaSyBElnw-clXXwntk-8fzxVOSihF47zWZ-_s",
        authDomain: "movie-app-76a3d.firebaseapp.com",
        projectId: "movie-app-76a3d",
        storageBucket: "movie-app-76a3d.appspot.com",
        messagingSenderId: "1057187379114",
        appId: "1:1057187379114:web:a9976997db35858e8e1dd3",
        measurementId: "G-9LRVF42F3G",
        databaseURL: "https://movie-app-76a3d-default-rtdb.firebaseio.com/",
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    useEffect(() => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential ? credential.accessToken : null;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // setUserInfo({credential, token, user})
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }, []);
    return (<div></div>);
}
