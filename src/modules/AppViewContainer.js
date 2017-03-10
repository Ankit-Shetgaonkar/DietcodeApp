import {connect} from 'react-redux';
import AppView from './AppView';

export default connect(function(state){
    console.log("wow : "+ state.getIn(['session']));
    return {
      isReady: state.getIn(['session', 'isReady']),
      isLogin: state.getIn(['session', 'isLogin'])
    };
})(AppView);
//   state => (
//     {
//     isReady: state.getIn(['session', 'isReady']),
//     isLogin: state.getIn(['session', 'isLogin'])
//   })
// )(AppView);
