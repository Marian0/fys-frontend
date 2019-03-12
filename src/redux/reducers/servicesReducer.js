export default (state = [], action) => {
    switch (action.type) {
        case 'SET_SERVICES':
            return action.services;
        case 'ADD_SERVICE':
            return [action.service, ...state];
        default:
            return state
    }
}
