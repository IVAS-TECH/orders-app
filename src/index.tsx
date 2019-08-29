import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import DatePickerConfigProvider from './provider/DatePickerConfigProvider';
import TextProvider from './provider/TextProvider';
import { appTheme } from './theme';
import * as serviceWorker from './serviceWorker';
import { State } from './store/reducer'; 
import configureStore from './store/configureStore'; 
import App from './App';
import localForage from 'localforage';
import Language from './type/Language';
import User from './type/User';

const persistedKeys = ['language', 'user'];

const items = persistedKeys.map(key => localForage.getItem(key));

Promise.all(items).then(([language, user]) => {
    const persisted: Partial<State> = {};
    if(isLanguage(language)) {
        persisted.language = language;
    }
    if(isUser(user)) {
        persisted.user = user;
    }
    renderApp(persisted);
}).catch((err) => {
    console.log('[localforage] getItem');
    console.log(err);
    renderApp();
});

function isLanguage(language: unknown): language is Language {
    return (language === 'bg' || language === 'en');
}

function isUser(user: unknown): user is User {
    if(typeof user !== 'object') {
        return false;
    }
    if(user === null) {
        return false;
    }
    const userObj = user as { authToken: any, name: any };
    if((typeof userObj.authToken !== 'string') || (userObj.authToken === '')) {
        return false;
    }
    if((typeof userObj.name !== 'string') || (userObj.name === '')) {
        return false;
    }
    return true;
}

function renderApp(persisted?: Partial<State>): void {
    const store = configureStore(persisted);

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
}
