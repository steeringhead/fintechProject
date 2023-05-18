interface items{
    items: string[];
    tag: string;
}

export default function PageHeader({items,tag}: items) {
    
    return (
        <div className="headerContainer flex justify-between bg-indigo-400 h-20 items-center">
            <ul className="flex ml-[50px]">
                {items.map((item, index) => (
                    <li key={index} className="ml-[50px]">{item}</li>
                ))}
            </ul>
            <div className="mr-[100px]">
                {tag}
            </div>
        </div>        
    )
}   