import { fromJS } from 'immutable';

export const LAST_CHECKIN = 'TimelineState/LAST_CHECKIN';
export const LAST_CHECKOUT = 'TimelineState/LAST_CHECKOUT';
export const ERROR_MESSAGE = 'TimelineState/ERROR_MESSAGE';
export const CHECKIN = 'TimelineState/CHECKIN';
export const TIMELINE_DATA = 'TimelineState/TIMELINE_DATA';
export const SHOW_PROGRESS = 'TimelineState/SHOW_PROGRESS';

const initialState = fromJS({
    lastCheckin: "no-data",
    errorMessage: "",
    checkin: false,
    lastCheckout: "no-data",
    timelineData: {
        data: []
    },
    showProgress: false
});



export function setLastCheckin(time) {
    return {
        type: LAST_CHECKIN,
        payload: time
    };
}

export function setTimelineData(data) {
    return {
        type: TIMELINE_DATA,
        payload: data
    };
}

export function checkUserToggle() {
    return {
        type: CHECKIN
    };
}

export function setLastCheckout(time) {
    return {
        type: LAST_CHECKOUT,
        payload: time
    };
}

export function toggleShowProgress(progress) {
    return {
        type: SHOW_PROGRESS,
        payload: progress
    };
}
// Reducer
export default function TimelineStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case LAST_CHECKIN:
            return state.set("lastCheckin", action.payload);
        case LAST_CHECKOUT:
            return state.set("lastCheckout", action.payload);
        case CHECKIN:
            return state.set("checkin", !state.get('checkin'));
        case TIMELINE_DATA:
            return state.set("timelineData", action.payload);
        case SHOW_PROGRESS:
            return state.set("showProgress", action.payload);
        default:
            return state;
    }

}
