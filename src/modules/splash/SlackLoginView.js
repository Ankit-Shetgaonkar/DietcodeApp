'use strict';

import React, {PropTypes, Component} from 'react';
import {View, StyleSheet, ActivityIndicator, Text, Image, TouchableHighlight, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OAuthManager from 'react-native-oauth';

class SlackLoginView extends Component {

    static displayName = 'SlackLoginView';

    static propTypes = {
        // errorMessage:PropTypes.string.isRequired,
        // isSlackLoginError:PropTypes.bool.isRequired,
        showProgress: PropTypes.bool.isRequired,
        action: PropTypes.func.isRequired
    };

    render() {
        const {action, showProgress} = this.props;

        const manager = new OAuthManager('slackLoginTests');

        manager.configure({
            slack: {
                client_id: '2535197606.78638568385',
                client_secret: '31ec0da3ab29c008efd21ec671cc0fbf'
            }
        });

        return (
            <LinearGradient
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                locations={[0.0,0.5,1.0]}
                colors={['#48E2FF', '#508FF5', '#5933EA']} style={styles.linearGradient}>

                <StatusBar
                    backgroundColor="#48E2FF"
                    barStyle="light-content"
                />

                <Image style={styles.logo}
                       source={require('../../../images/dietcodelogo.png')}
                />

                <Text style={styles.buttonText}>
                    We are Dietcode
                </Text>


                <TouchableHighlight onPress={function()
                    {
                            action();
                            manager.authorize('slack', {scopes: 'read'})
                              .then(resp => console.log(resp.response.credentials.accessToken))
                              .catch(err => console.log(err));

                    }}
                                    underlayColor="transparent"
                >

                    <Image style={styles.slack_button}
                           source={require('../../../images/sign_in_with_slack.png')}
                    />
                </TouchableHighlight>

                <ActivityIndicator style={showProgress?styles.progressBar:styles.hideProgressBar }
                                   size="large"
                                   color="white"
                />

                <Text style={styles.desc}>
                    Login with Slack to manage your checkin & checkout ,
                    you can also manage your Redmine tickets directly from this app
                </Text>
                <Text style={styles.foot}>
                    Made with ❤️️ & 🤓 at Dietcode
                </Text>
            </LinearGradient>
        );

    }
}

const styles = StyleSheet.create({
    toolbar: {
        flex: 1,
        backgroundColor: '#81c04d',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'column'    //Step 1
    },
    logo: {
        marginTop: 100,
        height: 65,
        width: 65,
        alignSelf: "center"
    },
    slack_button: {
        marginTop: 50,
        height: 35, //28
        width: 150, //120
        alignSelf: "center"
    },
    toolbarButton: {
        width: 50,            //Step 2
        color: '#fff',
        textAlign: 'center'
    },
    toolbarTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        //Step 3
    },
    linearGradient: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15
    },
    buttonText: {
        fontSize: 32,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        marginTop: 30,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    desc: {
        fontSize: 14,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        marginTop: 30,
        marginRight: 15,
        marginLeft: 15,
        color: '#ffffff',
        backgroundColor: 'transparent',
        opacity: 0.8
    },
    foot: {
        fontSize: 14,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        marginRight: 15,
        marginLeft: 15,
        color: '#ffffff',
        backgroundColor: 'transparent',
        position: "absolute",
        bottom: 0,
        left: 80,
        alignSelf: "stretch"
    },
    bottomBar: {
        backgroundColor: "#00ff00",
        position: "absolute",
        bottom: 0
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

export default SlackLoginView;