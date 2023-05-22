import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import './App.css'
import JoinUser from './pages/JoinUser'
import Login from './pages/Login'
import AppMain from './pages/AppMain'
import { RecoilRoot,atom,selector,useRecoilState,useRecoilValue } from 'recoil'

function App() {

    return (
        <BrowserRouter>
            <RecoilRoot>
                <Routes>
                    <Route path="/" element={<Main></Main>} />
                    <Route path="/joinUser" element={<JoinUser></JoinUser>} />
                    <Route path="/login" element={<Login></Login>} />
                    <Route path="/main" element={<AppMain></AppMain>} />
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    );
}

export default App
