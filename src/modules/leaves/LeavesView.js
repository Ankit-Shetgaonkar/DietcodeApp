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

class LeavesView extends Component {

    static displayName = 'LeavesView';

    static propTypes = {
        showDaysPicker : PropTypes.bool.isRequired,
        showFullPicker : PropTypes.bool.isRequired,
        showPaidPicker : PropTypes.bool.isRequired,
        dispatch : PropTypes.func.isRequired
    };

    render() {
        const {dispatch} = this.props;
        return (
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0.0, 0.5, 1.0]}
                colors={['#60639f', '#5e73a1', '#5b87a3']} style={styles.linearGradient}>
                <Text style={styles.textDisplay}>How many Days?</Text>
                <TouchableHighlight underlayColor="transparent" onPress={function(){
                       dispatch(LeavesStateAction.togglePicker());
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
                       dispatch(LeavesStateAction.togglePicker());
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

                <View style={styles.calenderContainer}>
                    <DatePicker
                        style={styles.dateStylePicker1}
                        date={this.state.date}
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

                            this.setState({ date: date });

                        }}
                    />
                    <DatePicker
                        style={styles.dateStylePicker2}
                        date={this.state.date1}
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
                        onDateChange={(date) => { this.setState({ date1: date }); }}
                    />
                </View>
                <View style={styles.showButton}>
                    <Button
                        onPress={() => {
                        }}
                        title="Apply Leave"
                        color = '#fff'
                    />
                </View>
                <Picker
                    mode="dropdown"
                    style={this.props.showDaysPicker?styles.showPicker:styles.hidePicker}>
                    <Picker.Item label="One Day" value="key0" />
                    <Picker.Item label="Mulitple Days" value="key1" />
                </Picker>
                <Picker
                    style={this.props.showFullPicker?styles.showPicker:styles.hidePicker}>
                    <Picker.Item label="Half Day" value="key0" />
                    <Picker.Item label="Full Day" value="key1" />
                </Picker>
            </LinearGradient>
        );
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