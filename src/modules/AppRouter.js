/*eslint-disable react/prop-types*/

import React from 'react';
import CounterViewContainer from './counter/CounterViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import {Text,View} from 'react-native';
import * as wfh from './wfh/WfhView';
import LeavesView from './leaves/LeavesView';
/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const key = props.scene.route.key;

  if (key === 'Dashboard') {
    return <View style={{flex:1,backgroundColor:"#eeeeee"}}><Text>TIMELINE</Text></View>;
  }else if (key === 'Profile') {
    return <Text >Profile</Text>;
  }else if (key === 'Leaves') {
    return <LeavesView />;
  }else if (key === 'WorkFromHome') {
    return <Text>Work from home</Text>;
  }

  if (key.indexOf('Profile') === 0) {
    const index = props.scenes.indexOf(props.scene);
    return (
      <ColorViewContainer
        index={index}
      />
    );
  }
  if (key.indexOf('Leaves') === 0) {
    const index = props.scenes.indexOf(props.scene);
    return (
        <ColorViewContainer
            index={index}
        />
    );
  }
  if (key.indexOf('WorkFromHome') === 0) {
    const index = props.scenes.indexOf(props.scene);
    return (
        <ColorViewContainer
            index={index}
        />
    );
  }
  throw new Error('Unknown navigation key: ' + key);
}
