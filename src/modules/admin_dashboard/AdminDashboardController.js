import {connect} from 'react-redux';
import AdminDashboardView from './AdminDashboardView';

export default connect(
    function(state){
        return {
            //TODO, make the neccesary change
            wfhState: state.get("wfhState").toJS()
            //timeLineState: state.get('timelineState').toJS()
        };
    })(AdminDashboardView);
