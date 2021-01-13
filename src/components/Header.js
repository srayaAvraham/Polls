import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {logout,selectUser} from '../features/users/usersSlice';
import {useHistory} from "react-router-dom";
import { Layout, Button, Avatar } from 'antd';

const { Header } = Layout;

function AppHeader() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout())
    }
    const handleLogin = () => {
        history.push("/login");
    }
    
    const button = user ? <div> <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size="large">
        {user.nickname}
    </Avatar><Button size="small"
        style={{ margin: '0 16px', verticalAlign: 'middle' }}
        onClick={handleLogout}>
            Logout
  </Button> </div> : <Button onClick={handleLogin} type="primary" size="small">
            Login
      </Button>
    return (
        <div>
            <Header style={{ textAlign: "start" }}>
                {button}
            </Header>
        </div>
    );
}

export default AppHeader;
