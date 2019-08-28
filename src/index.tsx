import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import DatePickerConfigProvider from './provider/DatePickerConfigProvider';
import TextProvider from './provider/TextProvider';
import { appTheme } from './theme';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore'; 
import App from './App';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={appTheme}>
            <DatePickerConfigProvider>
                <TextProvider>
                    <App />
                </TextProvider>
            </DatePickerConfigProvider>
        </ThemeProvider>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
