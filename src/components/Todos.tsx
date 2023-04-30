import { createStore } from "@reduxjs/toolkit";
import Contents from "./Contents";
import Control from "./Control";

interface State {
    contents: {
        id: number;
        title: string;
    }[];
}

type Action = {
    type: string;
    payload?: any;
};

function reducer(state: State = { contents: [] }, action: Action): State {
    if (state === undefined) {
        return {
            contents: [
                { id: 1, title: "HTML" },
                { id: 2, title: "CSS" },
            ],
        };
    }
    return {
        contents: [
            { id: 1, title: "HTML" },
            { id: 2, title: "CSS" },
        ],
    };
}

const value = createStore(reducer);

export default function Todos() {
    return (
        <>
            <h1> WEB </h1>
            <Contents></Contents>
            <Control></Control>
        </>
         
        
    )
}