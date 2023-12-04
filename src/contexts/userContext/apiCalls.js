import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    getUsersFailure,
    getUsersStart,
    getUsersSuccess,
    createUserStart,
    createUserSuccess,
    createUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} from './UserActions';
import axios from 'axios';
import { apiUrl } from '../constants';

export const getUsers = async (type, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get(
            `${apiUrl}/user/all${type ? '?new=true' : ''}`,
        );

        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailure(error.response?.data?.message));
    }
};

export const deleteUser = async (userId, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete(`${apiUrl}/user/${userId}`);
        dispatch(deleteUserSuccess(userId));
    } catch (error) {
        dispatch(deleteUserFailure(error.response?.data?.message));
    }
};

export const createUser = async (user, dispatch) => {
    dispatch(createUserStart());
    try {
        const res = await axios.post(`${apiUrl}/auth/register`, user);
        dispatch(createUserSuccess(res.data?.user));
        return true;
    } catch (error) {
        dispatch(createUserFailure(error.response?.data?.message));
        return false;
    }
};

export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put(`${apiUrl}/user/update/${id}`, user);
        dispatch(updateUserSuccess(res.data));
        return true;
    } catch (error) {
        dispatch(updateUserFailure(error.response?.data?.message));
        return false;
    }
};
