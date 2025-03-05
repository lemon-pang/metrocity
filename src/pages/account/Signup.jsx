import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './account.css';

const Signup = () => {
    const navigate = useNavigate();

    const usernameRef = useRef();
    const usernameErrRef = useRef();
    const nicknameRef = useRef();
    const nicknameErrRef = useRef();
    const userIdRef = useRef();
    const userIdErrRef = useRef();
    const passwordRef = useRef();
    const passwordErrRef = useRef();
    const emailRef = useRef();
    const emailErrRef = useRef();

    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleUsername = e => {
        setUsername(e.target.value);
        usernameErrRef.current.textContent = '';
    };
    const handleNickname = e => {
        setNickname(e.target.value);
        nicknameErrRef.current.textContent = '';
    };
    const handleUserId = e => {
        setUserId(e.target.value);
        userIdErrRef.current.textContent = '';
    };
    const handlePassword = e => {
        setPassword(e.target.value);
        passwordErrRef.current.textContent = '';
    };
    const handleEmail = e => {
        setEmail(e.target.value);
        emailErrRef.current.textContent = '';
    };
    const handleAddress = e => setAddress(e.target.value);
    const handlePhone = e => setPhone(e.target.value);

    const handleSignup = async () => {
        // 유효성 검사 
        let valid = true;

        const usernameValid = username?.trim() || '';
        const nicknameValid = nickname?.trim() || '';
        const userIdValid = userId?.trim() || '';
        const passwordValid = password?.trim() || '';
        const emailValid = email?.trim() || '';

        if(!usernameValid){
            usernameErrRef.current.textContent = '사용자 이름을 입력해주세요.';
            valid = false;
        }

        if(!nicknameValid){
            nicknameErrRef.current.textContent = '닉네임을 입력해주세요.';
            valid = false;
        }

        if(!userIdValid){
            userIdErrRef.current.textContent = '아이디를 입력해주세요.';
            valid = false;
        }

        if(!passwordValid){
            passwordErrRef.current.textContent = '비밀번호를 입력해주세요.';
            valid = false;
        }

        if(!emailValid){
            emailErrRef.current.textContent = '비밀번호를 입력해주세요.';
            valid = false;
        }

        if(!valid){
            if(!usernameValid) usernameRef.current.focus();
            else if(!nicknameValid) nicknameRef.current.focus();
            else if(!userIdValid) userIdRef.current.focus();
            else if(!passwordValid) passwordRef.current.focus();
            else if(!emailValid) emailRef.current.focus();
            return;
        }

        try{
            /* 
            // 백엔드 작업과 연계될 때
            // '/api/signup'는 API 호출을 위해 사용하는 앤드포인트.
            // 앤드포인트는 백엔드 측에서 지정해서 프론트 작업자에게 알려줌. 
            const response = await axios.post('/api/signup', {
                username,
                nickname,
                userId,
                password,
                email,
                address,
                phone
            });
            // 응답값의 상태코드가 200가 같으면. (200은 OK 상태를 가리킴)
            if(response.status === 200){
                // axios.post명령으로 정보가 잘 전달 되었을때 처리할 명령
                // 회원가입 완료 페이지로 이동 -> 리다이렉션 처리
            }
            */

            // 프론트로만 작업할 때 테스트를 위해 신규 사용자 정보를 세션에 저장하기 
            const userData = {
                id : new Date().getTime(),
                username,
                nickname,
                userId,
                password,
                email,
                address,
                phone
            }

            const storedUsers = sessionStorage.getItem('users');
            let users = [];
            if(storedUsers){
                try{
                    const parsed = JSON.parse(storedUsers);
                    users = Array.isArray(parsed) ? parsed : [];
                } catch(err) {
                    console.error('세션 유저 데이터 파싱 오류 : ', err);
                    users = [];
                }
            }
            users.push(userData);
            sessionStorage.setItem('users', JSON.stringify(users));
            navigate('/account/signup-complete');
        } catch(error){
            console.error('회원가입 실패 : ', error);
        }
    };

    return (
        <div className="account">
            <div className="account-inner">
                <h2>회원가입</h2>
                <div className='comment mb4'>*는 필수 입력 사항입니다.</div>
                <div className='input-name mb4'>
                    <input 
                        type='text' 
                        placeholder='*이름을 입력해주세요.' 
                        value={username}
                        onChange={handleUsername}
                        ref={usernameRef}
                    />
                    <div className='noti' ref={usernameErrRef}></div>
                </div>
                <div className='input-nickname mb4'>
                    <input 
                        type='text' 
                        placeholder='*닉네임을 입력해주세요.' 
                        value={nickname}
                        onChange={handleNickname}
                        ref={nicknameRef}
                    />
                    <div className='noti' ref={nicknameErrRef}></div>
                </div>
                <div className='input-id mb4'>
                    <input 
                        type='text' 
                        placeholder='*아이디를 입력해주세요.' 
                        value={userId}
                        onChange={handleUserId}
                        ref={userIdRef}
                    />
                    <div className='noti' ref={userIdErrRef}></div>
                </div>
                <div className='input-pw mb4'>
                    <input 
                        type='password' 
                        placeholder='*비밀번호를 입력해주세요.' 
                        value={password}
                        onChange={handlePassword}
                        ref={passwordRef}
                    />
                    <div className='noti' ref={passwordErrRef}></div>
                </div>
                <div className='input-email mb4'>
                    <input 
                        type='text' 
                        placeholder='*이메일을 입력해주세요.' 
                        value={email}
                        onChange={handleEmail}
                        ref={emailRef}
                    />
                    <div className='noti' ref={emailErrRef}></div>
                </div>
                <div className='input-address mb4'>
                    <input 
                        type='text' 
                        placeholder='주소를 입력해주세요.' 
                        value={address}
                        onChange={handleAddress}
                    />
                </div>
                <div className='input-phone mb12'>
                    <input 
                        type='text' 
                        placeholder='전화번호를 입력해주세요.' 
                        value={phone}
                        onChange={handlePhone}
                    />
                </div>
                <div className='btn-submit'>
                    <button onClick={handleSignup}>회원가입</button>
                </div>
            </div>
        </div>
    )
};

export default Signup;