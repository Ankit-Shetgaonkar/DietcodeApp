import React, { PropTypes, Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    StatusBar,
    ListView,
    Platform,
    TouchableHighlight,
    Alert,
    ActivityIndicator,
    PermissionsAndroid
} from 'react-native';
import FCM from 'react-native-fcm'
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import RealmDatabse from '../../database/RealmDatabase';
import * as auth from '../../utils/authentication';

import * as TimeLineStateActions from './TimelineState';

import * as officeApi from '../../office-server/OfficeApi';
import Dimensions from 'Dimensions'

import { isUserValidLocation } from '../../services/locationService';
import * as notification from '../../notification/Notification'

function _getMonthInString(month) {
    switch (month) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }
}


function _getDayOfWeek(day) {
    switch (day) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 7:
            return "Sunday";
    }
}

//notification.initializeNotification();

async function createUser(token) {
    console.log(RealmDatabse.findUser()[0].serverId);
    if (!RealmDatabse.findUser().length > 0) {
        return;
    }
    if (!RealmDatabse.findUser()[0].serverId) {
        let userObj = RealmDatabse.findUser()[0];

        await officeApi.createUser(userObj.id, userObj.name, token, userObj.image_link, userObj.email)
            .then((resp) => {
                let newObject = {
                    ...userObj,
                    serverId:resp.results[0].id,
                    role:resp.results[0].role
                };
                RealmDatabse.saveUser(newObject);
                officeApi.setUserName(newObject);
                return newObject
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
                throw err;
            });
    }else{
            return RealmDatabse.findUser()[0]
    }
}

var restructuredData = [];
var checkinState = false;

class TimelineView extends Component {

    static displayName = 'TimelineView';

    static propTypes = {
        timeLineState: PropTypes.shape({
            lastCheckin: PropTypes.string.isRequired,
            errorMessage: PropTypes.string.isRequired,
            checkin: PropTypes.bool.isRequired,
            lastCheckout: PropTypes.string.isRequired,
            timelineData: PropTypes.shape({
                data: PropTypes.array.isRequired
            }).isRequired/*,
            showProgress: PropTypes.bool.isRequired*/
        }).isRequired,
        // timelineData: PropTypes.shape({
        //     data: PropTypes.array.isRequired
        // }).isRequired,
        // lastCheckin: PropTypes.string.isRequired,
        // switchTab: PropTypes.func.isRequired,
        // errorMessage: PropTypes.string.isRequired,
        // lastCheckout: PropTypes.string.isRequired,
        // checkin:PropTypes.bool.isRequired,
        pushRoute: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    };


    componentDidMount(){
        auth.getAuthenticationToken().then((resp)=>{
            createUser(resp).then((resp) => {
                    officeApi.setUserName(RealmDatabse.findUser()[0]);
                    //alert(RealmDatabse.findUser()[0].serverId+" SERVER ID");
                    officeApi.getUserTimeline()
                        .then((resp)=>{
                            this.props.dispatch(TimeLineStateActions.setTimelineData({data:resp.results}));
                            FCM.requestPermissions(); // for iOS
                            FCM.getFCMToken().then(token => {
                                if (typeof RealmDatabse.findUser()[0].serverId !== 'undefined') {
                                    if (typeof token != 'undefined') {
                                        officeApi.registerDevice(token, RealmDatabse.findUser()[0].serverId, Platform.OS).then((resp) => {
                                            //alert("register device response "+ JSON.stringify(resp));
                                        })
                                            .catch((error)=>{
                                               // alert("error : "+error);
                                            });
                                    }
                                }
                                // store fcm token in your server
                            });
                        })
                        .catch((err)=>{
                            console.log(err);
                        });
                })
                .catch((err)=>{
                    console.log(err);
                });
        }).catch((err)=>{
            console.log("Cannot find authentication token: "+err);
        });

        this._getLastCheckinCheckout(this.props.dispatch);
    }
    

    render() {
        const checkin = this.props.timeLineState.checkin;
        checkinState = checkin;
        const {dispatch} = this.props;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.refactorData(this.props.timeLineState.timelineData.data.length>0?this.props.timeLineState.timelineData.data:[]);
        const dtaSource = {dataSource: ds.cloneWithRows(restructuredData.length>0?restructuredData:[])};
        var hoursToNotifyCheckout = 9
        var today = new Date();
        var dd = today.getDate();
        var day = today.getDay();
        var mm = _getMonthInString(today.getMonth()+1);
        var yyyy = today.getFullYear();
        var actionButtonY = ((Dimensions.get('window').height - 90) * 0.4) - 19
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.4 }}>
                    <Image
                        source={require('../../../images/mountain.jpg')}
                        resizeMode="cover"
                        style={styles.header}>
                        <View style={{ flex: 0.6, flexDirection: "row", alignItems: "center" }}>

                            <Text
                                style={{ backgroundColor: "transparent", color: "#fff", fontSize: 42, margin: 10, paddingLeft: 20, fontWeight: "bold" }}>{dd}</Text>
                            <View>
                                <Text style={{ backgroundColor: "transparent", color: "#fff", fontSize: 24 }}>{_getDayOfWeek(day)}</Text>
                                <Text style={{ backgroundColor: "transparent", color: "#fff", fontSize: 12 }}> {mm} {yyyy}</Text>
                            </View>
                            <View style={{flex:1,alignItems:"center"}}>
                                <TouchableHighlight onPress={()=>
                                                {
                                                    if(!checkin){
                                                        officeApi.checkinUser()
                                                        .then((resp) => {
                                                            dispatch(TimeLineStateActions.checkUserToggle());
                                                           console.log("time slot", new Date().getTime());
                                                            console.log("time slot", Platform.OS, Platform.OS === 'ios'? new Date(Date.now() + (9 * 60 * 60 * 1000)).toISOString() : new Date().getTime() + (9 * 60 * 60 * 1000));
                                                            FCM.scheduleLocalNotification({
                                                                fire_date: new Date().getTime() + (9 * 60 * 60 * 1000),
                                                                // fire_date: new Date().getTime() + (20 * 1000),
                                                                id: "UNIQ_ID_STRING",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
                                                                body: "It has been 9 hours since you checkedin. Please check out before leaving."
                                                            });
                                                            console.log("schedule successful")
                                                            officeApi.getUserTimeline()
                                                            .then((resp)=>{
                                                                dispatch(TimeLineStateActions.setTimelineData({data:resp.results}));
                                                            })
                                                            .catch((err)=>{
                                                                console.log(err);
                                                            });

                                                            this._getLastCheckinCheckout(dispatch);
                                                        })
                                                        .catch((err)=>{
                                                            console.log(err);
                                                        });
                                                       }
                                                    else{
                                                        officeApi.checkoutUser()
                                                        .then((resp)=>{
                                                           dispatch(TimeLineStateActions.checkUserToggle());
                                                           officeApi.getUserTimeline()
                                                            .then((resp)=>{
                                                                dispatch(TimeLineStateActions.setTimelineData({data:resp.results}));
                                                            })
                                                            .catch((err)=>{
                                                                console.log(err);
                                                            });
                                                            
                                                            this._getLastCheckinCheckout(dispatch)
                                                        })
                                                        .catch((err)=>{
                                                            console.log(err);
                                                        });
                                                    }

                                                }}
                                                    underlayColor="transparent"
                                >
                                    <View
                                        style={checkin?styles.checkoutStyle:styles.checkinStyle}
                                    ><Text style={{color:"#ffffff"}}>{checkin?"Checkout":"Checkin"}</Text></View>
                                </TouchableHighlight>
                            </View>

                        </View>
                        <View style={{ flex: 0.4, flexDirection: "row" }}>

                            <View style={{ alignItems: "center", margin: 20 }}>
                                <Text style={{ backgroundColor: "transparent", fontSize: 12, color: "#ffffff" }}>Last
                                    Checkin</Text>
                                <Text style={{ backgroundColor: "transparent", marginTop: 5, fontSize: 10, color: "#ffffff" }}>{this.props.timeLineState.lastCheckin === '-1h 59m ago' ? '0h 0m ago' : this.props.timeLineState.lastCheckin}</Text>
                            </View>
                            <View style={{ alignItems: "center", margin: 20 }}>
                                <Text style={{ backgroundColor: "transparent", fontSize: 12, color: "#ffffff" }}>Last
                                    Checkout</Text>
                                <Text style={{ backgroundColor: "transparent", marginTop: 5, fontSize: 10, color: "#ffffff" }}>{this.props.timeLineState.lastCheckout === '-1h 59m ago' ? '0h 0m ago' : this.props.timeLineState.lastCheckout}</Text>
                            </View>
                        </View>
                    </Image>

                </View>
                <View style={styles.timelineListContainer}>
                    <ListView
                        {...dtaSource}
                        enableEmptySections={true}
                        renderRow={(rowData) => <View style={{flex: 1, flexDirection: 'row'}}>
                                                <View style={{marginLeft:16 ,flex: 1, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <ListDates data={rowData}></ListDates>
                                                </View>
                                            </View>
                            }
                    />
                </View>
                <ActionButton buttonColor="rgba(231,76,60,1)"
                    verticalOrientation={Platform.OS === 'ios' ? "down" : "up"}
                    offsetX={30}
                    onPress={() => {
                        console.log("OH FUCK!!!");
                    }}
                    offsetY={Platform.OS === 'ios' ? actionButtonY : 20}
                >
                    <ActionButton.Item buttonColor='#9b59b6' title="Apply Leaves"
                                       onPress={() => this.props.pushRoute({key: 'LeavesTab', title: 'Leaves Status'})}>
                        <Icon name="gamepad" color="#fff" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Apply work from home" onPress={() => {this.props.pushRoute({key: 'WorkFromHomeTab', title: 'Work From Home Status'})}}>
                        <Icon name="laptop" color="#fff" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    {RealmDatabse.findUser()[0].role === "admin" && <ActionButton.Item buttonColor='#313638' title="Admin Dashboard" onPress={() => {
                        this.props.pushRoute({key: 'AdminDashboardTab', title: 'Admin Dashboard'})

                    }}>
                        <Icon name="user-circle" color="#fff" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>}
                </ActionButton>
            </View>
        );
    }

    _getLastCheckinCheckout = (dispatch)=> {

        officeApi.getLastCheckinCheckout("checkin")
            .then((resp) => {
                if (typeof resp != 'undefined' && typeof resp.results != 'undefined') {
                    dispatch(TimeLineStateActions.setLastCheckin(resp.results.length > 0 ? this._getHumanReadableTime(resp.results[0].createdAt) : "not found"));
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(TimeLineStateActions.setLastCheckin("0h 0m"));
            });

        officeApi.getLastCheckinCheckout("checkout")
            .then((resp) => {
                if (typeof resp != 'undefined' && typeof resp.results != 'undefined') {
                    dispatch(TimeLineStateActions.setLastCheckout(resp.results.length > 0 ? this._getHumanReadableTime(resp.results[0].createdAt) : "not found"));
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(TimeLineStateActions.setLastCheckout("0h 0m"));
            });
    }

    _getHumanReadableTime(timeValue){
        var timeStart = new Date(timeValue).getTime();
        var timeEnd = new Date().getTime();
        var hourDiff = timeEnd - timeStart; //in ms
        var secDiff = hourDiff / 1000; //in s
        var minDiff = hourDiff / 60 / 1000; //in minutes
        var hDiff = hourDiff / 3600 / 1000; //in hours
        var humanReadable = {};
        humanReadable.hours = Math.floor(hDiff);
        humanReadable.minutes = minDiff - 60 * humanReadable.hours;
            if(humanReadable.hours<0 || humanReadable.minutes<0)
            {
                return "0h : 0m ago";
            }
        let stringTime = humanReadable.hours+"h "+Math.floor(humanReadable.minutes)+"m ago";
        return stringTime;
    }

    refactorData(data) {
        if (data.length > 0) {
            var refactoredArray = [];
            var restructuredArray = [];
            for (var i = 0; i < data.length; i++) 
            {
                if (data[i]) {
                    let date = new Date(data[i].createdAt);
                    var dateString = date.toDateString();
                    let dateReadableString = this.getReadableDateString(date);
                    if (data[i+1]) {
                        var hours = 0;
                        for (var j = i+1; j <= data.length; j++) {
                                if (data[j]) {
                                    let prevDate = new Date(data[j].createdAt);
                                    let prevDateString = prevDate.toDateString();
                                    if (dateString === prevDateString) {
                                        // same day, get diff
                                        let diff = date.getTime() - prevDate.getTime();
                                        hours = hours + (diff / (1000 * 60 * 60));
                                        dateString = prevDateString;
                                        i = j;
                                        //refactoredArray.push({readableDate: date, hours: hours});
                                    } else {
                                        i = j-1;
                                        break;
                                    }
                            } else {
                                break;
                            }
                        }
                        refactoredArray.push({date: date, readableDate: dateReadableString, hours: hours !== 0 ? hours : 'no-data', week: this.getWeekNumber(date)});
                    } else {
                        refactoredArray.push({date: date, readableDate: dateReadableString, hours: 'no-data', week: this.getWeekNumber(date)});
                    }
                } else {
                    break;
                }
            }
            //console.log('REFACTORED DATA: ' + JSON.stringify(refactoredArray));
            if (refactoredArray.length > 0) {
                for (var i = 0; i < refactoredArray.length; i++) {
                    var data = refactoredArray[i];
                    var weekNo = data.week;
                    var dict = {
                        weekDates: [data],
                        totalHours: data.hours === 'no-data' ? 0 : data.hours
                    };
                    for (var j = i+1; j < refactoredArray.length; j++) {
                        if (refactoredArray[j]) {
                            let dta = refactoredArray[j];
                            if (dta.week === weekNo) {
                                dict.weekDates.push(dta);
                                dict.totalHours = dict.totalHours + dta.hours;
                                i = j;
                            } else {
                                i = j-1;
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                    restructuredArray.push(dict);
                }
                //console.log('RESTRUCTURED ARRAY: ' + JSON.stringify(restructuredArray));
                restructuredData = restructuredArray;
            }
        }
    }

    getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0,0,0,0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay()||7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(),0,1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return weekNo;
    }

    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    getReadableDateString(date) {
        return (JSON.stringify(date.getDate()) + '-' + _getMonthInString(date.getMonth()+1) + '-' + JSON.stringify(date.getFullYear()));
    }

    jumpToNextFriday(date) {
        return new Date(+date+(7-(date.getDay()+2)%7)*86400000);
    }

}
    // Component method to be used on rendering list view, used above.
    function ListDates(param) {
        let items = [];
        let today = new Date();
        if (param.data.weekDates.length > 0 && (_getWeekNumber(today) === _getWeekNumber((new Date(param.data.weekDates[0].date))))) {
            for (var i = 0; i < param.data.weekDates.length; i++) {
                let stringDetail = ((new Date(param.data.weekDates[i].date).toDateString()) === today.toDateString()) ? (((parseFloat(Math.round(param.data.weekDates[i].hours * 100) / 100).toFixed(2)) > 0) ? parseFloat(Math.round(param.data.weekDates[i].hours * 100) / 100).toFixed(2) + ' hrs' : (((checkinState) ? 'not checked out yet' : 'yet to checkin'))) : (' ' + parseFloat(Math.round(param.data.weekDates[i].hours * 100) / 100).toFixed(2) + ' hrs');
                items.push(<Text key={param.data.weekDates[i].date} style={{marginTop: 5, backgroundColor:"transparent",color:"#333",fontSize:16, marginBottom:2}}>{param.data.weekDates[i].readableDate + ', ' + stringDetail}</Text>);
            }
            console.log('CHECKIN STATE: ' + JSON.stringify(checkinState) + ' DAY TODAY ' + JSON.stringify(today.getDay()));
            if (today.getDay() !== 1) {
                items.push(<Text key={'key1'} style={{marginTop: 21, backgroundColor:"transparent",color:"#333",fontSize:14}}>{(_getWeekNumber(today) === _getWeekNumber((new Date(param.data.weekDates[0].date)))) ? 'Total Time Current Week' : 'Total Time Last Week'}</Text>);
                items.push(<Text key={'key2'} style={{backgroundColor:"transparent",color:"#333",fontSize:14}}>{(_getReadableDateString(_getMonday(param.data.weekDates[0].date)) + ' to ' + ((_getWeekNumber(today) === _getWeekNumber(param.data.weekDates[param.data.weekDates.length - 1].date)) ? _getReadableDateString(param.data.weekDates[0].date) : ((new Date(param.data.weekDates[0].date).getDay() === 5)?_getReadableDateString(param.data.weekDates[0].date) : _getReadableDateString(_jumpToNextFriday(param.data.weekDates[0].date))))) +', '+((parseFloat(Math.round(param.data.totalHours * 100) / 100).toFixed(2)) + ' hrs')}</Text>);
            }
        } else {
            if (today.getDay() === 1) {
                items.push(<Text key={'key1'} style={{backgroundColor:"transparent",color:"#333",fontSize:14}}>{(_getWeekNumber(today) === _getWeekNumber((new Date(param.data.weekDates[0].date)))) ? 'Total Time Current Week' : 'Total Time Last Week'}</Text>);
                items.push(<Text key={'key2'} style={{backgroundColor:"transparent",color:"#333",fontSize:14}}>{(_getReadableDateString(_getMonday(param.data.weekDates[0].date)) + ' to ' + ((_getWeekNumber(today) === _getWeekNumber(param.data.weekDates[0].date)) ? _getReadableDateString(param.data.weekDates[0].date) : ((new Date(param.data.weekDates[0].date).getDay() === 5)?_getReadableDateString(param.data.weekDates[0].date) : _getReadableDateString(_jumpToNextFriday(param.data.weekDates[0].date))))) +', '+((parseFloat(Math.round(param.data.totalHours * 100) / 100).toFixed(2)) + ' hrs')}</Text>);
            }
        }
        return (<View style={{flex: 1, marginTop: (items.length > 0 ? (Platform.OS === 'ios' ? 24 : 8) : 8), marginBottom: 8}}>{items}</View>);
    }

    function _getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0,0,0,0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay()||7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(),0,1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return weekNo;
    }

    function _getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    function _getReadableDateString(date) {
        return (JSON.stringify(date.getDate()) + '-' + _getMonthInString(date.getMonth()+1) + '-' + JSON.stringify(date.getFullYear()));
    }

    function _jumpToNextFriday(date) {
        return new Date(+date+(7-(date.getDay()+2)%7)*86400000);
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#0000ff"
    },
    header: {
        flex: 1,
        flexDirection: "column",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: null,
        height: null,
        backgroundColor: "transparent"
    },
    timelineListContainer: {
        flex: 0.6,
        backgroundColor: "#fff"
    },
    checkinStyle: {
        backgroundColor: "#2CCA29",
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 7,
        paddingBottom: 7,
        borderRadius: 4,
        elevation: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 2,
        shadowOpacity: 0.3
    },
    checkoutStyle: {
        backgroundColor: "#ff0000",
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 7,
        paddingBottom: 7,
        borderRadius: 4,
        elevation: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 2,
        shadowOpacity: 0.3
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        borderWidth: 2,
        borderColor: 'green'
    },
    circlered: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        borderWidth: 2,
        borderColor: 'red'
    }
});

export default TimelineView;
