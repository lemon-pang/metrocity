import { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../data';
import './account.css';

const Signin = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const idRef = useRef();
    const idErrRef = useRef();
    const pwRef = useRef();
    const pwErrRef = useRef();
    const matchErrRef = useRef();

    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    const handleChangId = (e) => {
        idErrRef.current.textContent = '';
        setUserId(e.target.value);
    };

    const handleChangPw = (e) => {
        pwErrRef.current.textContent = '';
        setUserPw(e.target.value);
    };

    const handleSubmit = async () => {
        // 유효성 검사 
        let valid = true;
        const idValid = idRef.current?.value.trim() || '';
        const pwValid = pwRef.current?.value.trim() || '';

        if(!idValid){
            idErrRef.current.textContent = '아이디를 입력해주세요.';
            valid = false;
        }

        if(!pwValid){
            pwErrRef.current.textContent = '비밀번호를 입력해주세요.';
            valid = false;
        }

        if(!valid){
            if(!idValid) idRef.current.focus();
            else if(!pwValid) pwRef.current.focus();
            return;
        }

        // 데이터 패치
        try{
            const response = await axios.get('/data/users.json');
            const userData = response.data.users;  
            const storedUsers = sessionStorage.getItem('users');
            const sessionUsers = storedUsers ? JSON.parse(storedUsers) : [];
            const combineUsers = [...sessionUsers, ...userData];

            const targetUser = combineUsers.find(
                user => user.userId === idValid && user.password == pwValid
            );

            if(targetUser){
                login(targetUser);
                navigate('/');
            } else {
                matchErrRef.current.textContent = '아이디 또는 비밀번호가 일치하지 않습니다.'
            }
        } catch (err) {
            console.error('로그인 데이터 로딩 실패 : ', err);
            matchErrRef.current.textContent = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'
        }
    };

    return (
        <div className="account">
            <div className='account-inner'>
                <h2>반갑습니다.</h2>
                <div className='input-id mb4'>
                    <input 
                        type='text' 
                        placeholder='아이디를 입력해주세요.' 
                        ref={idRef}
                        value={userId}
                        onChange={handleChangId}
                    />                    
                    <div className='noti' ref={idErrRef}></div>
                </div>
                <div className='input-pw mb12'>
                    <input 
                        type='password' 
                        placeholder='비밀번호를 입력해주세요.' 
                        ref={pwRef}
                        value={userPw}
                        onChange={handleChangPw}
                    />
                    <div className="noti" ref={pwErrRef}></div>
                </div>                
                <div className='btn-submit'>
                    <button onClick={handleSubmit}>로그인</button>                    
                    <div className='noti' ref={matchErrRef}></div>
                </div>
                <div className='find-btn'>
                    <p><Link to="/account/find-id">아이디 찾기</Link></p>
                    <p><Link to="/account/find-pw">비밀번호 찾기</Link></p>
                </div>
            </div>            
        </div>
    )
};

export default Signin;