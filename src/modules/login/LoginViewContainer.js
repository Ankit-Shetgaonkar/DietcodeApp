import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginView from './LoginView';

export default connect(
    state => ({
        //navigationState: state.get('navigationState').toJS()
    })
)(LoginView);
