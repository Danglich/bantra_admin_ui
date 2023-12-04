import { createContext, useReducer } from 'react';
import { VideoReducer } from './VideoReducer';

const INIT_STATE = {
    videos: [],
    isFetching: false,
    error: null,
};

export const VideoContext = createContext(INIT_STATE);

function VideoContextProvider({ children }) {
    const [state, dispatch] = useReducer(VideoReducer, INIT_STATE);

    return (
        <VideoContext.Provider
            value={{
                videos: state.videos,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
}

export default VideoContextProvider;
