import { createSlice } from '@reduxjs/toolkit'
import  {vote}  from '../polls/pollsListSlice'
const initialState = {
    allUsers: [],
    loginUser: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            const user = state.allUsers.find(user => user.nickname === action.payload.nickname);
            if (!user) {
                state.allUsers.push({ ...action.payload, pollsVote: [] });
                state.loginUser = { ...action.payload, pollsVote: [] };
            } else {
                state.loginUser = user;
            }
        },
        logout: (state, action) => {
            state.loginUser = null;
        },
    },
    extraReducers: {
        [vote]: (state, action) => {
            const user = state.allUsers.find(user => user.nickname === action.payload.user.nickname);
            if (!user.pollsVote.includes(action.payload.pollId)) {
                if (user) {
                    user.pollsVote.push(action.payload.pollId)
                }
                if (action.payload.user.nickname === state.loginUser.nickname) {
                    state.loginUser.pollsVote.push(action.payload.pollId)
                }
            }
        }
    }
})

export const { login, logout } = usersSlice.actions;

export const selectUser = state => state.users.loginUser;

export default usersSlice.reducer