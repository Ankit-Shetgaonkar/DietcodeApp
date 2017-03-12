import {fromJS} from 'immutable';

export const SHOW_PROGRESS = 'LoginState/SHOW_PROGRESS';

const initialState = fromJS({
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
            //check if its progress on or of
            return state.set("showProgress",!state.get("showProgress"));
        default:
            return state;
    }

}
