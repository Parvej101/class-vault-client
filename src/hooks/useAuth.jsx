import { useContext } from "react";
import AuthContext from "../shared/AuthProvider/AuthProvider";


const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export default useAuth;