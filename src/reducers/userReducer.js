const initialState = {
    id: null,
    email: '',
    name: '',
    surname: '',
    image_url: '',
    register_date: ''
};

export default function userReducer(state = initialState, action) {

    switch(action.type) {
        case 'FETCH_USER':
            return {
                ...state,
                pending: false,
                error: false,
                ...action.data
            }

        case 'FETCH_USER__PENDING':
            return {
                ...state,
                pending: true,
                error: false
            }

        case 'FETCH_USER__ERROR':
            return {
                ...state,
                error: true,
                pending: false,
            }

        default:
            return state;
    }
}

