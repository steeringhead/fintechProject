import CardItem from "../components/CardItem";
import PageHeader from "../components/PageHeader"
import { useRecoilValue } from "recoil";
import { selectedAtom } from "../components/PageHeader";
import { useEffect } from "react";



export default function AppMain() {
    const items = ["TOP 10", "마일리지", "포인트", "할인", "체크카드"];
    let selectedItem = useRecoilValue(selectedAtom);   
       

    return (
        <>
            <PageHeader items={items} tag="계좌 업무" />
            <div className="cardList">
                <CardItem info={selectedItem}></CardItem>
            </div>
        </>
    );
}