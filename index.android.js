import 'es6-symbol/implement';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {AppRegistry, BackAndroid, PermissionsAndroid} from 'react-native';
import * as NavigationStateActions from './src/modules/navigation/NavigationState';

class DietcodeApp extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
    this.askAndroidLocationPermissions();

  }


   askAndroidLocationPermissions() {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(
            (status) => {
                // Status of permission
                if (!status) {
                    // request for location permission
                    this.getAndroidLocationPermissions();
                }
            }
        ).catch(
            (error) => {
                // error occoured
                console.log('SOME ERROR OCCOURED DURING THE CHECKING OF PERMISSIONS. ' + JSON.stringify(error));
            }
            );
    }

    async getAndroidLocationPermissions() {
        try {
            const permissionStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'DietCodeApp requires Location Permission',
                    'message': 'DietCodeApp requires you to provide access to your location for conducting checkin/checkout.'
                }
            )
            if (permissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Android: Geolocation Permission Granted");
            } else {
                console.log("Android: Geolocation Permission Denied");
                Alert.alert(
                    'Oh! Well',
                    'You may not be able to checkin/checkout, until you provide the permission to access your location, you can change this later in settings.',
                    [
                        { text: 'OK', onPress: () => { } },
                    ]
                );
            }
        } catch (error) {
            console.log('SOME ERROR OCCOURED DURING THE REQUESTING OF PERMISSIONS: ' + JSON.stringify(error));
            Alert.alert(
                'Oh! Snap',
                'Some location services error occoured, try again later.',
                [
                    { text: 'OK', onPress: () => { } },
                ]
            );
        }
    }

  navigateBack() {
    const navigationState = store.getState().get('navigationState');
    const tabs = navigationState.get('tabs');
    const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
    const currentTab = navigationState.get(tabKey);

    // if we are in the beginning of our tab stack
    if (currentTab.get('index') === 0) {

      // if we are not in the first tab, switch tab to the leftmost one
      if (tabs.get('index') !== 0) {
        store.dispatch(NavigationStateActions.switchTab(0));
        return true;
      }

      // otherwise let OS handle the back button action
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
