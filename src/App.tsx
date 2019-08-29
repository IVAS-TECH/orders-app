import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './component/layout/appBar/AppBar';
import Tabs from './component/layout/Tabs';
import SignIn from './component/page/SignIn';
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
        {isLoggedIn ?  <Tabs /> : <SignIn />}
    </React.Fragment>
);

const ConnectedApp = connect(
    (state: State) => ({ isLoggedIn: selectIsLoggedIn(selectUser(state)) })
)(App);

export default ConnectedApp;