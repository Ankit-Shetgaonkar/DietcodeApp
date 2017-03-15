'use strict';

import React, {PropTypes, Component} from 'react';
import {View, StyleSheet, ActivityIndicator, Text, Image, TouchableHighlight, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OAuthManager from 'react-native-oauth';
import * as auth from '../../utils/authentication';
import * as LoginState from "../login/LoginState";
import * as SessionState from "../session/SessionState";
import * as api from "../../utils/api";
import RealmDatabase from '../../database/RealmDatabase';
import UserModel from '../../database/UserModel';


class SlackLoginView extends Component {

    static displayName = 'SlackLoginView';


    static propTypes = {
        errorMessage: PropTypes.string.isRequired,
        successMessage: PropTypes.string.isRequired,
        showLoginButton: PropTypes.bool.isRequired,
        showProgress: PropTypes.bool.isRequired,
        dispatcher: PropTypes.func.isRequired
    };

    _welcomeMessage = () => {
        return this.props.successMessage
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

        this.props.dispatcher(LoginState.reset());
        const {dispatcher, showLoginButton} = this.props;

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
                            dispatcher(LoginState.toggleProgress(false));
                            manager.authorize('slack', {scopes: 'identity.basic,identity.team,identity.avatar'})
                              .then(resp => _slackAuthRespose(dispatcher,resp.response.credentials.accessToken))
                              .catch(err => _slackAuthError(dispatcher,err));

                    }}
                                    underlayColor="transparent"
                                    style={showLoginButton?styles.showButton:styles.hideButton}
                >

                    <Image style={styles.slack_button}
                           source={require('../../../images/sign_in_with_slack.png')}
                    />

                </TouchableHighlight>

                <Text style={(this.props.successMessage === "")?styles.hideWelcome:styles.welcome}>
                    { this._welcomeMessage()}
                </Text>

                <Text style={(this.props.errorMessage === "")?styles.hideWelcome:styles.welcome}>
                    { this.errorMessage()}
                </Text>

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

    errorMessage() {
        return this.props.errorMessage
    }
}

const _slackAuthRespose = (dispatcher, accessToken) => {

    dispatcher(LoginState.toggleProgress(true));
    dispatcher(LoginState.showLoginButton(false));
    api.get("https://slack.com/api/users.identity?token=" + accessToken, false)
        .then(resp => {
            dispatcher(LoginState.loginSuccess("Welcome " + resp.user.name));
            dispatcher(LoginState.toggleProgress(false));


            RealmDatabase.saveUser(new UserModel(resp.user.name, accessToken,resp.team.name,resp.user.id,resp.user.image_192,""));
//            RealmDatabase.working();
            const user = RealmDatabase.findUser()
            console.log(user.name+" NAME");
            // let realm = new Realm({
            //     schema: [{
            //         name: 'User',
            //         primaryKey: 'id',
            //         properties: {
            //             name: 'string',
            //             access_token: 'string',
            //             company: 'string',
            //             id: 'string',
            //             image_link: 'string'
            //         }}]
            // });
            //
            // realm.write(() => {
            //     realm.create('User', {
            //         name: resp.user.name,
            //         access_token: accessToken,
            //         company: resp.team.name,
            //         id: resp.user.id,
            //         image_link: resp.user.image_192
            //     },true);
            // });

            auth.setAuthenticationToken(accessToken);
            dispatcher(SessionState.checkedLoginSessionState());

        })
        .catch(err => {
            dispatcher(LoginState.loginError("There was some error, Try again"));
            dispatcher(LoginState.toggleProgress(false));
            dispatcher(LoginState.showLoginButton(true));
            console.log(err + " ERROR!")
        });

    console.log(accessToken);

};

const _slackAuthError = (dispatcher, error) => {
    console.log(error);
};

const styles = StyleSheet.create({
    welcome: {
        marginTop: 20,
        opacity: 1,
        fontSize: 20,
        alignSelf: "center",
        color: "#fff"
    },
    hideWelcome: {
        opacity: 0,
        height: 0,
        width: 0
    },
    hideTouchButton: {
        opacity: 0,
        height: 0,
        width: 0
    },
    showTouchButton: {
        opacity: 1
    },
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
    },
    showButton: {
        opacity: 1
    },
    hideButton: {
        opacity: 0,
        height: 0,
        width: 0
    }


});

export default SlackLoginView;