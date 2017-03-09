'use strict';

import React, {PropTypes, Component} from 'react';
import {View, StyleSheet, ActivityIndicator,Text} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import * as auth from '../utils/authentication';

class AppView extends Component {

  static displayName = 'AppView';

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    isLogin: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        const {isReady,isLogin,dispatch} = this.props;
        if (snapshot) {
          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          dispatch(SessionStateActions.initializeSessionState());
        }
        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View style={styles.loadingLayout}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    // if(!this.isLoginUser()){
        
    // }else{

    // }

    //in case the user is not login , show the splash signin page
    /*if(false){
      return (
      <View style={{flex: 1}}>
                  <ActivityIndicator style={styles.centered} />
        <Text style={styles.centered}>WOW</Text>
      </View>
    );
    }*/

    //we can take to dashboard in case the user is already logined
    return (
      <View style={{flex: 1}}>
        <NavigationViewContainer />
        {/*{__DEV__ && <DeveloperMenu />}*/}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  },
  loadingLayout: {
    flex: 1,
    backgroundColor :"#5933EA"
  }
});

export default AppView;
