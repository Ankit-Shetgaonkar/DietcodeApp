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
import * as officeApi from '../../office-server/OfficeApi';
import * as LeavesHistoryStateActions from './LeavesHistoryState'

function formatDate(serverDate) {
    let components = serverDate.split("-");
    if (components.length == 3) {
        var newDate = components[2] + "-" + components[1] + "-" + components[0];
        return newDate
    } else {
        return serverDate
    }

}

class LeavesHistoryView extends Component {
    static propTypes = {
        leaveHistoryState: PropTypes.shape({
            leaveHistoryData: PropTypes.shape({
                data: PropTypes.array.isRequired
            }).isRequired,
        }).isRequired,
        dispatch: PropTypes.func.isRequired
    }
    constructor() {
        super();
        officeApi.getLeaveHistory()
        .then((resp)=>{
            console.log("leave history response ",resp)
            this.props.dispatch(LeavesHistoryStateActions.setLeaveHistoryData({data:resp.result}));
        });
    }
    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = {dataSource: ds.cloneWithRows(this.props.leaveHistoryState.leaveHistoryData.data.length>0?this.props.leaveHistoryState.leaveHistoryData.data:[])};

        console.log("render method of leave history view called");
         return (
                <View style={styles.timelineListContainer}>
                    <ListView
                    {...dataSource}
                    enableEmptySections={true}
                    renderRow={(rowData) => <View style={{flex: 1, flexDirection: 'row'}}>
                                                <View style={{flex: .2, height: 90, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center', alignItems: "center"}}>
                                                    <View style={{backgroundColor:"#eee", width: 1, flex: 0.3}} />
                                                    {rowData.approval === "pending" &&
                                                        <View style={styles.circleyellow} />
                                                    }
                                                    {(rowData.approval === "canceled" || rowData.approval === "declined") &&
                                                        <View style={styles.circlered} />
                                                    }
                                                    {rowData.approval === "approved" &&
                                                        <View style={styles.circle} />
                                                    }
                                                    <View style={{backgroundColor:"#eee", width: 1, flex: 0.3}} />
                                                </View>
                                                <View style={{flex: .3, height: 90, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <Text style={{backgroundColor:"transparent",color:"#999",fontSize:12}}> {rowData.approval} </Text>
                                                </View>
                                                <View style={{flex: .6, height: 90, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <Text style={{backgroundColor:"transparent",color:"#333",fontSize:12}}>from: {formatDate(rowData.from)} </Text>
                                                    <Text style={{backgroundColor:"transparent",color:"#333",fontSize:12}}>to: {formatDate(rowData.to)} </Text>
                                                    {rowData.day_part === "1" &&
                                                        <Text style={{backgroundColor:"transparent",color:"#333",fontSize:12}}>Part: First Half </Text>
                                                    }
                                                    {rowData.day_part === "2" &&
                                                        <Text style={{backgroundColor:"transparent",color:"#333",fontSize:12}}>Part: Second Half </Text>
                                                    }
                                                    <Text style={{backgroundColor:"transparent",color:"#999",fontSize:12}}>reason: {rowData.message} </Text>
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
    },
    circleyellow: {
        width: 20,
        height: 20,
        borderRadius: 20/2,
        borderWidth: 2,
        borderColor: 'yellow'
    }
});
export default LeavesHistoryView
