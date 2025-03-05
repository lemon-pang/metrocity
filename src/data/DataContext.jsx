import { createContext, useState, useEffect } from "react";

export const InitContext = createContext();

export const InitProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const sessionUsers = sessionStorage.getItem('users');
        if(sessionUsers){
            try{
                setUsers(JSON.parse(sessionUsers));
            } catch(err){
                console.error('세션 유저 데이터 파싱 오류 : ', err);
            };
        }
    },[]);

    return (
        <InitContext.Provider value={{users, setUsers}}>
            {children}
        </InitContext.Provider>
    )
};