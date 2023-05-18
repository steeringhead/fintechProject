import CardItem from "../components/CardItem";
import PageHeader from "../components/PageHeader"

export default function AppMain() {
    const items = ["TOP 10", "쇼핑", "포인트", "교통", "외식"];

    return (
        <>
            <PageHeader items={items} tag="계좌 업무" />
            <div className="cardList">
                <CardItem></CardItem>
            </div>
        </>
    )
}