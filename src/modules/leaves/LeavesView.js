import React, { PropTypes, Component } from 'react';
import {
    TouchableHighlight,
    NavigationExperimental,
    View,
    Navigator,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    Switch,
    Platform,
    Image,
    Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import LinearGradient from 'react-native-linear-gradient';
import * as LeavesStateAction from './LeavesState';

import * as officeApi from '../../office-server/OfficeApi';
import RealmDatabse from '../../database/RealmDatabase';

class LeavesView extends Component {

    static displayName = 'LeavesView';

    static propTypes = {
        howManyDays : PropTypes.string.isRequired,
        halfDayFullDay : PropTypes.string.isRequired,
        paidUnpaid : PropTypes.string.isRequired,

        showDaysPicker : PropTypes.bool.isRequired,
        showFullPicker : PropTypes.bool.isRequired,
        showPaidPicker : PropTypes.bool.isRequired,
        dispatch : PropTypes.func.isRequired
    };

    render() {

        const {dispatch} = this.props;
        let leavesView = {
            
        };

        officeApi.getLeavesDetails()
            .then((resp)=>{
                console.log(resp);
            })
            .catch((err)=>{
                console.log(err);
            });

        return (
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0.0, 0.5, 1.0]}
                colors={['#60639f', '#5e73a1', '#5b87a3']} style={styles.linearGradient}>
                <Text style={styles.textDisplay}>How many Days?</Text>
                <TouchableHighlight underlayColor="transparent" onPress={function(){
                       dispatch(LeavesStateAction.toggleDaysPicker());
                }}>
                    <View
                        style={{
                        padding: 12, flexDirection: 'row', backgroundColor: '#d7d7d7',
                        borderRadius: 5,
                        marginBottom: 10
                    }}
                    >
                        <Text style={{
                        flex: 1, backgroundColor: "transparent", alignSelf: "center",
                        paddingLeft: 5,
                        textAlign: 'left', color: "#000000", fontSize: 16, marginTop: 0
                    }}>One Day</Text>

                        <Icon
                            size={20}
                            color='#000'
                            name="caret-down"
                            style={{ alignSelf: "center", backgroundColor: "transparent" }}
                        />

                    </View>
                </TouchableHighlight>

                <Text style={styles.textDisplay}>Half or Full day leave ?</Text>
                <TouchableHighlight underlayColor="transparent" onPress={function(){
                       dispatch(LeavesStateAction.togglefullDayPicker());
                }}>
                    <View
                        style={{
                        padding: 12, flexDirection: 'row', backgroundColor: '#d7d7d7',
                        borderRadius: 5,
                        marginBottom: 10
                    }}
                    >
                        <Text style={{
                        flex: 1, backgroundColor: "transparent", alignSelf: "center",
                        paddingLeft: 5,
                        textAlign: 'left', color: "#000000", fontSize: 16, marginTop: 0
                    }}>Full Day</Text>

                        <Icon
                            size={20}
                            color='#000'
                            name="caret-down"
                            style={{ alignSelf: "center", backgroundColor: "transparent" }}
                        />
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor="transparent" onPress={function(){
                       dispatch(LeavesStateAction.togglePaidPicker());
                }}>
                    <View>
                <Text style={styles.textDisplay}>Paid or Unpaid ?</Text>
                <View
                    style={{
                        padding: 12, flexDirection: 'row', backgroundColor: '#d7d7d7',
                        borderRadius: 5,
                        marginBottom: 10
                    }}
                >
                    <Text style={{
                        flex: 1, backgroundColor: "transparent", alignSelf: "center",
                        paddingLeft: 5,
                        textAlign: 'left', color: "#000000", fontSize: 16, marginTop: 0
                    }}>Paid Leave</Text>
                    <Icon
                        size={20}
                        color='#000'
                        name="caret-down"
                        style={{ alignSelf: "center", backgroundColor: "transparent" }}
                    />
                </View>
                        </View>
                </TouchableHighlight>

                <View style={styles.calenderContainer}>
                    <DatePicker
                        style={styles.dateStylePicker1}
                        date={"07-03-2017"}
                        mode="date"
                        placeholder="choose date"
                        iconSource={require('./google_calendar.png')}
                        format="YYYY-MM-DD"
                        minDate="2017-03-23"
                        maxDate="2020-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 115,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 0
                            }
                        }}
                        onDateChange={(date) => {



                        }}
                    />
                    <DatePicker
                        style={styles.dateStylePicker2}
                        date={"09-16-2017"}
                        mode="date"
                        placeholder="choose date"
                        format="YYYY-MM-DD"
                        minDate="2017-03-23"
                        maxDate="2020-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={require('./google_calendar.png')}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 115,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 0
                            }
                        }}
                        onDateChange={(date) => {

                         }}
                    />
                </View>
                <View style={styles.showButton}>
                    <Button
                        onPress={() => {
                            this._sendLeaveRequest();
                        }}
                        title="Apply Leave"
                        color = '#fff'
                        style={{borderRadius:5}}
                    />
                </View>

                <Picker
                    mode="dropdown"
                    style={this.props.showDaysPicker?styles.showPicker:styles.hidePicker}
                    onValueChange={(lang) => dispatch(LeavesStateAction.toggleDaysPicker()) }>
                    <Picker.Item label="One Day" value="key0" />
                    <Picker.Item label="Mulitple Days" value="key1" />
                </Picker>
                <Picker
                    style={this.props.showFullPicker?styles.showPicker:styles.hidePicker}
                    onValueChange={(lang) => dispatch(LeavesStateAction.togglefullDayPicker()) }>
                    <Picker.Item label="Half Day" value="key0" />
                    <Picker.Item label="Full Day" value="key1" />
                </Picker>
                <Picker
                    style={this.props.showPaidPicker?styles.showPicker:styles.hidePicker}
                    onValueChange={(lang) => dispatch(LeavesStateAction.togglePaidPicker()) }>
                    <Picker.Item label="Paid Leave" value="key0" />
                    <Picker.Item label="Unpaid Leave" value="key1" />
                </Picker>
            </LinearGradient>
        );
    }

    _sendLeaveRequest() {
        officeApi.applyforLeave(26268,"2023-7-04","2023-7-04",1,"Need food so need leave")
            .then((resp)=>{
                console.log(resp);
            })
            .catch((err)=>{
                console.log(err);
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50
    },
    textDisplay: {
        color: '#ffffff',
        backgroundColor: 'transparent',
        marginBottom: 10
    },
    daysContainer: {
        height: 40,
        alignSelf: 'stretch',
        backgroundColor: "#ccc"
    }, linearGradient: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 10,
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15
    }, showButton: {
        opacity: 1,
        marginTop: 10,
        backgroundColor : '#494961',
    }, dateStylePicker1: {
        width: 150,
    }, dateStylePicker2: {
        width: 150,
        marginLeft: 20,
    },
    calenderContainer: {
        flexDirection: "row",
        position: "relative",
    },
    hidePicker:{
        opacity : 0,
        height:0,
        width:0
    },
    showPicker:{
        opacity : 1
    }

});

export default LeavesView;