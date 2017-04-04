import {fromJS} from 'immutable';


export const RESET = 'AdminDashboardState/RESET';
export const TOGGLE_DATE_FILTER = 'AdminDashboardState/SELECT_DATE_FILTER';
export const FILTER_DATE = 'AdminDashboardState/FILTER_DATE';

const dateText = new Date();
const initialState = fromJS({
    showProgress: false,
    errorMessage: "",
    successMessage: "",
    filterDate: new Date(),
    filterDateString: dateText.getDate()+"/"+(dateText.getMonth()+1)+"/"+dateText.getFullYear(),
    showDatePicker: false
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
    const dateText = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    return {
        type: FILTER_DATE,
        dateString: dateText,
        dateObject: date
    }
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

        default:
            return state;

    }
}