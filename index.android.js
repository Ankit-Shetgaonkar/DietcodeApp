import 'es6-symbol/implement';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, { Component } from 'react';
import { AppRegistry, BackAndroid, Platform } from 'react-native';
import * as NavigationStateActions from './src/modules/dashboard/DashboardState';
import {fromJS} from 'immutable';

let listener = null

class DietcodeApp extends Component {

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack() {
    const navigationState = store.getState().get('dashboardState');
    const tabs = navigationState.get('tabs');
    const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
    const currentTab = navigationState.get(tabKey);
    // if we are in the beginning of our tab stack

    if (currentTab.get('index') === 0) {
      return false;
    }
    store.dispatch(NavigationStateActions.popRoute());
    return true;
  }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('DietcodeApp', () => DietcodeApp);
