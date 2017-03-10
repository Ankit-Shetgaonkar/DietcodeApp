import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginView from './LoginView';

export default connect(
    function(state){
        console.log(state.getIn(["loginState"]));
       return {showProgress: state.getIn(["loginState","showProgress"])};
    })(LoginView);
//     state => ({
//         showProgress: state.get(["loginState","showProgress"])
//         //navigationState: state.get('navigationState').toJS()
//     })
// )(LoginView);
