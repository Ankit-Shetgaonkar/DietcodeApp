import {fromJS} from 'immutable';
import {NavigationExperimental} from 'react-native';
import {isNumber} from 'lodash';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

// Actions
const SWITCH_TAB = 'DashboardState/SWITCH_TAB';

// reducers for tabs and scenes are separate
const initialState = fromJS({
    tabs: {
        index: 0,
        routes: [
            {key: 'DashboardTab', title: 'Dashboard'},
            {key: 'ProfileTab', title: 'Profile'},
            {key: 'LeavesTab', title: 'Leaves'},
            {key: 'WorkFromHomeTab', title: 'Wfh'},
            {key: 'LeavesHistoryTab', title: 'LeavesHistory'}
        ]
    },
    // Scenes for the `Dashboard` tab.
    DashboardTab: {
        index: 0,
        routes: [{key: 'Dashboard', title: 'Timeline'}]
    },
    // Scenes for the `ProfileTab` tab.
    ProfileTab: {
        index: 0,
        routes: [{key: 'Profile', title: 'Profile'}]
    },
    // Scenes for the `Leaves` tab.
    LeavesTab: {
        index: 0,
        routes: [{key: 'Leaves', title: 'Leaves Status'}]
    },
    // Scenes for the `WorkFromHome` tab.
    WorkFromHomeTab: {
        index: 0,
        routes: [{key: 'WorkFromHome', title: 'Work From Home Status'}]
    },
    LeavesHistoryTab: {
        index: 0,
        routes: [{key: 'LeavesHistory', title: 'Leaves History'}]
    }
});

export function switchTab(key) {
    return {
        type: SWITCH_TAB,
        payload: key
    };
}


export default function DashboardStateReducer(state = initialState, action) {
    switch (action.type) {
        case SWITCH_TAB: {
            // Switches the tab.
            const tabs = state.get('tabs').toJS();
            let nextTabs;
            try {
                nextTabs = isNumber(action.payload)
                    ? NavigationStateUtils.jumpToIndex(tabs, action.payload)
                    : NavigationStateUtils.jumpTo(tabs, action.payload);
            } catch (e) {
                nextTabs = tabs;
            }
            if (tabs !== nextTabs) {
                return state.set('tabs', fromJS(nextTabs));
            }
            return state;
        }

        default:
            return state;
    }
}
