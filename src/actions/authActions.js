
/* ACTIONS --> captureUserAction -> dispatch ->
resolve Promise with FlaskSQLAlch and State with Reducers and Store */
export function signUp(userData) {
    return {
        type: 'SIGNUP',
        api: {
            url: '/signup',
            method: 'GET',
            data : { userData }
        },
    };
}

export function signIn(userData) {
    return {
        type: 'SIGNIN',
        api: {
            url: '/signin',
            method: 'GET',
            data : { userData }
        },
    };
}

export function signOut(user) {
    return {
        type: 'SIGNIN',
        api: {
            url: '/signout',
            method: 'GET',
            data : { user }
        },
    };
}