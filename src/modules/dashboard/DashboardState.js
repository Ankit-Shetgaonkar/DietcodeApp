import {fromJS} from 'immutable';
import {NavigationExperimental} from 'react-native';
import {isNumber} from 'lodash';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

// Actions
const PUSH_ROUTE = 'DashboardState/PUSH_ROUTE';
const POP_ROUTE = 'DashboardState/POP_ROUTE';
const SWITCH_TAB = 'DashboardState/SWITCH_TAB';

// reducers for tabs and scenes are separate
const initialState = fromJS({
    tabs: {
        index: 0,
        routes: [
            {key: 'DashboardTab', title: 'Dashboard'},
            {key: 'ProfileTab', title: 'Profile'},
            {key: 'LeavesTab', title: 'Leaves'},
            {key: 'WorkFromHomeTab', title: 'Wfh'}
        ]
    },
    // Scenes for the `Dashboard` tab.
    DashboardTab: {
        index: 0,
        routes: [{key: 'DashboardTab', title: 'Timeline'}]
    },
    // Scenes for the `ProfileTab` tab.
    ProfileTab: {
        index: 0,
        routes: [{key: 'ProfileTab', title: 'Profile'}]
    },
    // Scenes for the `Leaves` tab.
    LeavesTab: {
        index: 0,
        routes: [{key: 'LeavesTab', title: 'Leaves Status'}]
    },
    // Scenes for the `WorkFromHome` tab.
    WorkFromHomeTab: {
        index: 0,
        routes: [{key: 'WorkFromHomeTab', title: 'Work From Home Status'}]
    }
});

export function switchTab(key) {
    return {
        type: SWITCH_TAB,
        payload: key
    };
}
// Action creators
export function pushRoute(route) {
  return {
    type: PUSH_ROUTE,
    payload: route
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}


export default function DashboardStateReducer(state = initialState, action) {
    switch (action.type) {
      case PUSH_ROUTE: {
      // Push a route into the scenes stack.
      const route = action.payload;
      const tabs = state.get('tabs');
      const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
      const scenes = state.get(tabKey).toJS();
      let nextScenes;
      // fixes issue #52
      // the try/catch block prevents throwing an error when the route's key pushed
      // was already present. This happens when the same route is pushed more than once.
      try {
        nextScenes = NavigationStateUtils.push(scenes, route);
      } catch (e) {
        nextScenes = scenes;
      }
      if (scenes !== nextScenes) {
        return state.set(tabKey, fromJS(nextScenes));
      }
      return state;
    }

    case POP_ROUTE: {
      // Pops a route from the scenes stack.
      const tabs = state.get('tabs');
      const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
      const scenes = state.get(tabKey).toJS();
      const nextScenes = NavigationStateUtils.pop(scenes);
      if (scenes !== nextScenes) {
        return state.set(tabKey, fromJS(nextScenes));
      }
      return state;
    }
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
