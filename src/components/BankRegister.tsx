//세션스토리지를 탐색해서 데이터가 없다 ? -> 로그인 안되어있으니 로그인 해주세요.
//만약 로그인 되어있다면 아이디를 저장한 후. 그 ID와 함께 계좌 개설 정보를 Firestore데이터로 저장한다.


import { addDoc, collection, query, where, getDocs, DocumentData } from "firebase/firestore/lite";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db } from "../Firebase";


interface formData{
    accountNum: string;
    bankName: string;
    ownerName: string;
    userId: string;
}

export default function BankRegister() {
    const [btn, setBtn] = useState(false);
    const [id, setId] = useState("");
    const [acList, setAcList] = useState<DocumentData[]>([]);
    const [formData, setFormData] = useState<formData>({
        accountNum: "",
        bankName: "",
        ownerName: "",
        userId: "",
    });

    const accountRef = collection(db, 'account');
     

    useEffect(() => {
        if (sessionStorage.getItem("loginData")) {            
            setBtn(true);            
        }

        else {
            setBtn(false)
        }   

        const temp = sessionStorage.getItem("loginData");
        const tempData = (temp === null) ? "" : JSON.parse(temp as string);
        setId(tempData.ID);
        fetchData();
        console.log(sessionStorage.getItem("loginData"));    
        console.log(id)
    },[id,acList])

    function handleChange(e : ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if (formData.accountNum === null || formData.bankName === null || formData.ownerName === null) return;
        else {
                        
            const updateFormData = { ...formData, userId: id , "잔액" : "0"};            
            addDoc(accountRef, updateFormData as formData);
            setFormData({ accountNum: "", bankName: "", ownerName: "", userId: id });
            setAcList([]);
        }        
    }

    async function fetchData() {   
        const q = query(accountRef, where("userId", "==", id));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => doc.data());
        if (documents.length == acList.length) return;
        setAcList(documents);
        console.log(acList);
    }

    return (
        <div className="bg-emerald-200">
            <form onSubmit={handleSubmit} className="p-8 font-bold text-[20px]">
                <div className="mb-[20px]">계좌 정보 입력하기</div>
                <div className="idDIv flex mb-8 items-center">
                    <label className="w-30 block text-center mr-[10px]">
                        계좌 번호 :
                    </label>
                    <input
                        className="idInput bg-gray-300 mr-5 rounded-md w-[28rem] h-10 bg-sky-50"
                        placeholder="EX) 448607-357-77723"
                        onChange={handleChange}
                        name="accountNum"
                        value={formData.accountNum}
                    />
                </div>
                <div className="pwDIv flex items-center mb-8">
                    <label className="w-24 block text-center mr-[10px]">
                        은행명 :
                    </label>
                    <input
                        className="id bg-gray-300 rounded-md w-[28rem] h-10 bg-sky-50"
                        placeholder="EX) 국민은행"
                        name="bankName"
                        onChange={handleChange}
                        value={formData.bankName}
                    />
                </div>
                <div className="pwDIv flex items-center">
                    <label className="w-24 block text-center mr-[10px]">
                        예금주 성명 :
                    </label>
                    <input
                        className="id bg-gray-300 rounded-md w-[28rem] h-10 bg-sky-50"
                        placeholder="EX) 홍길동"
                        name="ownerName"
                        onChange={handleChange}
                        value={formData.ownerName}
                    />
                </div>
                <button
                    className="bg-emerald-300 hover:bg-emerald-100 ml-[600px]"
                    type="submit"
                >
                    {btn ? "등록" : "로그인 필요"}
                </button>
            </form>
            <div className="acList text-[20px]">
                {acList.map((item) => (
                    <div className="p-8">
                        <div className="mb-[10px]">은행명 : {item.bankName}</div>
                        <div className="mb-[10px]">계좌번호 : {item.accountNum}</div>
                        <div className="mb-[10px]">예금주 : {item.ownerName}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}