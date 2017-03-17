import {connect} from 'react-redux';
import TimelineView from './TimelineView';

export default connect(
    function(state){
       return {
           timeLineState: state.get('timelineState').toJS()
           // lastCheckin: state.getIn(["timelineState","lastCheckin"]),
           // errorMessage: state.getIn(["timelineState","errorMessage"]),
           // lastCheckout: state.getIn(["timelineState","lastCheckout"]),
           // timelineData: state.getIn(["timelineState","timelineData"]),
           // checkin: state.getIn(["timelineState","checkin"])
       };
    })(TimelineView);
