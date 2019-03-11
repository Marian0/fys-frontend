export default (state = [], action) => {
    switch (action.type) {
        case 'SET_SERVICES':
            return action.services;
        case 'ADD_SERVICE':
            return state.concat(action.service);
        default:
            return state
    }
}
