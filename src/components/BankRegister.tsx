//세션스토리지를 탐색해서 데이터가 없다 ? -> 로그인 안되어있으니 로그인 해주세요.
//만약 로그인 되어있다면 아이디를 저장한 후. 그 ID와 함께 계좌 개설 정보를 Firestore데이터로 저장한다.

export default function BankRegister() {
    

    return (
        <div className="border-4 border-green-500">
            <form>
                <div className="font-bold mb-[20px]">계좌 정보 입력하기</div>
                <div className="idDIv flex mb-8 items-center">
                    <label className="w-24 block text-center">
                        계좌 번호 :
                    </label>
                    <input
                        className="idInput bg-gray-300 mr-5 rounded-md w-[28rem] h-10 "
                        placeholder="EX) 448607-357-77723"
                        name="계좌 번호"
                    />
                </div>
                <div className="pwDIv flex items-center mb-8">
                    <label className="w-24 block text-center">은행명 :</label>
                    <input
                        className="id bg-gray-300 rounded-md w-[28rem] h-10"
                        placeholder="EX) 국민은행"
                        name="은행명"
                    />
                </div>
                <div className="pwDIv flex items-center">
                    <label className="w-24 block text-center">
                        예금주 성명 :
                    </label>
                    <input
                        className="id bg-gray-300 rounded-md w-[28rem] h-10"
                        placeholder="EX) 홍길동"
                        name="예금주 성명"
                    />
                </div>
                <button
                    className={`bg-green-400 hover:bg-green-300`}
                    type="submit"
                >
                    회원가입 완료
                </button>
            </form>
        </div>
    );
}