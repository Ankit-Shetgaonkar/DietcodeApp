import { fromJS } from 'immutable';


export const RESET = 'AdminDashboardState/RESET';
export const TOGGLE_DATE_FILTER = 'AdminDashboardState/SELECT_DATE_FILTER';
export const FILTER_DATE = 'AdminDashboardState/FILTER_DATE';
export const EDIT_MODAL = 'AdminDashboardState/EDIT_MODAL';
export const EDIT_MODAL_CHECKIN = 'AdminDashboardState/EDIT_MODAL_CHECKIN';
export const EDIT_MODAL_CHECKOUT = 'AdminDashboardState/EDIT_MODAL_CHECKOUT';
export const EDIT_MODAL_SHOWPROGRESS = 'AdminDashboardState/EDIT_MODAL_SHOWPROGRESS';
export const EDIT_MODAL_CHECKIN_PICKER = 'AdminDashboardState/EDIT_MODAL_CHECKIN_PICKER';
export const EDIT_MODAL_CHECKOUT_PICKER = 'AdminDashboardState/EDIT_MODAL_CHECKOUT_PICKER';
export const EDIT_MODAL_CHECKIN_PROGRESS = 'AdminDashboardState/EDIT_MODAL_CHECKIN_PROGRESS';
export const EDIT_MODAL_CHECKOUT_PROGRESS = 'AdminDashboardState/EDIT_MODAL_CHECKOUT_PROGRESS';


const dateText = new Date();
const initialState = fromJS({
    showProgress: false,
    errorMessage: "",
    successMessage: "",
    filterDate: new Date(),
    filterDateString: dateText.getDate() + "/" + (dateText.getMonth() + 1) + "/" + dateText.getFullYear(),
    showDatePicker: false,
    showEditModal: false,
    editModalCheckinHour: -1,
    editModalCheckinMins: -1,
    editModalCheckinText: 'never came in',
    editModalCheckoutHour: -1,
    editModalCheckoutMins: -1,
    editModalCheckoutText: 'never went out',
    editModalShowProgress: false,
    editModalShowCheckinPicker: false,
    editModalShowCheckoutPicker: false,
    editModalCheckInshowProgress: false,
    editModalCheckoutshowProgress: false,

});


export function resetScreen() {
    return {
        type: RESET
    }
}

export function toggleDatePicker() {
    return {
        type: TOGGLE_DATE_FILTER
    }
}


export function setFilterDate(date) {
    const dateText = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return {
        type: FILTER_DATE,
        dateString: dateText,
        dateObject: date
    }
}

export function toogleEditModal() {
    return {
        type: EDIT_MODAL
    }
}

export function toogleEditShowProgress() {
    return {
        type: EDIT_MODAL_SHOWPROGRESS
    }
}


export function toogleEditModalCheckinPicker() {
    return {
        type: EDIT_MODAL_CHECKIN_PICKER
    }
}


export function toogleEditModalCheckoutPicker() {
    return {
        type: EDIT_MODAL_CHECKOUT_PICKER
    }
}


export function updateEditModalCheckinTime(hour, min) {
    const timeText = _formatTime(hour, min);
    return {
        type: EDIT_MODAL_CHECKIN,
        payloadHour: hour,
        payloadMin: min,
        payloadTimeText: timeText
    }
}

export function updateEditModalCheckoutTime(hour, min) {
    const timeText = _formatTime(hour, min);
    return {
        type: EDIT_MODAL_CHECKOUT,
        payloadHour: hour,
        payloadMin: min,
        payloadTimeText: timeText
    }
}

export function toogleEditModalCheckinProgress() {
    return {
        type: EDIT_MODAL_CHECKOUT_PROGRESS
    }
}

export function toogleEditModalCheckoutProgress() {
    return {
        type: EDIT_MODAL_CHECKIN_PROGRESS
    }
}

/**
 * Returns e.g. '3:05 am'.
 */
function _formatTime(hour, minute) {
    return (hour < 13 ? hour : (hour - 12)) + ':' + (minute < 10 ? '0' + minute : minute) + " " + (hour < 13 ? 'am' : 'pm');
}

// Reducer
export default function AdminDashboardStateReducer(state = initialState, action = {}) {
    switch (action.type) {

        case RESET:
            state = initialState;
            return state;

        case TOGGLE_DATE_FILTER:
            return state.set("showDatePicker", !state.get("showDatePicker"));

        case FILTER_DATE:
            state = state.merge({
                "filterDate": action.dateObject,
                "filterDateString": action.dateString
            });
            return state;

        case EDIT_MODAL:
            return state.set("showEditModal", !state.get("showEditModal"));


        case EDIT_MODAL_SHOWPROGRESS:
            return state.set("showEditModal", !state.get("editModalShowProgress"));


        case EDIT_MODAL_CHECKIN:
            state = state.merge({
                "editModalCheckinHour": action.payloadHour,
                "editModalCheckinMins": action.payloadMin,
                "editModalCheckinText": action.payloadTimeText
            });
            return state;

        case EDIT_MODAL_CHECKOUT:
            state = state.merge({
                "editModalCheckoutHour": action.payloadHour,
                "editModalCheckoutMins": action.payloadMin,
                "editModalCheckoutText": action.payloadTimeText
            });
            return state;


        case EDIT_MODAL_CHECKIN_PICKER:
            return state.set("showEditModal", !state.get("editModalShowCheckinPicker"));

        case EDIT_MODAL_CHECKOUT_PICKER:
            return state.set("showEditModal", !state.get("editModalShowCheckoutPicker"));

        case EDIT_MODAL_CHECKIN_PROGRESS:
            return state.set("showEditModal", !state.get("editModalCheckInshowProgress"));

        case EDIT_MODAL_CHECKOUT_PROGRESS:
            return state.set("showEditModal", !state.get("editModalCheckoutshowProgress"));

        default:
            return state;

    }
}