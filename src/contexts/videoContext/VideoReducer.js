export const VideoReducer = (state, action) => {
    switch (action.type) {
        case 'GET_VIDEO_START':
            return {
                videos: [],
                isFetching: true,
                error: null,
            };
        case 'GET_VIDEO_SUCCESS':
            return {
                videos: action.payload,
                isFetching: false,
                error: null,
            };
        case 'GET_VIDEO_FAILURE':
            return {
                videos: [],
                isFetching: false,
                error: action.payload,
            };
        case 'DELETE_VIDEO_START':
            return {
                videos: state.videos,
                isFetching: true,
                error: null,
            };
        case 'DELETE_VIDEO_SUCCESS':
            return {
                videos: state.videos.filter(
                    (video) => video._id !== action.payload,
                ),
                isFetching: false,
                error: null,
            };
        case 'DELETE_VIDEO_FAILURE':
            return {
                videos: state.videos,
                isFetching: false,
                error: action.payload,
            };
        case 'UPDATE_VIDEO_START':
            return {
                users: state.videos,
                isFetching: true,
                error: null,
            };
        case 'UPDATE_VIDEO_SUCCESS':
            return {
                users: state.users.map((video) => {
                    if (video._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return video;
                    }
                }),
                isFetching: false,
                error: null,
            };
        case 'UPDATE_VIDEO_FAILURE':
            return {
                users: state.videos,
                isFetching: false,
                error: action.payload,
            };

        default:
            return { ...state };
    }
};
