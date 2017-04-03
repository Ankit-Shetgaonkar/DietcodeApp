import {fromJS} from 'immutable';
export const LEAVEHISTORY_DATA = 'LeavehistoryState/LEAVEHISTORY_DATA';

const initialState = fromJS({
    leaveHistoryData: {
        data : []
    }
});

export function setLeaveHistoryData(data) {
    return {
        type: LEAVEHISTORY_DATA,
        payload: data
    };
}

export default function LHStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case LEAVEHISTORY_DATA:
                return state.set("leaveHistoryData",action.payload);
        default:
            return state;
    }
}