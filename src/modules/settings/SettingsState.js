import { fromJS } from 'immutable';

export const UPDATE_TIME = 'SettingsState/UPDATE_TIME';
export const SHOW_PICKER = 'SettingsState/SHOW_PICKER';

// initialState
const initialState = fromJS({
    showPicker: false,
    time: (new Date((new Date().getFullYear()), (new Date().getMonth()), (new Date().getDate()), 9, 30, 0, 0))
});

// ACTION METHODS
export function showPickerView(visible) {
    return {
        type: SHOW_PICKER,
        payload: visible
    }
}

export function updateDateTime(dateTime) {
    return {
        type: UPDATE_TIME,
        payload: dateTime
    }
}

// REDUCER
export default function SettingsViewReducer(state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_TIME:
            return state.set('time', action.payload);
        
        case SHOW_PICKER:
            return state.set('showPicker', action.payload);
    
        default:
            return state;
    }
}
