import React, {PropTypes, Component} from 'react';
import {
    NavigationExperimental,
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

import TabBar from '../../components/TabBar';

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


    render() {
        const {tabs} = this.props.dashboardState;
        return (
            <View style={styles.container}>
                <Text style={{alignSelf:"center",color:"#ff0000",marginTop:200}}
                      onclick={function(){
                    console.log("wowo");
                }}
                >WOWOWOWO</Text>

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
