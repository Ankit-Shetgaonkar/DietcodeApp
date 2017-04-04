import {connect} from 'react-redux';
import TimelineView from './TimelineView';

export default connect(
    function(state){
        return {
            timeLineState: state.get('timelineState').toJS()
        };
    })(TimelineView);
