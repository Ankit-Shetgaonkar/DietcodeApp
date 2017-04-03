import 'es6-symbol/implement';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {AppRegistry, BackAndroid, Platform} from 'react-native';
import * as NavigationStateActions from './src/modules/navigation/NavigationState';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import RealmDatabse from './src/database/RealmDatabase';
import * as officeApi from './src/office-server/OfficeApi';
class DietcodeApp extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  }
  componentDidMount() {
      FCM.getFCMToken().then(token => {
            console.log(token)
            // store fcm token in your server
      });
      this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if(notif.local_notification){
              console.log(notif);
              alert(notif.body)
              //this is a local notification
            }
            if(notif.opened_from_tray){
              //app is open/resumed because user clicked banner
            }
            
            if(Platform.OS ==='ios'){
              //optional
              //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link. 
              //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
              //notif._notificationType is available for iOS platfrom
              switch(notif._notificationType){
                case NotificationType.Remote:
                  notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                  break;
                case NotificationType.NotificationResponse:
                  notif.finish();
                  break;
                case NotificationType.WillPresent:
                  notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                  break;
              }
            }
        });
         this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            //console.log(token)
            //console.log("firebase token refreshed",token, "user data ", RealmDatabse.findUser()[0])
          if (typeof RealmDatabse.findUser()[0] != 'undefined' && typeof RealmDatabse.findUser()[0].serverId !== 'undefined') {
              if (typeof token != 'undefined') {
                  officeApi.registerDevice(token, serverId, Platform.OS)
              }
          }
        });
  }
  componentWillUnmount() {
      // stop listening for events
      this.notificationListener.remove();
      this.refreshTokenListener.remove();
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
