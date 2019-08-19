import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import DatePickerConfigProvider from './provider/DatePickerConfigProvider';
import { appTheme } from './theme';
import * as serviceWorker from './serviceWorker';
import store from './store/store'; 
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={appTheme}>
            <DatePickerConfigProvider>
                <App />
            </DatePickerConfigProvider>
        </ThemeProvider>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
