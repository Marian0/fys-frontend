export default (state = [], action) => {
    switch (action.type) {
        case 'SET_SERVICES':
            return action.services;
        default:
            return state
    }
}
