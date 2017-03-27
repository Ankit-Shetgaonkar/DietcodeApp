import React, { PropTypes, Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    View,
    ListView,
    StyleSheet,
    Text

} from 'react-native';

import * as LHState from "./LeavesHistoryState";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Api from '../../office-server/OfficeApi';

class LeavesHistoryView extends Component {
    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        console.log("render method of leave history view called");
         return (
                <View style={styles.timelineListContainer}>
                    <ListView
                    dataSource={ds.cloneWithRows(['row 1', 'row 2'])}
                    renderRow={(rowData) => <View style={{flex: 1, flexDirection: 'row'}}>
                                                <View style={{flex: .2, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center', alignItems: "center"}}>
                                                    <View style={{backgroundColor:"#eee", width: 1, flex: 0.3}} />
                                                    <View style={rowData.type==="checkin"?styles.circle:styles.circlered} />
                                                    <View style={{backgroundColor:"#eee", width: 1, flex: 0.3}} />
                                                </View>
                                                <View style={{flex: .3, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <Text style={{backgroundColor:"transparent",color:"#999",fontSize:12}}> fillTime </Text>
                                                </View>
                                                <View style={{flex: .6, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <Text style={{backgroundColor:"transparent",color:"#333",fontSize:16}}>title </Text>
                                                    <Text style={{backgroundColor:"transparent",color:"#999",fontSize:12}}>subTitle </Text>
                                                </View>
                                            </View>
                            }
                            />
                </View>
         );
    }
}
const styles = StyleSheet.create({
    timelineListContainer: {
        flex: 0.6,
        backgroundColor: "#fff"
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 20/2,
        borderWidth: 2,
        borderColor: 'green'
    },
    circlered: {
        width: 20,
        height: 20,
        borderRadius: 20/2,
        borderWidth: 2,
        borderColor: 'red'
    }
});
export default LeavesHistoryView
