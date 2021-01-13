import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import {
    userVote
} from '../users/usersSlice';
export const pollsSlice = createSlice({
    name: 'polls',
    initialState: [],
    reducers: {
        vote: (state, action) => {
            const poll = state.find(item => item.id === action.payload.pollId);
            if (poll) {
                const choice = poll.choices.find(item => item.id === action.payload.choiceId);
                if (choice) {
                    choice.vote += 1;
                }
            }
        },
        addPoll: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: ({ question, choices, user }) => {
                const id = nanoid()
                return {
                    payload: {
                        id,
                        question,
                        creator: user.nickname,
                        choices: choices.map((choice, i) => {
                            return {
                                id: i,
                                vote: 0,
                                choice
                            }
                        })
                    }
                }
            }
        },
        deletePoll: (state, action) => {
            for( let i = 0; i < state.length; i++){ 
                if ( state[i].id === action.payload) { 
                    state.splice(i, 1); 
                    // break;
                }
            }
        }
    },
});

const { vote } = pollsSlice.actions;
export const voteAndUpdateUser = ({ pollId, choiceId, user }) => async dispatch => {
    try {
        await dispatch(vote({ pollId, choiceId }))
        dispatch(userVote({ pollId, user }))
    } catch (e) {
        return console.error(e.message);
    }
}
export const { addPoll, deletePoll } = pollsSlice.actions;
export const selectPolls = state => state.polls;

export default pollsSlice.reducer;
