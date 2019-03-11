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


export const addService = (service) => ({
    type: 'ADD_SERVICE',
    service
});

export const startAddService = (service) => {
    return (dispatch) => {
        dispatch(showLoadingBar());
        return FYSApiClient.addService(service).then((response) => {
            console.log("RE", response);
            dispatch(addService(response.data.service));
            dispatch(hideLoadingBar());
        }).catch(() => dispatch(hideLoadingBar()));
    };
};
