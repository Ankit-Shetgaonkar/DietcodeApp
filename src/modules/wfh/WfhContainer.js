import {connect} from 'react-redux';
import WfhView from './WfhView';

export default connect(
    state => ({
        showProgress: state.getIn(["wfhState","showProgress"]),
        errorMessage: state.getIn(["wfhState","errorMessage"]),
        successMessage: state.getIn(["wfhState","successMessage"]),
        showApplyButton: state.getIn(["wfhState","showApplyButton"])

    })
)(WfhView);