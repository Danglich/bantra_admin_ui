export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_START':
            return {
                users: [],
                isFetching: true,
                error: null,
            };
        case 'GET_USER_SUCCESS':
            return {
                users: action.payload,
                isFetching: false,
                error: null,
            };
        case 'GET_USER_FAILURE':
            return {
                users: [],
                isFetching: false,
                error: action.payload,
            };

        case 'DELETE_USER_START':
            return {
                users: state.users,
                isFetching: true,
                error: null,
            };
        case 'DELETE_USER_SUCCESS':
            return {
                users: state.users.filter(
                    (user) => user._id !== action.payload,
                ),
                isFetching: false,
                error: null,
            };
        case 'DELETE_USER_FAILURE':
            return {
                users: state.users,
                isFetching: false,
                error: action.payload,
            };
        case 'CREATE_USER_START':
            return {
                users: state.users,
                isFetching: true,
                error: null,
            };
        case 'CREATE_USER_SUCCESS':
            return {
                users: [...state.users, action.payload],
                isFetching: false,
                error: null,
            };
        case 'CREATE_USER_FAILURE':
            return {
                users: state.users,
                isFetching: false,
                error: action.payload,
            };
        case 'UPDATE_USER_START':
            return {
                users: state.users,
                isFetching: true,
                error: null,
            };
        case 'UPDATE_USER_SUCCESS':
            return {
                users: state.users.map((user) => {
                    if (user._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return user;
                    }
                }),
                isFetching: false,
                error: null,
            };
        case 'UPDATE_USER_FAILURE':
            return {
                users: state.users,
                isFetching: false,
                error: action.payload,
            };

        default:
            return { ...state };
    }
};
