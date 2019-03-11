import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import loadingReducer from './reducers/loadingReducer';
import snackbarReducer from './reducers/snackbarReducer';
import servicesReducer from "./reducers/servicesReducer";

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    services: servicesReducer,
    loading: loadingReducer
});

export default createStore(
    rootReducer,
    applyMiddleware(thunk),
);
