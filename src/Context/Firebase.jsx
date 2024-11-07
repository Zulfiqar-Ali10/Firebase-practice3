// FirebaseProvider.js
import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBBizoruyWjGVKsB_Rx1uefvIyd79dM1Tk",
    authDomain: "fir-app4-project.firebaseapp.com",
    projectId: "fir-app4-project",
    storageBucket: "fir-app4-project.firebasestorage.app",
    messagingSenderId: "942627051141",
    appId: "1:942627051141:web:3e6ca8a9f69683700a3bec",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            setUser(user || null);
        });
        return () => unsubscribe();
    }, []);

    const signupUserWithEmailAndPassword = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.error("Signup error:", error.message);
        }
    };

    const signinUserWithEmailAndPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.error("Signin error:", error.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(firebaseAuth, googleProvider);
        } catch (error) {
            console.error("Google signin error:", error.message);
        }
    };

    const handleCreateNewListing = async (name, isbn, price) => {
        if (!user) {
            console.error("No user is logged in");
            return;
        }
        try {
            return await addDoc(collection(firestore, "book"), {
                name,
                isbn,
                price,
                userId: user.uid,
                userEmail: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });
        } catch (error) {
            console.error("Error creating listing:", error.message);
        }
    };

    const isloggedIn = !!user;

    return (
        <FirebaseContext.Provider
            value={{
                signupUserWithEmailAndPassword,
                signinUserWithEmailAndPassword,
                handleCreateNewListing,
                signInWithGoogle,
                isloggedIn,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};
