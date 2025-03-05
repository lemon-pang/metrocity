import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../data";
import './HeadUtils.css';

const HeadUtils = () => {
    const {user, logout} = useContext(AuthContext);

    return(
        <div id="HeadUtils">
            <div>
                {
                    user 
                        ? <p onClick={logout}>Logout</p>
                        : <Link to='/account/signin'>Login</Link>
                }
            </div>
            <div><Link to='/account/signup'>Join</Link></div>
            <div><Link to='/'>Cart(0)</Link></div>
            <div><Link to='/'>Search</Link></div>
        </div>
    )
};

export default HeadUtils;