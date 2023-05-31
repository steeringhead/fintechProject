import { Link, Navigate, useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";

interface items{
    items: string[];
    tag: string;
    
}

export const selectedAtom = atom({
    key: "selectedItem",
    default: "TOP 10",
});

export default function PageHeader({ items, tag }: items) {    
    const [selectedItem, setSelectedItem] = useRecoilState(selectedAtom);
    const check = (tag === "계좌 업무") ? "/bankMain" : "/main";
    const navigate = useNavigate();
    
    const handleClick = (item: string) => {
        if (item === "송금") {
            navigate('/Remit');
            return;
        }

        if (item === "계좌 등록") {
            navigate('/bankMain');
            return;
        }

        if (            
            item === "거래 내역" ||
            item === "지출 차트" 
        )
            return;
        setSelectedItem(item);
    };
    
    return (
        <div className="headerContainer flex justify-between bg-emerald-400 h-20 items-center">
            <ul className="flex ml-[50px]">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="ml-[50px] font-bold hover:bg-emerald-300"
                        onClick={() => handleClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <Link to={check}>
                <div className="mr-[100px] font-bold hover:bg-emerald-300 text-black">
                    {tag}
                </div>
            </Link>
        </div>
    );
}   