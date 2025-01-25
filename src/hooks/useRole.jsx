import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useRole = () => {
    const { user } = useAuth();
    const email = user?.email;


    const useAxiosSecure = axiosSecure();

   
    // Fetch the user's role
    const {
        data: role,
        isLoading: isRoleLoading,
        isError: isRoleError,
    } = useQuery({
        queryKey: ['userRole', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${email}`);
            console.log("Fetched Role:", res);
            return res.data.role; // e.g., 'teacher', 'admin', etc.
        },
        enabled: !!email, // Fetch only if email is available
    });

    // Fetch role-specific data only when role is successfully fetched
    const {
        data: roleData,
        isLoading: isRoleDataLoading,
        isError: isRoleDataError,
    } = useQuery({
        queryKey: ['roleData', role],
        queryFn: async () => {
            if (role === 'teacher') {
                const res = await axiosSecure.get('/dashboard/teacher');
                return res.data;
            } else if (role === 'admin') {
                const res = await axiosSecure.get('/dashboard/admin');
                return res.data;
            } else if (role === 'user') {
                const res = await axiosSecure.get('/dashboard');
                return res.data;
            } else {
                return null; // No operation for other roles
            }
        },
        enabled: !!role, // Fetch role data only if role is defined
    });

    // Debugging logs
    console.log("Email:", email);
    console.log("Role:", role);

    // Return the role and roleData, with loading state
    return {
        role,
        roleData,
        isLoading: isRoleLoading || isRoleDataLoading,
        isRoleError,
        isRoleDataError,
    };
};

export default useRole;