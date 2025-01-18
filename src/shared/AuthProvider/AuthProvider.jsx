import { createContext, useEffect, useState } from "react";
import app from "../../../firebase.config";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "firebase/auth";

const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    const register = async (email, password, displayName, photoURL) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName, photoURL });
            setUser(userCredential.user);
        } finally {
            setLoading(false);
        }
    };

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);

    // Google login
    const googleProvider = new GoogleAuthProvider();
    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        setUser(result.user);
    }

    const authInfo = {
        user,
        loading,
        register,
        login,
        logout,
        loginWithGoogle,
    }

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>

}
export { AuthProvider };
export default AuthContext;