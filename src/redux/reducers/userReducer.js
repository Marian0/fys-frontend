export default (state = false, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return action.user;
        case 'LOGGED_OUT':
            return false;
        default:
            return state
    }
}
