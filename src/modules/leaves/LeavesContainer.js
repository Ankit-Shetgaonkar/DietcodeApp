import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LeavesView from './LeavesView';

export default connect(
    state => ({
        showDaysPicker: state.getIn(['leavesState','showDaysPicker']),
        showFullPicker: state.getIn(['leavesState','showFullPicker']),
        showPaidPicker: state.getIn(['leavesState','showPaidPicker'])
    })
)(LeavesView);