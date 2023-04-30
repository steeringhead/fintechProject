import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
    id: string;
    password: string;
}

const initialState: LoginState = {
    id: '',
    password: ''
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginData : (state, action) => {
            state.id = action.payload.id;
            state.password = action.payload.password;            
        }        
    }
})

export const { setLoginData } = loginSlice.actions;
export default loginSlice.reducer;