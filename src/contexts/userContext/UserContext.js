import { createContext, useReducer } from 'react';
import { UserReducer } from './UserReducer';

const INIT_STATE = {
    users: [],
    isFetching: false,
    error: null,
};

export const UserContext = createContext(INIT_STATE);

function UserContextProvider({ children }) {
    const [state, dispatch] = useReducer(UserReducer, INIT_STATE);

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
