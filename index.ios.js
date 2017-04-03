import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

import React, {Component} from 'react';
import {AppRegistry, Platform} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import RealmDatabse from './src/database/RealmDatabase';
import * as officeApi from './src/office-server/OfficeApi';

class DietcodeApp extends Component {
  componentDidMount() {
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        console.log("ios notif",notif);
        // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
        if(notif.local_notification){
          //this is a local notification
          alert(notif.body)
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
        console.log("firebase token refreshed fcm crash",token, "user ",RealmDatabse.findUser())
        if (typeof RealmDatabse.findUser()[0].serverId != 'undefined') {
            if (typeof token != 'undefined') {
                officeApi.registerDevice(token, serverId, Platform.OS)
            }
        }
        // fcm token may not be available on first load, catch it here
    });
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
