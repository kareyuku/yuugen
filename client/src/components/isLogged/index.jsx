import { useEffect } from "react";
import { userData } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../auth/authSlice";

export default ({children}) => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        const check = async () => {
            if(localStorage.getItem('isLoggedIn')) {
                const isLogged = await userData();
                if(isLogged) dispatch(setCredentials({username: isLogged.username, avatar: isLogged.avatar, rank: isLogged.rank, groups: isLogged.groups}))
                else localStorage.removeItem('isLoggedIn')
            }
        }
        check();       
    }, [])
    return children;
}