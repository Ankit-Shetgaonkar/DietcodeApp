import {connect} from 'react-redux';
import LeavesView from './LeavesView';
import {bindActionCreators} from 'redux';

export default connect(
    state => ({
        showProgress: state.getIn(["leavesState","showProgress"]),
        errorMessage: state.getIn(["leavesState","errorMessage"]),
        successMessage: state.getIn(["leavesState","successMessage"]),
        showApplyButton: state.getIn(["leavesState","showApplyButton"]),
        fromDate: state.getIn(["leavesState","fromDate"]),
        toDate: state.getIn(["leavesState","toDate"]),
        fromDateText: state.getIn(["leavesState","fromDateText"]),
        toDateText: state.getIn(["leavesState","toDateText"]),
        isSingleDay: state.getIn(["leavesState","isSingleDay"]),
        isPaidDay: state.getIn(["leavesState","isPaidDay"]),
        partOfDay: state.getIn(["leavesState","partOfDay"]),
        usedLeaves: state.getIn(["leavesState","usedLeaves"]),
        remainingLeaves: state.getIn(["leavesState","remainingLeaves"]),
        showNumberOfDaysPicker: state.getIn(["leavesState","showNumberOfDaysPicker"])
    })
)(LeavesView);