import { useState } from 'react';

const useModal = () => {
    const [state, setState] = useState({
        state: null,
        isShowing: false,
    });

    function toggle(state) {
        if (state) {
            setState((prev) => ({ state: state, isShowing: !prev.isShowing }));
        } else {
            setState((prev) => ({ ...prev, isShowing: !prev.isShowing }));
        }
    }

    return {
        state,
        toggle,
    };
};

export default useModal;
