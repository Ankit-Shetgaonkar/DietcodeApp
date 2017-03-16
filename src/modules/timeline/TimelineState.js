import {Map} from 'immutable';

export const LAST_CHECKIN = 'TimelineState/LAST_CHECKIN';
export const LAST_CHECKOUT = 'TimelineState/LAST_CHECKOUT';
export const ERROR_MESSAGE = 'TimelineState/ERROR_MESSAGE';
export const CHECKIN = 'TimelineState/CHECKIN';

const initialState = Map({
    lastCheckin: "no-data",
    errorMessage: "",
    checkin: false,
    lastCheckout: "no-data"
});



export function setLastCheckin(time) {
    return {
        type: LAST_CHECKIN,
        payload: time
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

// Reducer
export default function TimelineStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case LAST_CHECKIN:
            return state.set("lastCheckin",action.payload);
        case LAST_CHECKOUT:
            return state.set("lastCheckout",action.payload);
        case CHECKIN:
            return state.set("checkin",!state.get('checkin'));
        default:
            return state;
    }

}
