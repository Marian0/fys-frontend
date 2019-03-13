import {showLoadingBar, hideLoadingBar} from "./loading";
import FYSApiClient from '../../remote/FYSApiClient';
import {showSnackbar} from "./snackbar";

export const setServices = (services) => ({
    type: 'SET_SERVICES',
    services
});

export const startSetServices = (params) => {
    return (dispatch) => {
        dispatch(showLoadingBar());
        return FYSApiClient.getServices(params).then((response) => {
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
            dispatch(hideLoadingBar());
            console.log("REsponse", response);

            if (!response.data) {
                dispatch(showSnackbar("There was an error on the request"));
                return;
            }

            if (response.status === 200) {
                dispatch(addService(response.data.service));
            }

            return response;

        }).catch(() => dispatch(hideLoadingBar()));
    };
};

export const updateService = (service) => ({
    type: 'UPDATE_SERVICE',
    id: service.id,
    service
});

export const startUpdateService = (id, service) => {
    return (dispatch) => {
        dispatch(showLoadingBar());
        return FYSApiClient.updateService(id, service).then((response) => {
            dispatch(hideLoadingBar());
            console.log("REsponse", response);

            if (!response.data) {
                dispatch(showSnackbar("There was an error on the request"));
                return;
            }

            if (response.status === 200) {
                dispatch(updateService(response.data.service));
            }

            return response;

        }).catch(() => dispatch(hideLoadingBar()));
    };
};


export const removeService = (id) => ({
    type: 'REMOVE_SERVICE',
    id
});

export const startRemoveService = (id) => {
    return (dispatch) => {
        dispatch(showLoadingBar());
        return FYSApiClient.removeService(id).then((response) => {
            dispatch(hideLoadingBar());
            console.log("REsponse", response);

            if (!response.data) {
                dispatch(showSnackbar("There was an error on the request"));
                return;
            }

            if (response.status === 200) {
                dispatch(removeService(response.data.service.id));
            }

            return response;

        }).catch(() => dispatch(hideLoadingBar()));
    };
};
