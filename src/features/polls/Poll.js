import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAndUpdateUser } from './pollsListSlice';
import { selectUser } from '../users/usersSlice';
import { Redirect } from "react-router-dom";
import { Radio, Button } from 'antd';
import { PollStatistics } from './PollStatistics';
import { AppPageHeader } from "../../components/AppPageHeader";
import {NotFound} from "../../components/NotFound";
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    padding:'30px'
};
export function Poll({ match }) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const [choiceId, setChoiceId] = useState();
    const [showButton, setShowButton] = useState(true);
    const { pollId } = match.params;
    const poll = useSelector(state => {
        return state.polls.find(item => item.id === pollId)
    })

    const hendelOnChange = (e) => {
        setChoiceId(e.target.value)
        setShowButton(false)
    }

    const saveVote = () => {
        dispatch(voteAndUpdateUser({ pollId, choiceId, user }))
    }

    if (!user) {
        return <Redirect push to={'/login'} />
    }

    if (!poll) {
        return <NotFound/>
    }
    const isVote = (user && user.pollsVote.includes(poll.id))
    return (
        <div>
            <AppPageHeader title="Poll" subTitle={poll.question} path={"/"}/>
            {!isVote ? <> <Radio.Group block onChange={hendelOnChange} >
                {poll.choices.map(item => <Radio key={item.id} style={radioStyle} value={item.id}>
                    {item.choice}
                </Radio>)}

            </Radio.Group>
                <Button disabled={showButton} type="primary" size="large" onClick={saveVote} style={{margin: '30px', display: 'block'}}>
                    vote
        </Button></>
                :
                <PollStatistics choices={poll.choices} />
            }
        </div>
    );
}
