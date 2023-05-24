import { Link } from "react-router-dom";

export default function Main() {
    return (
        <div className="w-screen mainContainer mt-[100px] items-center">
            <Link to="/main">
                <div className="w-9/12 h-64 bg-green-400 text-center text-black items-center flex justify-center text-2xl mb-10 hover:bg-green-300 rounded-3xl">
                    Card Recommend
                </div>
            </Link>
            <div className="chooseContainer w-9/12 flex justify-between">
                <Link className="w-2/5" to="/joinUser">
                    <div className="h-32 bg-green-400 text-black hover:bg-green-300 items-center flex justify-center rounded-3xl">
                        회원가입
                    </div>
                </Link>
                <Link className="w-2/5" to="/login">
                    <div className="h-32 bg-green-400 text-black hover:bg-green-300 items-center flex justify-center rounded-3xl">
                        로그인
                    </div>
                </Link>
            </div>
        </div>
    );
}