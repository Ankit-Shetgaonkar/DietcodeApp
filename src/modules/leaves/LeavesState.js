import {Map} from 'immutable';
import {isNumber} from 'lodash';

// Actions
const SHOW_DAYS_PICKER = 'LeavesState/SHOW_PICKER';
const SHOW_FULL_PICKER = 'LeavesState/SHOW_FULL_PICKER';
const SHOW_PAID_PICKER = 'LeavesState/SHOW_PAID_PICKER';

// reducers for tabs and scenes are separate
const initialState = Map({
    showDaysPicker :false,
    showFullPicker :false,
    showPaidPicker :false
});

export function toggleDaysPicker() {
    return {
        type: SHOW_DAYS_PICKER
    };
}

export function togglefullDayPicker() {
    return {
        type: SHOW_FULL_PICKER
    };
}


export function togglePaidPicker() {
    return {
        type: SHOW_PAID_PICKER
    };
}

export default function LeavesStateReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_DAYS_PICKER: {
            return state.set('showDaysPicker',!state.get('showDaysPicker'));
        }
        case SHOW_FULL_PICKER: {
            return state.set('showFullPicker',!state.get('showFullPicker'));
        }
        case SHOW_PAID_PICKER: {
            return state.set('SHOW_PAID_PICKER',!state.get('SHOW_PAID_PICKER'));
        }

        default:
            return state;
    }
}