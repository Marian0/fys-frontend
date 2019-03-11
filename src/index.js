import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './redux/store';
import {loggedIn, loggedOut} from "./redux/actions/user";

require('dotenv').config();

//Grab user from localstore
try {
    const user = JSON.parse(localStorage.getItem('user'));
    store.dispatch(loggedIn(user));
} catch (e) {
    store.dispatch(loggedOut());
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
