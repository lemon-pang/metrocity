import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FindPw = () => {
    const nameRef = useRef();
    const nameErrRef = useRef();
    const emailRef = useRef();
    const emailErrRef = useRef();
    const idRef = useRef();
    const idErrRef = useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [foundPw, setFoundPw] = useState('');
    const [errorMsg, setErrorMsg] = useState('');


    const handleChangeName = (e) => {
        nameErrRef.current.textContent = '';
        setFoundPw('');
        setErrorMsg('');
        setName(e.target.value);
    };

    const handleChangeEmail = (e) => {
        emailErrRef.current.textContent = '';
        setFoundPw('');
        setErrorMsg('');
        setEmail(e.target.value);
    };

    const handleChangeId = (e) => {
        idErrRef.current.textContent = '';
        setFoundPw('');
        setErrorMsg('');
        setId(e.target.value);
    };

    const handleFindPW = async () => {
        setFoundPw('');
        setErrorMsg('');
        
        let valid = true;
        const nameValue = name.trim();
        const emailValue = email.trim();
        const idValue = id.trim();

        if(!nameValue){
            nameErrRef.current.textContent = '사용자 이름을 입력해주세요.';
            valid = false;
        }

        if(!emailValue) {
            emailErrRef.current.textContent = '올바른 이메일 주소를 입력해주세요.';
            valid = false;
        }

        if(!idValue) {
            idErrRef.current.textContent = '아이디를 입력해주세요.';
            valid = false;
        }

        if(!valid){
            if(!nameValue) nameRef.current.focus();
            else if(!emailValue) emailRef.current.focus();
            else if(!idValue) emailRef.current.focus();
            return;
        }

        try {
            const response = await axios.get('/data/users.json');
            const userData = response.data.users;  const storedUsers = sessionStorage.getItem('users');
            const sessionUsers = storedUsers ? JSON.parse(storedUsers) : [];
            const combineUsers = [...sessionUsers, ...userData];          

            const targetUser = combineUsers.find(
                user => user.username === nameValue && user.email == emailValue && user.userId == idValue
            );

            if(targetUser){
                setFoundPw(targetUser.password);
            } else {
                setErrorMsg('입력하신 정보와 일치하는 회원이 없습니다.');
            }
        } catch (error) {
            console.error("비밀번호 찾기 실패:", error);
            setErrorMsg("비밀번호 찾기 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="account">
            <div className="account-inner">
                <h2>비밀번호 찾기</h2>
                <div className='input-name mb4'>
                    <input 
                        type='text' 
                        placeholder='이름을 입력해주세요.' 
                        value={name}
                        onChange={handleChangeName}
                        ref={nameRef}
                    />                    
                    <div className='noti' ref={nameErrRef}></div>
                </div>
                <div className='input-email mb4'>
                    <input 
                        type='text' 
                        placeholder='이메일을 입력해주세요.' 
                        value={email}
                        onChange={handleChangeEmail}
                        ref={emailRef}
                    />                    
                    <div className='noti' ref={emailErrRef}></div>
                </div>
                <div className='input-id mb12'>
                    <input 
                        type='text' 
                        placeholder='아이디를 입력해주세요.'
                        value={id}
                        onChange={handleChangeId}
                        ref={idRef}
                    />                    
                    <div className='noti' ref={idErrRef}></div>
                </div>
                <div className="btn-submit">
                    <button onClick={handleFindPW}>비밀번호 찾기</button>
                </div>
                <div className='find-btn'>
                    <p><Link to="/account/signin">로그인 바로가기</Link></p>
                    <p><Link to="/account/find-id">아이디 찾기</Link></p>
                </div>
                <div className="result">
                    {foundPw && 
                    <p className="found">회원님의 비밀번호는 <span>{foundPw}</span>입니다.</p>}   
                    {errorMsg &&
                    <p className="error">{errorMsg}</p>}
                </div>
            </div>
        </div>
    )
};

export default FindPw;