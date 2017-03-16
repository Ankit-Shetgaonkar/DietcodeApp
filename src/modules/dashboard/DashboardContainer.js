import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {switchTab} from './DashboardState';
import {logoutSessionState} from '../session/SessionState';
import DashboardView from './DashboardView';

export default connect(
    state => ({
        dashboardState: state.get('dashboardState').toJS()
    }),
    dispatch => {
        return {
            switchTab: bindActionCreators(switchTab, dispatch),
            logoutUser: bindActionCreators(logoutSessionState, dispatch)
        };
    }
)(DashboardView);
