import {
    deleteVideoStart,
    getVideosFailure,
    getVideosStart,
    getVideosSuccess,
    deleteVideoSuccess,
    deleteVideoFailure,
    updateVideoStart,
    updateVideoSuccess,
} from './VideoActions';
import axios from 'axios';
import { apiUrl } from '../constants';

export const getVideos = async (type, dispatch) => {
    dispatch(getVideosStart());
    try {
        const res = await axios.get(
            `${apiUrl}/videos/all${type ? '?new=true' : ''}`,
        );

        dispatch(getVideosSuccess(res.data));
    } catch (error) {
        dispatch(getVideosFailure(error?.response?.data?.message));
    }
};

export const deleteVideo = async (id, dispatch) => {
    dispatch(deleteVideoStart());
    try {
        await axios.post(`${apiUrl}/videos/delete/${id}`);
        dispatch(deleteVideoSuccess(id));
    } catch (error) {
        dispatch(deleteVideoFailure(error?.response?.data.message));
    }
};

//upload video

export const updateVideo = async (id, video, dispatch) => {
    dispatch(updateVideoStart());
    try {
        const data = await axios.put(`${apiUrl}/videos/update/${id}`, video);
        dispatch(updateVideoSuccess(data));
        return true;
    } catch (error) {
        dispatch(deleteVideoFailure(error?.response?.data.message));
        return false;
    }
};
