//Get users
export const getUsersStart = () => ({
    type: 'GET_USER_START',
});

export const getUsersSuccess = (users) => ({
    type: 'GET_USER_SUCCESS',
    payload: users,
});

export const getUsersFailure = (error) => ({
    type: 'GET_USER_FAILURE',
    payload: error,
});

//Delete users
export const deleteUserStart = () => ({
    type: 'DELETE_USER_START',
});

export const deleteUserSuccess = (id) => ({
    type: 'DELETE_USER_SUCCESS',
    payload: id,
});

export const deleteUserFailure = (error) => ({
    type: 'DELETE_USER_FAILURE',
    payload: error,
});

//create users
export const createUserStart = () => ({
    type: 'CREATE_USER_START',
});

export const createUserSuccess = (user) => ({
    type: 'CREATE_USER_SUCCESS',
    payload: user,
});

export const createUserFailure = (error) => ({
    type: 'CREATE_USER_FAILURE',
    payload: error,
});

//update users
export const updateUserStart = () => ({
    type: 'UPDATE_USER_START',
});

export const updateUserSuccess = (user) => ({
    type: 'UPDATE_USER_SUCCESS',
    payload: user,
});

export const updateUserFailure = (error) => ({
    type: 'UPDATE_USER_FAILURE',
    payload: error,
});
