import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPolls, deletePoll } from './pollsListSlice';
import { selectUser } from '../users/usersSlice';
import { Link } from "react-router-dom";
import { List, Avatar, Button, Tooltip } from 'antd';
import {DeleteOutlined } from '@ant-design/icons';
import { AppPageHeader } from "../../components/AppPageHeader";

export function PollsList() {
    const polls = useSelector(selectPolls);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const addButtton = <Button key={1} type="primary">
        <Link to={'/create'} >
            Add Poll
</Link>
    </Button>
    const handleDelete = (id) => {
        dispatch(deletePoll(id))
    };
    return (
        <div>
            <AppPageHeader title="Polls" extra={addButtton} />
            <List
                itemLayout="horizontal"
                dataSource={polls}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            user && item.creator === user.nickname ? <Tooltip title="remove">
                                <Button type="primary" shape="circle" onClick={() => handleDelete(item.id)} icon={<DeleteOutlined />} />
                            </Tooltip> : null
                        ]}
                    >
                        <List.Item.Meta
                            title={<Link to={`/polls/${item.id}`}
                            >
                                {item.question}
                            </Link>}
                            avatar={<Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size="large">
                                {item.creator}
                            </Avatar>}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}