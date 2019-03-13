export default (state = [], action) => {
    switch (action.type) {
        case 'SET_SERVICES':
            return action.services;
        case 'ADD_SERVICE':
            return [action.service, ...state];
        case 'REMOVE_SERVICE':
            return state.filter(e => e.id !== action.id);
        case 'UPDATE_SERVICE':
            return state.map((service) => {
                if (service.id === action.id) {
                    return {
                        ...service,
                        ...action.service
                    };
                } else {
                    return service;
                }
            });
        default:
            return state
    }
}
