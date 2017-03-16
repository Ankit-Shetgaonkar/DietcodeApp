'use strict';

import React, { PropTypes, Components } from 'react';
import {
    Image,
    Text,
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const { devReady, inProgress, completed } = {devReady:'DEV READY', inProgress:'IN PROGRESS', completed:'COMPLETED'};
const monthlyHours = 160;

class ProfileView extends Components {

    static displayName = 'ProfileView'

    static propTypes = {
        // username: PropTypes.string.isRequired,
        // description: PropTypes.string.isRequired,
        // hours: PropTypes.number.isRequired,
        // projects: PropTypes.shape({
        //     devReady: PropTypes.number.isRequired,
        //     inProgress: PropTypes.number.isRequired,
        //     completed: PropTypes.number.isRequired
        // }).isRequired
    };

    render() {
        // const {username, description, hours, projects} = this.props;
        // const percentageHours = ((hours/monthlyHours)*100) > 0 ? ((hours/monthlyHours)*100) : 0;
        return (
            <View style={styles.baseContainer}>
                <linearGradient 
                start={[0.0, 0.0]}
                end={[1.0, 1.0]}
                style={styles.linearGradient} 
                colors={['#48E2FF', '#508FF5', '#5933EA']} 
                locations={[0.0, 0.5, 1.0]}>
                    <View style={styles.topContainer}>
                        <Image style={styles.image} source={{ uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg' }} />
                        <Text style={styles.headingText}>username</Text>
                        <Text style={styles.descriptionText}>description</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.holderContainer}>
                            <Projects details={{type=devReady, count=1}} />
                            <Projects details={{type=inProgress, count=1}} />
                            <Projects details={{type=completed, count=1}} />
                        </View>
                        <AnimatedCircularProgress
                            size={( Dimensions.get('window') - (Dimensions.get('window')/4) )}
                            width={4}
                            fill={percentageHours}
                            tintColor="#ff1493"
                            backgroundColor="#00bfff">
                            {
                               (percentageHours) => (
                                 <Text style={styles.textPoints}>
                                    { percentageHours }
                                  </Text>
                                )
                              }
                        </AnimatedCircularProgress>
                    </View>
                </linearGradient>
            </View>
        );
    }
}

function Projects(details) {
    var colors = '#ffffff'
    if (details.type === devReady) {
        colors = '#ff1493'
    } else if (details.type === inProgress) {
        colors = '#ff8c00'
    } else if (details.type === completed) {
        colors = '#008000'
    }
        return (
                <View style={styles.standardContainer}>
                    <Icon size={10} color={colors} name="circle-o" style={styles.iconStyle} />
                    <Text style={styles.headingText}>details.type</Text>
                    <Text style={styles.headingText}>details.count</Text>
                </View>
            );
    }

const styles = StyleSheet.create({
        image: {
            height: 60,
            width: height,
            borderRadius: height/2,
            marginTop: 10
        },
        standardContainer: {
            flex: 1,
            backgroundColor: '#000000',
            alignItems: 'center'
        },
        baseContainer: {
            flex: 1,
            backgroundColor: '#000000',
            marginTop: 50
        },
        topContainer: {
            flex: 1,
            alignItems: 'center',
            shadowColor: '#000000',
            shadowOffset: {
                width: 5,
                height: 0
            },
            shadowOpacity: 0.7
        },
        bottomContainer: {
            flex: 2,
            alignItems: 'center'
        },
        holderContainer: {
            marginTop: 15,
            marginLeft: 8,
            marginRight: 8,
            flexDiection: 'row',
            alignItems: 'center',
            backgroundColor: '#000000'
        },
        gradient: {
            paddingLeft: 10,
            paddingRight: 10,
        },
        headingText: {
            marginTop: 15,
            textAlign: 'center',
            color: '#ffffff',
            fontSize: 20
        },
        descriptionText: {
            marginTop: 15,
            textAlign: 'center',
            color: '#ffffff',
            fontSize: 14,
            ellipsizeMode: 'middle',
            numberOfLines: 2
        },
        linearGradient: {
            backgroundColor:"#000000",
            paddingLeft: 10,
            paddingRight: 10
        },
        iconStyle: {
            alignSelf:"center",
            marginTop:5
        },
        textPoints: {
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 26
        }
    });

    export default ProfileView;