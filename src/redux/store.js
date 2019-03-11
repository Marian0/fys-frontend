import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import loadingReducer from './reducers/loadingReducer';
import snackbarReducer from './reducers/snackbarReducer';
import servicesReducer from "./reducers/servicesReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    services: servicesReducer,
    user: userReducer,
    loading: loadingReducer
});

export default createStore(
    rootReducer,
    applyMiddleware(thunk),
);
