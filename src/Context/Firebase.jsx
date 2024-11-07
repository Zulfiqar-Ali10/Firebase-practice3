import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";


const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBBizoruyWjGVKsB_Rx1uefvIyd79dM1Tk",
    authDomain: "fir-app4-project.firebaseapp.com",
    projectId: "fir-app4-project",
    storageBucket: "fir-app4-project.firebasestorage.app",
    messagingSenderId: "942627051141",
    appId: "1:942627051141:web:3e6ca8a9f69683700a3bec"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);


    const signupUserWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const signinUserWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const siginWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider)
    }

    const isloggedIn = user ? true : false;

    return (
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword,
            signinUserWithEmailAndPassword,
            siginWithGoogle,
            isloggedIn
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}