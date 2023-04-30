import { Link } from "react-router-dom";

export default function Main() {
    return (
        <div className="w-96 mainContainer">
            <Link to="/main">
                <div className="h-64 bg-green-400 text-center text-black items-center flex justify-center text-2xl mb-10 hover:bg-green-300">
                    Card Recommend
                </div>
            </Link>
            <div className="chooseContainer flex w-full flex place-content-between">
                <Link to="/joinUser">
                    <div className="w-40 h-32 bg-green-400 text-black hover:bg-green-300 items-center flex justify-center">
                        회원가입
                    </div>
                </Link>
                <Link to="/login">
                    <div className="w-40 h-32 bg-green-400 text-black hover:bg-green-300 items-center flex justify-center">
                        로그인
                    </div>
                </Link>
            </div>
        </div>
    );
}