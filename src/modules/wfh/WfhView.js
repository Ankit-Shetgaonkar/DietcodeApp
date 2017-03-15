import React, {PropTypes, Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';
import * as WhfState from "./WfhState";


// Customize bottom tab bar height here if desired
const TAB_BAR_HEIGHT = 50;

class WfhView extends Component {

    static displayName = 'WorkFromHome';

    static propTypes = {
        showApplyButton :PropTypes.bool.isRequired,
        showProgress: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired,
        successMessage: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };


    render() {
        /*const {tabs} = this.props.dashboardState;
         const tabKey = tabs.routes[tabs.index].key;
         const scenes = this.props.dashboardState[tabKey];*/
        return (
            <View style={styles.container}>
                <Text style={styles.plainText}>
                    Select a date
                </Text>

                <View
                    style={this.props.showApplyButton? styles.showButton:styles.hideButton}>

                    <Button
                        onPress={()=>{
                            clickMe(this.props.dispatch)
                        }}
                        title="Apply for Work from Home"/>

                </View>

                <ActivityIndicator
                    style={this.props.showProgress?styles.progressBar:styles.hideProgressBar }
                                   size="large"
                                   color="white"
                />

            </View>
        );
    }

}


const clickMe = (dispatch) => {
    console.log("check");
    dispatch(WhfState.showApplyButton(false));
    dispatch(WhfState.toggleProgress(true));
    //Alert.alert('I am logging in dude');
};


const styles = StyleSheet.create({
    image: {
        height: 40,
        marginTop: 5,
        width: 40,
        borderRadius: 20
    },
    header: {
        flexDirection: 'row'
    },
    linearGradient: {
        height: 50,
        elevation: 6,
        backgroundColor: "#ffffff",
        paddingLeft: 10,
        paddingRight: 10,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fa21ff"
    },
    sceneContainer: {
        flex: 1,
        backgroundColor: "#48E2FF",
        marginBottom: TAB_BAR_HEIGHT
    },
    slack_button: {
        marginTop: 50,
        height: 35, //28
        width: 150, //120
        alignSelf: "center"
    },
    showButton: {
        opacity: 1
    },
    hideButton: {
        opacity: 0,
        height: 0,
        width: 0
    },
    applyButton: {
        marginTop: 50,
        height: 35, //28
        width: 150, //120
        alignSelf: "center"
    },
    plainText: {
        marginTop: 20,

    },
    progressBar: {
        opacity: 1,
        alignSelf: "center",
        padding: 10,
        marginTop: 30,
        marginBottom: 20
    },
    hideProgressBar: {
        opacity: 0,
        height: 0,
        width: 0,
        position: "absolute",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 20
    }
});

export default WfhView;
