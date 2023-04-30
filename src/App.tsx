import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import './App.css'
import JoinUser from './pages/JoinUser'
import Login from './pages/Login'
import AppMain from './pages/AppMain'
import { Provider } from 'react-redux'
import { store } from './globalobject/store'

function App() {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Main></Main>} />
                    <Route path="/joinUser" element={<JoinUser></JoinUser>} />
                    <Route path="/login" element={<Login></Login>} />
                    <Route path="/main" element={<AppMain></AppMain>} />
                </Routes>
            </Provider>
        </BrowserRouter>
    );
}

export default App
