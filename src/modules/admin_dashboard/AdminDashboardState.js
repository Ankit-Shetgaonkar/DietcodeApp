import {fromJS} from 'immutable';


export const RESET = 'AdminDashboardState/RESET';
export const TOGGLE_DATE_FILTER = 'AdminDashboardState/SELECT_DATE_FILTER';
export const FILTER_DATE = 'AdminDashboardState/FILTER_DATE';
export const TIMELINE_DATA = 'AdminDashboardState/TIMELINE_DATA';

const dateText = new Date();
const initialState = fromJS({
    showProgress: false,
    errorMessage: "",
    successMessage: "",
    filterDate: new Date(),
    filterDateString: dateText.getFullYear()+"-"+(dateText.getMonth()+1)+"-"+dateText.getDate(),
    showDatePicker: false,
    timelineData: {
        data : []
    }
});

export function setTimelineData(data) {
    return {
        type: TIMELINE_DATA,
        payload: data
    };
}

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
    const dateText = dateText.getFullYear()+"-"+(dateText.getMonth()+1)+"-"+dateText.getDate();
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
        case TIMELINE_DATA:
            return state.set("timelineData",action.payload);
        default:
            return state;

    }
}