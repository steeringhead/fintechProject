import { collection, getDocs, query , where } from "firebase/firestore/lite";
import { db } from "../Firebase";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type loginData = {
    ID?: string
    password?: string
}

export default function Login() {   
    const [loginData, setLoginData] = useState<loginData>({});
    const userRef = collection(db, 'user')
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = sessionStorage.getItem("loginData");
        const initialData = storedData ? JSON.parse(storedData) : {};
        setLoginData(initialData);

        window.addEventListener("beforeunload", () => {
            sessionStorage.removeItem("loginData");
        });

        return () => {
            window.removeEventListener("beforeunload", () => {
                sessionStorage.removeItem("loginData");
            });
        };
    }, []);

    //입력하는 아이디와 비밀번호를 loginData라는 state값에 저장
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
        console.log(JSON.stringify(loginData));
    }

    async function handleLogin(e) {
        e.preventDefault();

        const userQuery = query(userRef, where("ID", "==", loginData.ID))
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0];
            const userData = userDoc.data();

            if (userData.password === loginData.password) {  
                sessionStorage.setItem("loginData", JSON.stringify(loginData));
                navigate("/main");                
            }
            else {
                alert("아이디의 비밀번호가 틀렸습니다.")
            }
        }
        else {
            alert("존재하지 않는 아이디 입니다.")
        }

        
    }

    function moveToJoin(str: string) {
       navigate({
           pathname: "/joinUser",
           search: `?str=${encodeURIComponent(str)}`,
       });
    }

    //로그인 버튼을 누르면, loginData의 내용을 firestore에서 확인해서 다르면 alert창 ,맞으면 APPmain페이지로 이동시켜야함
 
    return (
        <>
            <h1 className="mb-10">로그인</h1>
            <div className="loginContainer flex">
                <div className="loginBox">
                    <div className="idDIv flex mb-8 items-center">
                        <label className="w-24 block text-center">
                            아이디 :
                        </label>
                        <input
                            className="idInput bg-gray-300 mr-5 rounded-md w-[28rem] h-10 "
                            placeholder="ID입력"
                            name="ID"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="pwDIv flex items-center">
                        <label className="w-24 block text-center">
                            패스워드 :
                        </label>
                        <input
                            className="id bg-gray-300 rounded-md w-[28rem] h-10"
                            placeholder="패스워드"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button
                    className="bg-green-400 hover:bg-green-200"
                    onClick={handleLogin}
                >
                    로그인
                </button>
            </div>
            <div className="linked mt-10 flex w-[41rem] place-content-between">
                <button
                    className="bg-green-400 hover:bg-green-200"
                    onClick={() => moveToJoin("@google.com")}
                >
                    Google
                </button>
                <button
                    className="bg-green-400 hover:bg-green-200"
                    onClick={() => moveToJoin("@kakao.com")}
                >
                    Kakao
                </button>
                <button
                    className="bg-green-400 hover:bg-green-200"
                    onClick={() => moveToJoin("@naver.com")}
                >
                    Naver
                </button>
            </div>
        </>
    );
}