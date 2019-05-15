export function fetchUser() {
    return {
        type: 'FETCH_USER',
        api: {
            url: '/api/user'
        }
    }
}