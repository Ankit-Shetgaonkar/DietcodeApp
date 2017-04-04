/*eslint-disable react/prop-types*/

import React from 'react';
import CounterViewContainer from './counter/CounterViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import {Text,View} from 'react-native';
import WfhContainer from './wfh/WfhContainer'
import TimeLineView from './timeline/TimelineView'
import TimeLineContainer from './timeline/TimelineViewContainer'
import AdminDashboardController from './admin_dashboard/AdminDashboardController'
import LeavesContainer from './leaves/LeavesContainer'
import * as wfh from './wfh/WfhView'
import ProfileView from './profile/ProfileView';
import LeavesHistoryContainer from './LeavesHistory/LeavesHistoryContainer'
import * as LHView from './LeavesHistory/LeavesHistoryView'

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */

export default function AppRouter(props,pushRoute) {
  const key = props.scene.route.key;

  if (key === 'DashboardTab') {
    return <TimeLineContainer pushRoute = {pushRoute} />;
  }else if (key === 'ProfileTab') {
    return <ProfileView />;
  }else if (key === 'LeavesTab') {
    return <LeavesContainer pushRoute = {pushRoute} />;
  }else if (key === 'WorkFromHomeTab') {
      return <WfhContainer/>;
  }else if (key === 'LeavesHistory') {
    console.log("returning lhcontainer")
    return <LeavesHistoryContainer/>;
  } else if (key === 'AdminDashboardTab') {
    return <AdminDashboardController />;
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
  if (key.indexOf('AdminDashboardTab') === 0) {
    const index = props.scenes.indexOf(props.scene);
    return (
        <ColorViewContainer
            index={index}
        />
    );
  }
    if (key.indexOf('LeavesHistory') === 0) {
        const index = props.scenes.indexOf(props.scene);
        return (
            <ColorViewContainer
        index={index}
        />
    );
    }
  throw new Error('Unknown navigation key: ' + key);

}
