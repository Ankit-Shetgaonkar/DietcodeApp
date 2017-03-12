import {connect} from 'react-redux';
import LoginView from './LoginView';

export default connect(
    function(state){
       return {
           showProgress: state.getIn(["loginState","showProgress"])
       };
    })(LoginView);
//     state => ({
//         showProgress: state.get(["loginState","showProgress"])
//         //navigationState: state.get('navigationState').toJS()
//     })
// )(LoginView);
