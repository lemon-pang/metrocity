import { Link } from "react-router-dom";
import './account.css';

const SignupComplet = () => {
    return (
        <div className="account">
            <div className="account-inner">
                <div className="SignupComplet-msg">
                    회원가입이 완료되었습니다. <br />
                    로그인 후 사용해주세요. 
                </div>
                <div className="go-signin">
                    <Link to='/account/signin'>로그인 바로가기</Link>
                </div>
            </div>
        </div>
    )
};

export default SignupComplet;