import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LeavesView from './LeavesView';

export default connect(
    state => ({
        showDaysPicker: state.getIn(['leavesState','showDaysPicker']),
        showFullPicker: state.getIn(['leavesState','showFullPicker']),

        howManyDays: state.getIn(['leavesState','howManyDays']),
        halfDayFullDay: state.getIn(['leavesState','halfDayFullDay']),
        paidUnpaid: state.getIn(['leavesState','paidUnpaid']),
        
        showPaidPicker: state.getIn(['leavesState','showPaidPicker'])
    })
)(LeavesView);