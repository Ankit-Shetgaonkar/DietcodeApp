import {connect} from 'react-redux';
import TimelineView from './TimelineView';

export default connect(
    function(state){
       return {
           lastCheckin: state.getIn(["timelineState","lastCheckin"]),
           errorMessage: state.getIn(["timelineState","errorMessage"]),
           lastCheckout: state.getIn(["timelineState","lastCheckout"]),
           checkin: state.getIn(["timelineState","checkin"])
       };
    })(TimelineView);
