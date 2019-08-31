import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './component/layout/appBar/AppBar';
import Tabs from './component/layout/Tabs';
import User from './component/layout/User';
import ShowRequestFor from './component/dialog/ShowRequestFor';
import ShowRequestResult from './component/dialog/ShowRequestResult';
import { State, selectUser } from './store/reducer';
import { selectIsLoggedIn } from './store/user';
import { connect } from 'react-redux';

interface AppProps {
    isLoggedIn: boolean
}

const App: React.FC<AppProps> = ({ isLoggedIn }) => (
    <React.Fragment>
        <CssBaseline />
        <AppBar />
        {isLoggedIn ?  <Tabs /> : <User />}
        <ShowRequestFor />
        <ShowRequestResult />
    </React.Fragment>
);

const ConnectedApp = connect(
    (state: State) => ({ isLoggedIn: selectIsLoggedIn(selectUser(state)) })
)(App);

export default ConnectedApp;