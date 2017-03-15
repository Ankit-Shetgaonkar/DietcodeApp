import {fromJS} from 'immutable';

export const RESET = 'WfhState/RESET';
export const APPLY_ERROR = 'WfhState/APPLY_ERROR';
export const APPLY_SUCCESS = 'WfhState/APPLY_SUCCESS';
export const SHOW_PROGRESS = 'WfhState/SHOW_PROGRESS';
export const APPLY_BUTTON_TOGGLE = 'WfhState/APPLY_BUTTON_TOGGLE';


const initialState = fromJS({
    showProgress: false,
    errorMessage: "",
    successMessage: "",
    showApplyButton: true
});



export function toggleProgress(isProgress) {
    return {
        type: SHOW_PROGRESS,
        payload: isProgress
    };
}

export function reset() {
    return {
        type: RESET
    };
}

export function loginError(errorMessage) {
    return {
        type: APPLY_ERROR,
        payload: errorMessage
    };
}

export function loginSuccess(successMessage) {
    return {
        type: APPLY_SUCCESS,
        payload: successMessage
    };
}

export function showApplyButton(isButtonVisible) {
    return {
        type: APPLY_BUTTON_TOGGLE,
        payload: isButtonVisible
    };
}


// Reducer
export default function WfhStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case RESET:
            return state.set(initialState);
        case SHOW_PROGRESS:
            return state.set("showProgress", action.payload);
        case APPLY_BUTTON_TOGGLE:
            return state.set("showApplyButton", action.payload);
        case APPLY_SUCCESS:
            return state.set("successMessage", action.payload);
        case APPLY_ERROR:
            return state.set("errorMessage", action.payload);
        default:
            return state;
    }
}
