import { useSelector } from "react-redux"

export default ({
    children, requiredRank, failRedirect
}) => {

    const user = useSelector(state => state.auth);

    console.log(user);
    
    if(!user?.isLoggedIn) return <></>
    if(requiredRank && user?.rank !== requiredRank) return <></>

    return children
}