import { Link } from "react-router-dom";
import './Gnb.css';

const Gnb = () => {
    return(
        <nav id="Gnb">
            <ul>
                <li><Link to=''>EXCLUSIVE</Link></li>
                <li><Link to=''>WOMEN</Link></li>
                <li><Link to=''>MEN</Link></li>
                <li><Link to=''>JEWELRY</Link></li>
                <li><Link to=''>WATCH</Link></li>
                <li><Link to=''>COLLECTION</Link></li>
                <li><Link to=''>ABOUT M</Link></li>
                <li><Link to=''>MEMBERSHIP</Link></li>
            </ul>
        </nav>
    )
};

export default Gnb;