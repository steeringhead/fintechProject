import { atom, useRecoilState } from "recoil";

interface items{
    items: string[];
    tag: string;
}

export const selectedAtom = atom({
    key: "selectedItem",
    default: "",
});

export default function PageHeader({ items, tag }: items) {    
    const [selectedItem, setSelectedItem] = useRecoilState(selectedAtom);
    
    const handleClick = (item: string) => {
        setSelectedItem(item);
    };
    
    return (
        <div className="headerContainer flex justify-between bg-indigo-400 h-20 items-center">
            <ul className="flex ml-[50px]">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="ml-[50px] font-bold hover:bg-indigo-300"
                        onClick={() => handleClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <div className="mr-[100px] font-bold hover:bg-indigo-300">
                {tag}
            </div>
        </div>
    );
}   