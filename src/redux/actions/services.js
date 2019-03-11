import {showLoadingBar, hideLoadingBar} from "./loading";
import FYSApiClient from '../../remote/FYSApiClient';

export const setServices = (services) => ({
    type: 'SET_SERVICES',
    services
});

export const startSetServices = () => {
    return (dispatch) => {
        dispatch(showLoadingBar());
        return FYSApiClient.getServices().then((response) => {
            dispatch(setServices(response.data.services));
            dispatch(hideLoadingBar());
        }).catch(() => dispatch(hideLoadingBar()));
    };
};
