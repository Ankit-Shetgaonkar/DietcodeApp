import React, { PropTypes, Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Image,
    TouchableHighlight,
    Picker,
    DatePickerAndroid,
    TouchableNativeFeedback,
    ToastAndroid

} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as LeavesState from "./LeavesState";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Api from '../../office-server/OfficeApi';
import ModalDropdown from 'react-native-modal-dropdown';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const Item = Picker.Item;
// Customize bottom tab bar height here if desired
const TAB_BAR_HEIGHT = 50;

var cakeHrId = 0;
var leavesUsed = 0;
var leavesAssigned = 0;
const DEMO_OPTIONS_1 = ['One Day', 'Mulitple Days'];
const DEMO_OPTIONS_2 = ['Full Day', 'First Half', 'Second Half'];
const DEMO_OPTIONS_3 = ['Paid Leave', 'Unpaid Leave'];

class LeavesView extends Component {

    static displayName = 'WorkFromHome';
    static title = 'DatePickerAndroid';

    static propTypes = {
        showApplyButton: PropTypes.bool.isRequired,
        showProgress: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired,
        successMessage: PropTypes.string.isRequired,
        showNumberOfDaysPicker: PropTypes.bool.isRequired,
        fromDateText: PropTypes.string.isRequired,
        toDateText: PropTypes.string.isRequired,
        isSingleDay: PropTypes.bool.isRequired,
        isPaidDay: PropTypes.bool.isRequired,
        partOfDay: PropTypes.string.isRequired,
        usedLeaves: PropTypes.string.isRequired,
        remainingLeaves: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentWillMount() {
        Api.getLeavesDetails().then((resp) => {
            console.log(resp);
            cakeHrId = resp.result.cakeHR.id;
            leavesUsed = resp.result.cakeHR.custom_types_data['10019'].used;
            leavesAssigned = resp.result.cakeHR.custom_types_data['10019'].assigned;
            console.log("Cake hr " + cakeHrId);
            this.props.dispatch(LeavesState.updateUsedLeaves(leavesUsed));
            this.props.dispatch(LeavesState.updateRemainingLeaves(leavesAssigned));
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        Api.getLeavesDetails().then((resp) => {
            console.log(resp);
            cakeHrId = resp.result.cakeHR.id;
            leavesUsed = resp.result.cakeHR.custom_types_data['10019'].used;
            leavesAssigned = resp.result.cakeHR.custom_types_data['10019'].assigned;
            console.log("Cake hr " + cakeHrId);
        }).catch((e) => {
            console.log(e);
        });

        return (
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0.0, 0.5, 1.0]}
                colors={['#60639f', '#5e73a1', '#5b87a3']} style={styles.linearGradient}>
                <Text style={styles.plainText}>
                    How many Days?
                </Text>

                <ModalDropdown style={styles.dropCustom} defaultValue={this.props.isSingleDay ? "One Day" : "Mulitple Days"} dropdownStyle={styles.dropdown_4_dropdown} textStyle={styles.dropCustomText} options={DEMO_OPTIONS_1}
                    onSelect={(idx, value) => this.props.dispatch(LeavesState.updateNumberOfDays(value))}>
                </ModalDropdown>

                <Text style={styles.plainText}>
                    Half or Full day?
                </Text>
                <ModalDropdown style={styles.dropCustom} defaultValue={this.props.partOfDay} dropdownStyle={styles.dropdown_4_dropdown} textStyle={styles.dropCustomText} options={DEMO_OPTIONS_2}
                    onSelect={(idx, value) => this.props.dispatch(LeavesState.updatePartOfDay(value))}>
                </ModalDropdown>


                <Text style={styles.plainText}>
                    Paid or Unpaid ?
                </Text>
                <ModalDropdown style={styles.dropCustom} defaultValue={this.props.isPaidDay ? "Paid Leave" : "Unpaid Leave"} dropdownStyle={styles.dropdown_4_dropdown} textStyle={styles.dropCustomText} options={DEMO_OPTIONS_3}
                    onSelect={(idx, value) => this.props.dispatch(LeavesState.updatePaidLeave(value))}>
                </ModalDropdown>

                <Text style={styles.plainText}>
                    Select Dates for Leave
                </Text>

                <View style={styles.calenderContainer}>
                    <DatePicker
                        style={styles.dateStylePicker1}
                        date={this.props.fromDateText}
                        mode="date"
                        placeholder="From Date"
                        iconSource={require('./google_calendar.png')}
                        format="YYYY-MM-DD"
                        minDate="2017-03-23"
                        maxDate="2020-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: 5,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 0
                            }
                        }}
                        onDateChange={(date) => { this.props.dispatch(LeavesState.updateFromDate(date)); }}
                    />

                    {!this.props.isSingleDay &&
                        <DatePicker
                            style={styles.dateStylePicker2}
                            date={this.props.toDateText}
                            mode="date"
                            placeholder="To Date"
                            format="YYYY-MM-DD"
                            minDate="2017-03-23"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            iconSource={require('./google_calendar.png')}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 5,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 0
                                }
                            }}
                            onDateChange={(date) => { this.props.dispatch(LeavesState.updateToDate(date)); }}
                        />
                    }
                </View>


                {/*Apply Button*/}

                <View style={{ marginTop: 15 }}>

                    <View
                        style={this.props.showApplyButton ? styles.showButton : styles.hideButton}>

                        <Button
                            onPress={() => {
                                this.applyForWorkFromHome();
                            }}
                            title="Apply Leave" />

                    </View>
                    <ActivityIndicator
                        style={this.props.showProgress ? styles.progressBar : styles.hideProgressBar}
                        size="large"
                        color="white"
                    />
                </View>
                <View style={styles.baseContainer}>

                    <AnimatedCircularProgress
                        style={{ marginTop: 15, alignItems: 'center' }}
                        size={130}
                        width={4}
                        fill={this.props.usedLeaves / this.props.remainingLeaves * 100}
                        tintColor="#9e00cd"
                        backgroundColor="#49cacd">
                        {
                            (fill) => (
                                <View>
                                    <Text style={{ marginBottom:10,marginTop: -90, marginLeft:25, fontSize: 24, color: 'white' }}>
                                        {this.props.usedLeaves}
                                    </Text>
                                    <Text style={{ marginLeft:10,marginTop: -5, fontSize: 12, color: 'white' }}>
                                        {this.props.remainingLeaves - this.props.usedLeaves} Paid Leaves {"\n"}remaining
                                    </Text>
                                </View>
                            )
                        }
                    </ AnimatedCircularProgress>
                </View>

                {/*<Text style={{
                    backgroundColor: "transparent", alignSelf: "center",
                    paddingLeft: 5,
                    textAlign: 'left', color: "#fff", fontSize: 30,
                }}>{this.props.usedLeaves} </Text>*/}
                {/*<Text style={{
                    backgroundColor: "transparent", alignSelf: "center",
                    paddingLeft: 5,
                    textAlign: 'left', color: "#fff", fontSize: 30, marginTop: 10,
                }}>{this.props.usedLeaves} Used</Text>

                <Text style={{
                    backgroundColor: "transparent", alignSelf: "center",
                    paddingLeft: 5, 
                    textAlign: 'left', color: "#fff", fontSize: 30, marginTop: 10
                }}>{this.props.remainingLeaves}  Total</Text>
                 <Text style={{
                    backgroundColor: "transparent", alignSelf: "center",
                    paddingLeft: 5, 
                    textAlign: 'left', color: "#fff", fontSize: 30, marginTop: 10
                }}>{this.props.remainingLeaves - this.props.usedLeaves}  Remaing</Text>*/}

            </LinearGradient>
        );
    }

    showFromPicker = async (options) => {
        console.log(options);
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(null);
            if (action === DatePickerAndroid.dismissedAction) {
                //this.props.dispatch(WfhState.updateFromDate());
            } else {
                console.log(date);
                var date = new Date(year, month, day);
                this.props.dispatch(LeavesState.updateFromDate(date));
            }
        } catch (message) {
            console.warn(`Error in example `, message);
        }
    };

    showToPicker = async (options) => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(null);
            if (action === DatePickerAndroid.dismissedAction) {
                //this.props.dispatch(WfhState.updateDate());
            } else {
                console.log(date);
                var date = new Date(year, month, day);
                this.props.dispatch(LeavesState.updateToDate(date));
            }
        } catch (message) {
            console.warn(`Error in example `, message);
        }
    };

    applyForWorkFromHome = () => {


        this.props.dispatch(LeavesState.showApplyButton(false));
        this.props.dispatch(LeavesState.toggleProgress(true));


        Api.getLeavesDetails().then((resp) => {
            console.log(resp);
            cakeHrId = resp.result.cakeHR.id;
            leavesUsed = resp.result.cakeHR.custom_types_data['9931'].used;
            leavesAssigned = resp.result.cakeHR.custom_types_data['9931'].assigned;
            console.log("Cake hr " + cakeHrId);

            this.props.dispatch(LeavesState.updateUsedLeaves(leavesUsed));
            this.props.dispatch(LeavesState.updateRemainingLeaves(leavesAssigned));

            var toDate = this.props.toDateText;
            if (this.props.isSingleDay) {
                toDate = this.props.fromDateText
            }

            Api.applyforLeave(cakeHrId, this.props.fromDateText, toDate, this.props.partOfDay, "Test Work From Home").then(
                (resp) => {
                    console.log(resp);
                    if (resp.result.error) {
                        alert(resp.result.error);
                        //ToastAndroid.showWithGravity(resp.result.error, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                        //this.props.dispatch(WfhState.showError(resp.result.error));         
                    } else {
                        alert(resp.result.success);
                        //ToastAndroid.showWithGravity(resp.result.success, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                        //this.props.dispatch(WfhState.showSuccess(resp.result.success));
                    }
                    this.props.dispatch(LeavesState.showApplyButton(true));
                    this.props.dispatch(LeavesState.toggleProgress(false));

                }
            ).catch((e) => {
                //ToastAndroid.showWithGravity("There was some error", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                //this.props.dispatch(WfhState.showError(e));         
                this.props.dispatch(LeavesState.showApplyButton(true));
                this.props.dispatch(LeavesState.toggleProgress(false))
            });
        }).catch((e) => {
            console.log(e);
            this.props.dispatch(LeavesState.showApplyButton(true));
            this.props.dispatch(LeavesState.toggleProgress(false))
        });
        //dispatch(WfhState.reset())
    };

}

const onSelectDayClicked = (dispatch) => {
    console.log(this);
    //dispatch(WfhState.showNumberOfDaysPicker(true));
};

const styles = StyleSheet.create({
    image: {
        height: 40,
        marginTop: 5,
        width: 40,
        borderRadius: 20
    },
    header: {
        flexDirection: 'row'
    },
    canvas: {
        width: 500,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    linearGradient: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 10,
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15
    },
    container: {
        marginBottom: 20,
        marginTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fa21ff"
    },
    sceneContainer: {
        flex: 1,
        backgroundColor: "#48E2FF",
        marginBottom: TAB_BAR_HEIGHT
    },
    slack_button: {
        marginTop: 50,
        height: 35, //28
        width: 150, //120
        alignSelf: "center"
    },
    showButton: {
        opacity: 1
    },
    hideButton: {
        opacity: 0,
        height: 0,
        width: 0
    },
    applyButton: {
        marginTop: 50,
        height: 35, //28
        width: 150, //120
        alignSelf: "center"
    },
    plainText: {
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 15,
        color: '#fff',
        backgroundColor: "transparent"
    },
    simplePicker: {
        flexDirection: 'row'
    },
    progressBar: {
        opacity: 1,
        alignSelf: "center",
        padding: 10,
        marginTop: 30,
        marginBottom: 20
    },
    hideProgressBar: {
        opacity: 0,
        height: 0,
        width: 0,
        position: "absolute",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 20
    },
    btnStyle: {
        paddingLeft: 20,
        paddingRight: 20
    }, picker: {

    }, standardPicker: {
        flexDirection: 'row',
        backgroundColor: '#d7d7d7'
    }, dateStylePicker1: {
        width: 150,
        backgroundColor: "#d6d6d6",
        flex: 0.5

    }, dateStylePicker2: {
        width: 150,
        marginLeft: 20,
        backgroundColor: "#d6d6d6",
        flex: 0.5
    }, calenderContainer: {
        flexDirection: "row",
        position: "relative",
        marginTop : 5
    }, dropdown_4_dropdown: {
        position: "relative",
        height: 70,
        marginRight: 30,

    }, dropCustom: {
        borderWidth: 1,
        height: 35,
        backgroundColor: "#d6d6d6",
        marginTop: 5
    },
    dropCustomText: {
        color: "black",
        fontSize: 16,
        marginTop: 7,
        marginLeft: 5
    }, dropdown_6_image: {
        width: 40,
        height: 40,
        marginLeft: 300
    }, dateCustomText: {
        fontSize: 20,
        marginLeft: 10,
        paddingLeft: 10
    }, baseContainer: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});

export default LeavesView;
