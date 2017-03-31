import 'es6-symbol/implement';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {AppRegistry, BackAndroid} from 'react-native';
import * as NavigationStateActions from './src/modules/navigation/NavigationState';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';


class DietcodeApp extends Component {

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  }

  componentDidMount(){
    FCM.getFCMToken().then(token => {
      console.log(token);
      alert(token);
      // store fcm token in your server
    });

    FCM.scheduleLocalNotification({
      fire_date: new Date(Date.now()+(5*1000)),      //RN's converter is used, accept epoch time and whatever that converter supports
      id: "abcdefghijkl",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
      body: "from future past"
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      alert("notification comes: "+JSON.stringify(notif));
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      if(notif.local_notification){
        //alert("notitfication : "+JSON.stringify(notif));
        //this is a local notification
      }
      if(notif.opened_from_tray){
        //app is open/resumed because user clicked banner
      }
    });
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log(token);
      alert(token);
      // fcm token may not be available on first load, catch it here
    });

    // FCM.presentLocalNotification({
    //   id: "UNIQ_ID_STRING",                               // (optional for instant notification)
    //   title: "My Notification Title",                     // as FCM payload
    //   body: "My Notification Message",                    // as FCM payload (required)
    //   sound: "default",                                   // as FCM payload
    //   priority: "high",                                   // as FCM payload
    //   click_action: "ACTION",                             // as FCM payload
    //   badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
    //   number: 10,                                         // Android only
    //   ticker: "My Notification Ticker",                   // Android only
    //   auto_cancel: true,                                  // Android only (default true)
    //   large_icon: "ic_launcher",                           // Android only
    //   icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
    //   big_text: "Show when notification is expanded",     // Android only
    //   sub_text: "This is a subText",                      // Android only
    //   color: "red",                                       // Android only
    //   vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
    //   tag: 'some_tag',                                    // Android only
    //   group: "group",                                     // Android only
    //   my_custom_data:'my_custom_field_value',             // extra data you want to throw
    //   lights: true,                                       // Android only, LED blinking (default false)
    //   show_in_foreground:true                                  // notification when app is in foreground (local & remote)
    // });
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
