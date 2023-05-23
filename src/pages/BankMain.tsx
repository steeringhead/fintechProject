import BankRegister from "../components/BankRegister";
import PageHeader from "../components/PageHeader";

export default function BankMain() {
    const item = ["계좌 등록", "송금" , "거래 내역", "지출 차트"]

    return (
        <>
            <PageHeader items={item} tag={"신용카드 추천 화면"}></PageHeader>
            <BankRegister />
        </>
    );
}