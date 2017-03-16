import {connect} from 'react-redux';
import WfhView from './WfhView';

export default connect(
    state => ({
        showProgress: state.getIn(["wfhState","showProgress"]),
        errorMessage: state.getIn(["wfhState","errorMessage"]),
        successMessage: state.getIn(["wfhState","successMessage"]),
        showApplyButton: state.getIn(["wfhState","showApplyButton"]),
        fromDate: state.getIn(["wfhState","fromDate"]),
        toDate: state.getIn(["wfhState","toDate"]),
        fromDateText: state.getIn(["wfhState","fromDateText"]),
        toDateText: state.getIn(["wfhState","toDateText"]),
        isSingleDay: state.getIn(["wfhState","isSingleDay"]),
        partOfDay: state.getIn(["wfhState","partOfDay"]),
        showNumberOfDaysPicker: state.getIn(["wfhState","showNumberOfDaysPicker"])
    })
)(WfhView);