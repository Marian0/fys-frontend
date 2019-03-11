export default (state = false, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return false;
        case 'LOGGED_OUT':
            return action.user;
        default:
            return state
    }
}
