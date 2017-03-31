import {connect} from 'react-redux';
import AdminDashboardView from './AdminDashboardView';

export default connect(
    function(state){
        return {
            //timeLineState: state.get('timelineState').toJS()
        };
    })(AdminDashboardView);
