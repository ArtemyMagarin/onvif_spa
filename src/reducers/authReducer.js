const initialState = {
    authError: null,
    isAuthenticated: null,
    currentUser: {

    }
};

export default function authReducer(state = initialState, action) {

    switch(action.type) {
        case 'SIGNIN__ERROR':
            console.log('SignIn error')
            return {
                ...state
            }

        case 'SIGNIN__SUCCESS' :
            console.log('SignIn Success')
            return {
                ...state
            }

        case 'SIGNOUT__SUCCESS' :
            console.log('SignOut success');
            return state;

        case 'SIGNUP__SUCCESS':
            console.log('SignUp success');

            return {
                ...state
            }

        case 'SIGNUP__ERROR':
            console.log('signUp error');
            return {
                ...state
            }

            default:
                return state;
    }
}

