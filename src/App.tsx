import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './component/layout/appBar/AppBar';
import Tabs from './component/layout/Tabs';

const App: React.FC<{}> = () => (
    <React.Fragment>
        <CssBaseline />
        <AppBar />
        <Tabs />
    </React.Fragment>
);

export default App;