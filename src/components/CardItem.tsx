import { useEffect, useState } from "react";
import { db } from "../Firebase"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore/lite"

interface CardData {
    category: string;
    ranking: number;
    url: string;
    name: string;
    enterprise: string;
}

interface infoList{
    info: string;
}

export default function CardItem({info}: infoList) {
    const [cardArr, setCardArr] = useState<CardData[]>([]);
    const cardData = collection(db, 'cardInfo');
    

    useEffect(() => {
        console.log(info)
        const fetchData = async () => {
            try {
                const q = query(
                    collection(db, "cardInfo"),
                    where("category", "==", info)
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => doc.data() as CardData);  
                data.sort((a, b) => a.ranking - b.ranking);
                setCardArr(data);
                console.log(cardArr);
            } catch (error) {
                console.log("Error", error);
            }

        }

        fetchData();
    }, [info])
    
    return (
        <div className="max-w-[1280px]">
            {cardArr.map((data, index) => (
                <div className="max-w-[1280px] mt-[20px]  flex items-center bg-indigo-200 p-8">
                    <div className="ml-[30px] mr-[50px] font-bold text-[30px]">{index + 1}</div>
                    <img className="w-52 h-52 mr-[50px]" src={data.url} />
                    <div>
                        <div className="mb-[10px] font-bold text-[30px]">{data.name}</div>
                        <div>{data.enterprise}</div>
                    </div>
                </div>
            ))}
        </div>
    );
    
    
}