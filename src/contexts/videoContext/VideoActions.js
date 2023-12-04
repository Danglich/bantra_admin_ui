//Get videos
export const getVideosStart = () => ({
    type: 'GET_VIDEO_START',
});

export const getVideosSuccess = (videos) => ({
    type: 'GET_VIDEO_SUCCESS',
    payload: videos,
});

export const getVideosFailure = (error) => ({
    type: 'GET_VIDEO_FAILURE',
});

//Delete video
export const deleteVideoStart = () => ({
    type: 'DELETE_VIDEO_START',
});

export const deleteVideoSuccess = (id) => ({
    type: 'DELETE_VIDEO_SUCCESS',
    payload: id,
});

export const deleteVideoFailure = (error) => ({
    type: 'DELETE_VIDEO_FAILURE',
    payload: error,
});

//update users
export const updateVideoStart = () => ({
    type: 'UPDATE_VIDEO_START',
});

export const updateVideoSuccess = (video) => ({
    type: 'UPDATE_VIDEO_SUCCESS',
    payload: video,
});

export const updateVideoFailure = (error) => ({
    type: 'UPDATE_VIDEO_FAILURE',
    payload: error,
});
