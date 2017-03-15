import React, {PropTypes, Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    StatusBar,
    Platform,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';

function _getMonthInString(month) {
    switch (month){
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
    switch (day){
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


class TimelineView extends Component {

    static displayName = 'TimelineView';

    static propTypes = {
        //TODO add props for this view
    };

    render() {

        var today = new Date();
        var dd = today.getDate();
        var day = today.getDay();
        var mm = _getMonthInString(today.getMonth()+1); //January is 0!
        var yyyy = today.getFullYear();

        return (
            <View style={styles.container}>
                <View style={{flex:0.4}}>
                    <Image
                        source={require('../../../images/mountain.jpg')}
                        resizeMode="cover"
                        style={styles.header}>
                        <View style={{flex:0.6,flexDirection:"row",alignItems:"center"}}>

                            <Text
                                style={{backgroundColor:"transparent",color:"#fff",fontSize:42,margin:10,paddingLeft:20,fontWeight:"bold"}}>{dd}</Text>
                            <View>
                                <Text style={{backgroundColor:"transparent",color:"#fff",fontSize:24}}>{_getDayOfWeek(day)}</Text>
                                <Text style={{backgroundColor:"transparent",color:"#fff",fontSize:12}}> {mm} {yyyy}</Text>
                            </View>

                            <View style={{flex:1,alignItems:"center"}}>
                                <TouchableHighlight onPress={function()
                                                {

                                                }}
                                                    underlayColor="transparent"
                                >
                                    <View
                                        style={{backgroundColor:"#2CCA29",paddingRight:20,paddingLeft:20,paddingTop:7,paddingBottom:7,borderRadius:4,elevation:20,shadowColor: '#000000',shadowOffset: {width: 0,height: 3},shadowRadius: 2,shadowOpacity: 0.3}}
                                    ><Text style={{color:"#ffffff"}}>Checkin</Text></View>
                                </TouchableHighlight>
                            </View>

                        </View>
                        <View style={{flex:0.4,flexDirection:"row"}}>

                            <View style={{alignItems:"center",margin:20}}>
                                <Text style={{backgroundColor:"transparent",fontSize:12,color:"#ffffff"}}>Last
                                    Checkin</Text>
                                <Text style={{backgroundColor:"transparent",marginTop:5,fontSize:10,color:"#ffffff"}}>no
                                    data</Text>
                            </View>
                            <View style={{alignItems:"center",margin:20}}>
                                <Text style={{backgroundColor:"transparent",fontSize:12,color:"#ffffff"}}>Last
                                    Checkout</Text>
                                <Text style={{backgroundColor:"transparent",marginTop:5,fontSize:10,color:"#ffffff"}}>no
                                    data</Text>
                            </View>
                        </View>
                    </Image>

                </View>

                <View style={styles.timelineListContainer}></View>

                <ActionButton buttonColor="rgba(231,76,60,1)"
                              verticalOrientation={Platform.OS === 'ios' ? "down":"up"}
                              offsetX = {30}
                              offsetY = {Platform.OS === 'ios' ? 190:20}
                              >
                    <ActionButton.Item buttonColor='#9b59b6' title="Apply Leaves"
                                       onPress={() => console.log("notes tapped!")}>
                        <Icon name="plus" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Apply work from home" onPress={() => {}}>
                        <Icon name="plus" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                </ActionButton>
            </View>


        );
    }
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
        backgroundColor: "#00ff00"
    },
    timelineListContainer: {
        flex: 0.6,
        backgroundColor: "#fff"
    }
});

export default TimelineView;
