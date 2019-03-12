import {showLoadingBar, hideLoadingBar} from "./loading";
import {showSnackbar} from "./snackbar";
import FYSApiClient from '../../remote/FYSApiClient';

export const loggedIn = (user) => {

    if (!user) {
        return;
    }

    localStorage.setItem('user', JSON.stringify(user));

    return {
        type: 'LOGGED_IN',
        user
    }
};

export const loggedOut = () => {
    localStorage.removeItem('user');

    return {
        type: 'LOGGED_OUT'
    }
};

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(showLoadingBar());
        return FYSApiClient.login(email, password).then((response) => {

            dispatch(hideLoadingBar());

            if (response.status !== 200) {
                dispatch(showSnackbar(response.data.message || "There was an error with Auth"));
                return false;
            }

            dispatch(loggedIn(response.data.user));
            return true;

        }).catch(() => {
            dispatch(hideLoadingBar())
        });
    };
};
