import { useEffect, useState } from "react";
import { db } from "../Firebase"
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore/lite"

interface CardData {
    category: string;
    ranking: number;
}

export default function CardItem() {
    const [cardArr, setCardArr] = useState<CardData[]>([]);
    const cardData = collection(db, 'cardInfo');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(
                    collection(db, "cardInfo"),
                    where("category", "==", "hot"),
                    orderBy("ranking")
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => doc.data() as CardData);
                setCardArr(data);
                console.log(cardArr);
            } catch (error) {
                console.log("Error", error);
            }

        }

        fetchData();
    },[])
    
}