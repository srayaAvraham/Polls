import React from 'react';
import { PollsList } from './features/polls/PollsList';
import { AddPoll } from './features/polls/AddPoll';
import {Poll} from './features/polls/Poll'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Login } from './features/users/Login';
import { Layout} from 'antd';
import AppHeader from './components/Header'
const {Content, Footer } = Layout;
function App() {
  return (
    <div className="App">
            <Router>
    <Layout className="layout">
    <AppHeader/>
    <Content style={{ padding: '0 100px',minHeight: '85vh' }}>
      <div className="site-layout-content">
      <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <PollsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/polls/:pollId" component={Poll} />
          <Route exact path="/create" component={AddPoll} />
          <Route exact path="/login" component={Login} />
          <Redirect to="/" />
        </Switch>

      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}></Footer>
  </Layout>
  </Router>

    </div>
  );
}

export default App;
