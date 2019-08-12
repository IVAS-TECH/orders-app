import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './component/layout/appBar/AppBar';
import Main from './component/layout/Main';
import Form from './component/form/stencilForm/Form';

const App: React.FC<{}> = () => (
    <React.Fragment>
        <CssBaseline />
        <AppBar />
        <Main>
            <Form />
        </Main>
    </React.Fragment>
);

export default App;