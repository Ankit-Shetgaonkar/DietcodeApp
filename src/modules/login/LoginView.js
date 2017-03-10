'use strict';

import React, {PropTypes, Component} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

class LoginView extends Component {

    static displayName = 'LoginView';

    static propTypes = {
        // isReady: PropTypes.bool.isRequired,
        // isLogin: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    render() {
        const {dispatch} = this.props;
        return (
            <View style={{flex: 1}}>
                <Text style={styles.loadingLayout}>LOGIN VIEW CHNAGEDDDDD</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignSelf: 'center'
    },
    loadingLayout: {
        flex: 1,
        backgroundColor: "#ff0000"
    }
});

export default LoginView;
