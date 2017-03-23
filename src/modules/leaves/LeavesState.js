import { fromJS } from 'immutable';

export const RESET = 'LeavesState/RESET';
export const APPLY_ERROR = 'LeavesState/APPLY_ERROR';
export const APPLY_SUCCESS = 'LeavesState/APPLY_SUCCESS';
export const SHOW_PROGRESS = 'LeavesState/SHOW_PROGRESS';
export const APPLY_BUTTON_TOGGLE = 'LeavesState/APPLY_BUTTON_TOGGLE';
export const SHOW_NUMBER_OF_DAYS_PICKER = 'LeavesState/SHOW_NUMBER_OF_DAYS_PICKER';
export const UPDATE_FROM_DATE = "LeavesState/UPDATE_FROM_DATE";
export const UPDATE_TO_DATE = "LeavesState/UPDATE_TO_DATE";
export const NUMBER_OF_DAYS = "LeavesState/NUMBER_OF_DAYS";
export const PAID_DAY = "LeavesState/Paid_Day";
export const PART_OF_DAY = "LeavesState/PART_OF_DAY";
export const USED_LEAVES = "LeavesState/USED_LEAVES";
export const REMAINING_LEAVES = "LeavesState/REMAINING_LEAVES";

export const [FULL_DAY, FIRST_HALF, SECOND_HALF] = ['Full Day', 'First Half', 'Second Half'];


const initialState = fromJS({
    showProgress: false,
    errorMessage: "",
    successMessage: "",
    showApplyButton: true,
    showNumberOfDaysPicker: false,
    fromDate: new Date(),
    fromDateText: 'From Date',
    toDate: new Date(),
    toDateText: 'To Date',
    isSingleDay: true,
    partOfDay: FULL_DAY,
    isPaidDay: true,
    usedLeaves: "0",
    remainingLeaves: "24"
});



export function updateFromDate(date) {
    //const dateText = date.toLocaleDateString();
    return {
        type: UPDATE_FROM_DATE,
        payload: [date, date]
    }
}

export function updateToDate(date) {
    //const dateText = date.toLocaleDateString();
    return {
        type: UPDATE_TO_DATE,
        payload: [date, date]
    }
}

export function updateNumberOfDays(day) {
    var isSingle = true;
    if (day != "One Day") {
        isSingle = false;
    }

    console.log("Is Single " + isSingle);
    return {
        type: NUMBER_OF_DAYS,
        payload: isSingle
    }
}

export function updatePartOfDay(partOfDay) {
   
    return {
        type: PART_OF_DAY,
        payload: partOfDay
    }
}
export function updatePaidLeave(paidDay) {
    console.log("Chut "+paidDay)
      var isPaid = true;
    if (paidDay != "Paid Leave") {
        isPaid = false;
    }
    return {
        type: PAID_DAY,
        payload: isPaid
    }
}


export function toggleProgress(isProgress) {
    return {
        type: SHOW_PROGRESS,
        payload: isProgress
    };
}

export function showNumberOfDaysPicker(isVisible) {
    return {
        type: SHOW_NUMBER_OF_DAYS_PICKER,
        payload: isVisible
    }
}

export function reset() {
    return {
        type: RESET
    };
}

export function showError(errorMessage) {
    return {
        type: APPLY_ERROR,
        payload: errorMessage
    };
}

export function showSuccess(successMessage) {
    return {
        type: APPLY_SUCCESS,
        payload: successMessage
    };
}

export function showApplyButton(isButtonVisible) {
    return {
        type: APPLY_BUTTON_TOGGLE,
        payload: isButtonVisible
    };
}

export function updateUsedLeaves(usedLeaves) {
    return {
        type: USED_LEAVES,
        payload: usedLeaves
    };
}

export function updateRemainingLeaves(reaminingLeaves) {
    return {
        type: REMAINING_LEAVES,
        payload: reaminingLeaves
    };
}


// Reducer
export default function LeavesStateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case RESET:
            return state.set(initialState);

        case SHOW_PROGRESS:
            return state.set("showProgress", action.payload);

        case APPLY_BUTTON_TOGGLE:
            return state.set("showApplyButton", action.payload);

        case APPLY_SUCCESS:
            return state.set("successMessage", action.payload);

        case APPLY_ERROR:
            return state.set("errorMessage", action.payload);

        case SHOW_NUMBER_OF_DAYS_PICKER:
            return state.set("showNumberOfDaysPicker", action.payload);

        case UPDATE_FROM_DATE:
            state.set("fromDate", action.payload[0]);
            return state.set("fromDateText", action.payload[1]);

        case UPDATE_TO_DATE:
            state.set("toDate", action.payload[0]);
            return state.set("toDateText", action.payload[1]);

        case NUMBER_OF_DAYS:
            return state.set("isSingleDay", action.payload);

        case PART_OF_DAY:
            return state.set("partOfDay", action.payload);

         case PAID_DAY:
            return state.set("isPaidDay", action.payload);

        case USED_LEAVES:
            return state.set("usedLeaves", action.payload);

        case REMAINING_LEAVES:
            return state.set("remainingLeaves", action.payload);

        default:
            return state;
    }
}
