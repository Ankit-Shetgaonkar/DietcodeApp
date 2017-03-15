import React, {PropTypes, Component} from 'react';
import {
    NavigationExperimental,
    View,
    Navigator,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    Platform,
    Image
} from 'react-native';

import AppRouter from '../AppRouter';
import TabBar from '../../components/TabBar';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import RealmDatabase from '../../database/RealmDatabase';

const {
    CardStack: NavigationCardStack,
    Header: NavigationHeader,
    PropTypes: NavigationPropTypes
} = NavigationExperimental;

// Customize bottom tab bar height here if desired
const TAB_BAR_HEIGHT = 50;

let userData = RealmDatabase.findUser()[0];

class DashboardView extends Component {

    static displayName = 'DashboardView';

    static propTypes = {
        dashboardState: PropTypes.shape({
            tabs: PropTypes.shape({
                routes: PropTypes.arrayOf(PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    title: PropTypes.string.isRequired
                })).isRequired
            }).isRequired,
             DashboardTab:NavigationPropTypes.navigationState.isRequired,
             ProfileTab:NavigationPropTypes.navigationState.isRequired,
             LeavesTab:NavigationPropTypes.navigationState.isRequired,
             WorkFromHomeTab:NavigationPropTypes.navigationState.isRequired
        }),
        switchTab: PropTypes.func.isRequired
    };

    // NavigationHeader accepts a prop style
    // NavigationHeader.title accepts a prop textStyle

    renderHeader = (sceneProps) => {
        return (<View>
            <StatusBar
                backgroundColor="#5933EA"
                barStyle="light-content"
            />
                <LinearGradient
                    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                    locations={[0.0,0.5,1.0]}
                    colors={['#48E2FF', '#508FF5', '#5933EA']} style={Platform.OS === 'ios' ?styles.linearGradientWithPadding:styles.linearGradientWithoutPadding}>
                    <View style={styles.header}>
                        <Icon
                            size={20}
                            color='#fff'
                            name="navicon"
                            style={{alignSelf:"center",marginTop:12,backgroundColor:"transparent"}}
                        />
                        <Text style={{flex:1,backgroundColor:"transparent",alignSelf:"center", textAlign:'center',color:"#ffffff",fontSize:18,marginTop:10}}>{sceneProps.scene.route.title}</Text>
                        <Image style={ styles.image } source={{ uri: userData.image_link }} />
                    </View>
                </LinearGradient>
        </View>
        );
    };

    renderScene = (sceneProps) => {
        // render scene and apply padding to cover
        // for app bar and navigation bar
        return (
            <View style={styles.sceneContainer}>
                {AppRouter(sceneProps)}
            </View>
        );
    };

    render() {
        const {tabs} = this.props.dashboardState;
        const tabKey = tabs.routes[tabs.index].key;
        const scenes = this.props.dashboardState[tabKey];
        return (
            <View style={styles.container}>
                <NavigationCardStack
                                     key={'stack_' + tabKey}
                                     // onNavigateBack={this.props.onNavigateBack}
                                     navigationState={scenes}
                                      renderHeader={this.renderHeader}
                                      renderScene={this.renderScene}
                />
                <TabBar
                    height={TAB_BAR_HEIGHT}
                    tabs={tabs}
                    currentTabIndex={tabs.index}
                    switchTab={this.props.switchTab}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height:40,
        marginTop:5,
        width: 40,
        borderRadius: 20
    },
    header:{
      flexDirection: 'row'
    },
    linearGradientWithPadding: {
        height:70,
        paddingTop:20,
        elevation:5,
        backgroundColor:"transparent",
        paddingLeft: 10,
        paddingRight: 10,
    },
    linearGradientWithoutPadding: {
        height:50,
        elevation:5,
        backgroundColor:"transparent",
        paddingLeft: 10,
        paddingRight: 10,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#48E2FF"
    },
    sceneContainer: {
        flex: 1,
        backgroundColor: "#48E2FF",
        marginBottom: TAB_BAR_HEIGHT
    }
});

export default DashboardView;
