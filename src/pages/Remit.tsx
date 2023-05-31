// 내 아이디에 있는 계좌중  송금을 담당할 계좌 선택하기
// 보낼 계좌번호 조회 하여 있을 때만 가능하게 하도록 하고 비밀번호 기능 추가하기
// 잔액보다 송금액이 높으면 송금 불가능하게 하기
// 송금되면 받는 계좌 잔액 + 보내는 계좌 잔액

import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { collection, getDocs, query, where, DocumentData } from "firebase/firestore/lite";
import PageHeader from "../components/PageHeader";


export default function Remit() {   
    const [list, setList] = useState<DocumentData>([]);
    const accountData = collection(db, 'account');
    const item = ["계좌 등록", "송금", "거래 내역", "지출 차트"];
    
    useEffect(() => {
        fetchData();
        
    },[])

    async function fetchData() {
        const myData = sessionStorage.getItem("loginData");
        const userData = myData === null ? null : JSON.parse(myData);
        const loginData = userData.ID;

        const q = query(accountData, where("userId", "==", loginData));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => doc.data());
        setList(documents);
        console.log(list);
    }

    return (
        <>
            <PageHeader items={item} tag={"신용카드 추천 화면"}></PageHeader>
            <div className=" bg-emerald-200">
                {list.map((item: DocumentData) => (
                    <div className="ml-[100px] mb-[10px] flex w-6/12 font-bold text-2xl border-4 border-green-400 p-8">
                        <div className="w-6/12">
                            <div className="mb-[20px] mt-[10px]">{item.bankName}</div>
                            <div className="mb-[20px]">{item.accountNum}</div>
                        </div>
                        <button className="btn btn-primary mt-[20px] ml-[80px]">
                            송금
                        </button>
                    </div>
                ))}
            </div>
        </>
    );

}