import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './components/layout/appBar/AppBar';
import Form from './components/forms/stencilForm/Form';

const App: React.FC<{}> = () => (
    <React.Fragment>
        <CssBaseline />
        <AppBar />
        <Form />
    </React.Fragment>
);

export default App;