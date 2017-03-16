import {Map} from 'immutable';
import {isNumber} from 'lodash';

// Actions
const SHOW_DAYS_PICKER = 'LeavesState/SHOW_PICKER';
const SHOW_FULL_PICKER = 'LeavesState/SHOW_FULL_PICKER';
const SHOW_PAID_PICKER = 'LeavesState/SHOW_PAID_PICKER';

const HOW_MANY_DAYS = 'LeavesState/HOW_MANY_DAYS';
const HALF_DAY_FULL_DAY = 'LeavesState/HALF_DAY_FULL_DAY';
const PAID_UNPAID = 'LeavesState/PAID_UNPAID';

// reducers for tabs and scenes are separate
const initialState = Map({
    howManyDays :"One Day",
    halfDayFullDay :"Full Day",
    paidUnpaid :"Paid",
    showDaysPicker :false,
    showFullPicker :false,
    showPaidPicker :false
});

export function toggleDaysPicker() {
    return {
        type: SHOW_DAYS_PICKER
    };
}

export function setHowManyDays(days) {
    return {
        type: HOW_MANY_DAYS,
        payload: days
    };
}

export function setHalfDayFullDay(day) {
    return {
        type: HALF_DAY_FULL_DAY,
        payload: day
    };
}

export function setPaidUnpaid(paid) {
    return {
        type: PAID_UNPAID,
        payload: paid
    };
}

export function setHowManyDays(days) {
    return {
        type: HOW_MANY_DAYS
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
            return state.set('showPaidPicker',!state.get('showPaidPicker'));
        }

        default:
            return state;
    }
}