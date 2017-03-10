import {Map} from 'immutable';

export const SHOW_PROGRESS = 'LoginState/SHOW_PROGRESS';

// Initial state
const initialState = Map({
    showProgress: false
});

export function showProgress() {
    return {
        type: SHOW_PROGRESS
    };
}


// Reducer
export default function LoginStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SHOW_PROGRESS:
            return state.set("showProgress",!state.get("showProgress"));
        default:
            return state;
    }

}
