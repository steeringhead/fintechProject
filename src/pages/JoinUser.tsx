import { addDoc, collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../Firebase";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// User정보 타입 지정
type User = {
    ID: string;
    password: string;
    confirmPassword: string;
    phone: string;
    email: string;
};

type FormData = {
    ID?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    email?: string;
};

export default function JoinUser() {
    const userRef = collection(db, 'user');
    const [formData, setFormData] = useState<FormData>({});
    const [checkPW, setCheckPW] = useState<boolean>(false);
    const [checkEmail, setCheckEmail] = useState<boolean>(false);
    const { search } = useLocation();
    const queryData = new URLSearchParams(search);
    const str = queryData.get("str") || "";

    useEffect(() => {
        console.log(str)
        const idInput = document.getElementById("idInput") as HTMLInputElement;
        console.log(idInput)
        const emailInput = document.getElementById(
            "emailInput"
        ) as HTMLInputElement;

        if (idInput) {
            idInput.value = str;
        }

        if (emailInput) {
            emailInput.value = str;
        }
    }, [str]);
    
    
   
    //회원가입 form에 입력하는 데이터를 formData에 저장
    function handleChange(e : ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });        
    }

    //Submit시에 firestore에 데이터 저장 및 입력창 초기화
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const emailRef = query(userRef, where("email", "==", formData.email))
        if (emailRef === null) return;
        
        getDocs(emailRef).then((queryEmail) => {
            if (queryEmail.size > 0) {
                setCheckEmail(true);
                return;
            }            
        }).catch((error) => {console.log("이메일 중복 에러 발생"), error})

        if (formData.password !== formData.confirmPassword) {
            setCheckPW(true);
        }       
        
        else {
            addDoc(userRef, formData as User);
            console.log(formData);
            setFormData({
                ID: "",
                password: "",
                confirmPassword: "",
                phone: "",
                email: "",
            });
            setCheckPW(false);
            setCheckEmail(false);
        }
    }
    
    function handleExistent() {
        //클릭하면 FireBase의 user의 ID를 순회해서 존재하면 alert창을 뜨게 해보자.
        const queryRef = query(userRef, where("ID", "==", formData.ID));
        getDocs(queryRef)
            .then((querySnapshot) => {
                console.log(querySnapshot)
                if (querySnapshot.size > 0) {
                    alert("이미 사용중인 아이디 입니다.")
                }
                else {
                    alert("사용 가능한 아이디 입니다.")
                }
            })
            .catch((error) => {
                console.log("아이디 중복 기능 에러 발생" , error)
            })
    }    
    
    return (
        <>
            <h1 className="mb-10">회원 가입</h1>
            <div className="form container">
                <form onSubmit={handleSubmit}>
                    <div className="idDiv flex mb-5 items-center">
                        <label className="w-32 block">아이디 :</label>
                        <input
                            id="idInput"
                            className="idInput bg-gray-300 mr-5 rounded-md w-2/5 h-10"
                            placeholder="ID입력"
                            onChange={handleChange}
                            name="ID"
                            value={formData.ID}
                        />
                        <button
                            className="bg-green-400 hover:bg-green-300"
                            onClick={handleExistent}
                            type="button"
                        >
                            중복 확인
                        </button>
                    </div>
                    <div className="pwDiv flex mb-5 items-center">
                        <label className="w-32 block">패스워드 :</label>
                        <input
                            className="pwInput bg-gray-300 rounded-md w-2/5 h-10"
                            placeholder="패스워드"
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                        />
                    </div>
                    <div className="pw2Div flex mb-5 items-center">
                        <label className="w-32 block">패스워드 확인 :</label>
                        <input
                            className="pwInput2 bg-gray-300 rounded-md w-2/5 h-10"
                            placeholder="패스워드 확인"
                            onChange={handleChange}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                        />
                        <div
                            className={`${
                                checkPW ? "block" : "hidden"
                            } ml-8 bg-red-300`}
                        >
                            패스워드가 일치하지 않습니다 !
                        </div>
                    </div>
                    <div className="hpDIv flex mb-5 items-center">
                        <label className="w-32 block">휴대폰 번호 :</label>
                        <input
                            className="hpInput bg-gray-300 rounded-md w-2/5 h-10"
                            placeholder="휴대폰 번호"
                            onChange={handleChange}
                            name="phone"
                            value={formData.phone}
                        />
                    </div>
                    <div className="emailDiv flex mb-5 items-center">
                        <label className="w-32 block">이메일 주소 :</label>
                        <input
                            id="emailInput"
                            className="emailInput bg-gray-300 rounded-md w-2/5 h-10"
                            placeholder="이메일 주소"
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                        />
                        <div
                            className={`${
                                checkEmail ? "block" : "hidden"
                            } ml-8 bg-red-300`}
                        >
                            이미 존재하는 이메일 주소입니다.
                        </div>
                    </div>
                    <button
                        className={`bg-green-400 hover:bg-green-300`}
                        type="submit"
                    >
                        회원가입 완료
                    </button>
                </form>
            </div>
        </>
    );
}