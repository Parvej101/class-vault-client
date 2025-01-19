import { createContext, useEffect, useState } from "react";
import app from "../../../firebase.config";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import axiosPublic from "../../hooks/useAxiosPublic";

const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [token, setToken] = useState(localStorage.getItem('access-token'))

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
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

    const login = (email, password) => {
        setLoading(true);
        try {
            signInWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false)
        }
    }
    const logout = () => signOut(auth);

    // Google login
    const googleProvider = new GoogleAuthProvider();
    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user)
        } finally {
            setLoading(false)
        }

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