import React, {PropTypes, Component} from 'react';
import {
    NavigationExperimental,
    View,
    Navigator,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';

import AppRouter from '../AppRouter';
import TabBar from '../../components/TabBar';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const {
    CardStack: NavigationCardStack,
    Header: NavigationHeader,
    PropTypes: NavigationPropTypes
} = NavigationExperimental;

//import AppRouter from '../AppRouter';
//import TabBar from '../../components/TabBar';

// Customize bottom tab bar height here if desired
const TAB_BAR_HEIGHT = 50;

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
        return (
            <LinearGradient
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                locations={[0.0,0.5,1.0]}
                colors={['#48E2FF', '#508FF5', '#5933EA']} style={styles.linearGradient}>
            <View style={styles.header}>
                <Icon
                    size={20}
                    color='#fff'
                    name="navicon"
                    style={{backgroundColor:"transparent",alignSelf:"center",marginTop:12}}
                />
                <Text style={{flex:1,alignSelf:"center",backgroundColor:"transparent", textAlign:'center',color:"#ffffff",fontSize:18,marginTop:10}}>{sceneProps.scene.route.title}</Text>
                <Image style={ styles.image } source={{ uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg' }} />
            </View>
                </LinearGradient>

        //     <NavigationHeader
        //         {...sceneProps}
        //         //onNavigateBack={this.props.onNavigateBack}
        //         renderTitleComponent={() => {
        //   return (
        //     <NavigationHeader.Title
        //         navigationStyles={Navigator.NavigationBar.StylesIOS}>
        //       {sceneProps.scene.route.title}
        //     </NavigationHeader.Title>
        //   );
        // }}
        //     />
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
                <StatusBar
                    backgroundColor="#5933EA"
                    barStyle="light-content"
                />
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
    linearGradient: {
        height:50,
        //elevation:6,
        //backgroundColor:"#ffffff",
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
