import React, { PropTypes, Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';
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
    ToastAndroid,
    Modal,
    Platform,
    DatePickerIOS,
    ScrollView

} from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as LeavesState from "./LeavesState";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Api from '../../office-server/OfficeApi';


var mCakeHrId = 0;
var mLeavesUsed = 0;
var mLeavesAssigned = 0;

class LeavesView extends Component {

    //PAGE name
    static displayName = 'Apply Leaves';

    //date picker title 
    static datePickerTitle = 'DatePickerAndroid';

    //required properties of this class
    static propTypes = {
        LeavesState: PropTypes.shape({
            showApplyButton: PropTypes.bool.isRequired,
            showProgress: PropTypes.bool.isRequired,
            errorMessage: PropTypes.string.isRequired,
            successMessage: PropTypes.string.isRequired,
            showNumberOfDaysPicker: PropTypes.bool.isRequired,
            showPartOfDayPicker: PropTypes.bool.isRequired,
            fromDateText: PropTypes.string.isRequired,
            toDateText: PropTypes.string.isRequired,
            isSingleDay: PropTypes.bool.isRequired,
            partOfDay: PropTypes.string.isRequired,
            usedLeaves: PropTypes.string.isRequired,
            remainingLeaves: PropTypes.string.isRequired,
            briefMessage: PropTypes.string.isRequired,
            showFromDatePicker: PropTypes.bool.isRequired,
            showToDatePicker: PropTypes.bool.isRequired,
            isPaidLeave: PropTypes.bool.isRequired
        }).isRequired,
        dispatch: PropTypes.func.isRequired

    };


    //this call is called when the class is called for the first time
    componentWillMount() {
        // reset the local state of this view for the first time`
        this.props.dispatch(LeavesState.reset());

        Api.getLeavesDetails().then((resp) => {
            mCakeHrId = resp.result.cakeHR.id;
            mLeavesUsed = resp.result.cakeHR.custom_types_data['9931'].used;
            mLeavesAssigned = resp.result.cakeHR.custom_types_data['9931'].assigned;

            this.props.dispatch(LeavesState.updateUsedLeaves(mLeavesUsed));
            this.props.dispatch(LeavesState.updateRemainingLeaves(mLeavesAssigned));
        }).catch((e) => {
            console.log(e);
        });
    }

    //handles the ios and android dependent coded for picker
    rendorHowManyDays = (flexWeight) => {

        let ONE_DAY = "One Day";
        let MULTIPLE_DAYS = "Multiple Days";

        return (
            <View style={{ flex: flexWeight }}>
                <Text style={styles.plainText}>
                    How many Days?
                </Text>


                {/*Android Picker*/}

                {(Platform.OS === 'android') &&
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        underlayColor="transparent">

                        <View style={styles.basicPickerButton}>

                            <Picker
                                selectedValue={this.props.LeavesState.isSingleDay ? "One Day" : "Multiple Days"}
                                onValueChange={(days) => this.props.dispatch(LeavesState.updateNumberOfDays(days))}
                                mode="dropdown">

                                <Picker.Item label={ONE_DAY} value="One Day" />
                                <Picker.Item label={MULTIPLE_DAYS} value="Multiple Days" />

                            </Picker>
                        </View>
                    </TouchableNativeFeedback>
                }

                {/*IOS Picker*/}

                {(Platform.OS === 'ios') &&
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => this.props.dispatch(LeavesState.updateNumberDaysPicker(true))}
                    >
                        <View style={[styles.basicPickerButton, styles.customPickerPadding]}>

                            <Text style={styles.basicText}>
                                {this.props.LeavesState.isSingleDay ? "One Day" : "Multiple Days"}
                            </Text>
                            <Modal
                                animationType={"fade"}
                                transparent={true}
                                visible={this.props.LeavesState.showNumberOfDaysPicker}
                                onRequestClose={() => { this.props.dispatch(LeavesState.updateNumberDaysPicker(false)) }}>

                                <View style={{ flex: 1, backgroundColor: '#000000', opacity: .6 }} />

                                <Picker
                                    style={{ backgroundColor: '#d7d7d7', paddingBottom: 10, paddingLeft: 10 }}
                                    selectedValue={this.props.LeavesState.isSingleDay ? "One Day" : "Multiple Days"}
                                    onValueChange={(days) => {
                                        this.props.dispatch(LeavesState.updateNumberOfDays(days));
                                        this.props.dispatch(LeavesState.updateNumberDaysPicker(false))
                                    }}>

                                    <Picker.Item label={ONE_DAY} value={"One Day"} />
                                    <Picker.Item label={MULTIPLE_DAYS} value={"Multiple Days"} />

                                </Picker>

                            </Modal>
                        </View>
                    </TouchableHighlight>
                }

            </View>
        );
    }


    rendorHalfOrFullDay = (flexWeight) => {

        if (!this.props.LeavesState.isSingleDay) {
            return;
        }

        let FULL_DAY = "Full Day";
        let FIRST_HALF = "First Half";
        let SECOND_HALF = "Second Half";

        return (
            <View style={{ flex: flexWeight }}>

                <Text style={styles.plainText}>
                    Half or Full day?
            </Text>

                {/*Android Picker*/}
                {(Platform.OS === 'android') &&
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        underlayColor="transparent">

                        <View style={styles.basicPickerButton}>
                            <Picker
                                selectedValue={this.props.LeavesState.partOfDay}
                                onValueChange={(day) => this.props.dispatch(LeavesState.updatePartOfDay(day))}
                                mode="dropdown">
                                <Picker.Item label={FULL_DAY} value={FULL_DAY} />
                                <Picker.Item label={FIRST_HALF} value={FIRST_HALF} />
                                <Picker.Item label={SECOND_HALF} value={SECOND_HALF} />

                            </Picker>
                        </View>

                    </TouchableNativeFeedback>
                }

                {/*IOS Picker*/}
                {(Platform.OS === 'ios') &&
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => this.props.dispatch(LeavesState.updatePartOfDayPicker(true))}>
                        <View style={[styles.basicPickerButton, styles.customPickerPadding]}>

                            <Text style={styles.basicText}>
                                {this.props.LeavesState.partOfDay}
                            </Text>
                            <Modal
                                animationType={"fade"}
                                transparent={true}
                                visible={this.props.LeavesState.showPartOfDayPicker}
                                onRequestClose={() => { this.props.dispatch(LeavesState.updatePartOfDayPicker(false)) }}>

                                <View style={{ flex: 1, backgroundColor: '#000000', opacity: .6 }} />

                                <Picker
                                    style={{ backgroundColor: '#d7d7d7', paddingBottom: 10, paddingLeft: 10 }}
                                    selectedValue={this.props.LeavesState.partOfDay}
                                    onValueChange={(day) => {
                                        this.props.dispatch(LeavesState.updatePartOfDay(day))
                                        this.props.dispatch(LeavesState.updatePartOfDayPicker(false))
                                    }}>
                                    <Picker.Item label={FULL_DAY} value={FULL_DAY} />
                                    <Picker.Item label={FIRST_HALF} value={FIRST_HALF} />
                                    <Picker.Item label={SECOND_HALF} value={SECOND_HALF} />
                                </Picker>

                            </Modal>
                        </View>
                    </TouchableHighlight>
                }
            </View>
        );

    }

    rendorPaidOrUnPaid = (flexWeight) => {

        let PAID_LEAVE = "Paid Leave";
        let UNPAID_LEAVE = "Unpaid Leave";

        return (
            <View style={{ flex: flexWeight }}>

                <Text style={styles.plainText}>
                    Paid or Unpaid Leave?
            </Text>

                {/*Android Picker*/}
                {(Platform.OS === 'android') &&
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        underlayColor="transparent">

                        <View style={styles.basicPickerButton}>
                            <Picker
                                selectedValue={this.props.LeavesState.isPaidLeave ? "Paid Leave" : "Unpaid Leave"}
                                onValueChange={(day) => this.props.dispatch(LeavesState.updatePaidOrUnpaid(day))}
                                mode="dropdown">
                                <Picker.Item label={PAID_LEAVE} value={"Paid Leave"} />
                                <Picker.Item label={UNPAID_LEAVE} value={"Unpaid Leave"} />

                            </Picker>
                        </View>

                    </TouchableNativeFeedback>
                }

                {/*IOS Picker*/}
                {(Platform.OS === 'ios') &&
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => this.props.dispatch(LeavesState.updatePaidOrUnpaidPicker(true))}>
                        <View style={[styles.basicPickerButton, styles.customPickerPadding]}>

                            <Text style={styles.basicText}>
                                {this.props.LeavesState.partOfDay}
                            </Text>
                            <Modal
                                animationType={"fade"}
                                transparent={true}
                                visible={this.props.LeavesState.showPaidOrUnpaidPicker}
                                onRequestClose={() => { this.props.dispatch(LeavesState.updatePaidOrUnpaidPicker(false)) }}>

                                <View style={{ flex: 1, backgroundColor: '#000000', opacity: .6 }} />

                                <Picker
                                    style={{ backgroundColor: '#d7d7d7', paddingBottom: 10, paddingLeft: 10 }}
                                    selectedValue={this.props.LeavesState.partOfDay}
                                    onValueChange={(day) => {
                                        this.props.dispatch(LeavesState.updatePaidOrUnpaid(day))
                                        this.props.dispatch(LeavesState.updatePaidOrUnpaidPicker(false))
                                    }}>
                                    <Picker.Item label={FULL_DAY} value={"Paid Leave"} />
                                    <Picker.Item label={FIRST_HALF} value={"Unpaid Leave"} />
                                </Picker>

                            </Modal>
                        </View>
                    </TouchableHighlight>
                }
            </View>
        );

    }

    rendorSelectDate = (flexWeight) => {

        return (
            <View style={{ flex: flexWeight }}>

                <Text style={styles.plainText}>
                    Select Date for Leave
                </Text>

                <View style={{ flexDirection: 'row' }}>

                    {/*Android Picker From Date*/}
                    {(Platform.OS === 'android') &&
                        <TouchableNativeFeedback
                            title="DatePickerAndroid"
                            background={TouchableNativeFeedback.SelectableBackground()}
                            onPress={this.showFromPicker.bind(this, this.props.LeavesState.fromDate)}
                            underlayColor="transparent">


                            <View
                                style={styles.basicCalenderView}>
                                <Text style={styles.basicText}>{this.props.LeavesState.fromDateText}</Text>
                                <Icon
                                    size={20}
                                    color='#000'
                                    name="calendar"
                                    style={{ backgroundColor: "transparent" }}
                                />
                            </View>

                        </TouchableNativeFeedback>
                    }

                    {/*IOS Picker From Date*/}

                    {(Platform.OS === 'ios') &&
                        <TouchableHighlight
                            onPress={() => this.props.dispatch(LeavesState.updateFromDatePicker(true))}
                            underlayColor="transparent">

                            <View style={[styles.basicPickerButton, styles.customPickerPadding]}>

                                <View
                                    style={styles.basicCalenderView}>
                                    <Text style={styles.basicText}>{this.props.LeavesState.fromDateText}</Text>
                                    <Icon
                                        size={20}
                                        color='#000'
                                        name="calendar"
                                        style={{ backgroundColor: "transparent" }}
                                    />
                                </View>

                                <Modal
                                    animationType={"fade"}
                                    transparent={true}
                                    visible={this.props.LeavesState.showFromDatePicker}
                                    onRequestClose={() => { this.props.dispatch(LeavesState.updateFromDatePicker(false)) }}>

                                    <View style={{ flex: 1, backgroundColor: '#000000', opacity: .6 }} />

                                    <DatePickerIOS
                                        style={{ backgroundColor: '#d7d7d7', paddingBottom: 10, paddingLeft: 10 }}
                                        date={this.props.LeavesState.fromDateText}
                                        mode="date"
                                        onDateChange={(date) => {
                                            this.props.dispatch(LeavesState.updateFromDate(date))
                                            this.props.dispatch(LeavesState.updateFromDatePicker(false))
                                        }}
                                    />

                                </Modal>
                            </View>
                        </TouchableHighlight>
                    }


                    {/*Android Picker To Date*/}

                    {!this.props.LeavesState.isSingleDay && (Platform.OS === 'android') &&
                        <TouchableNativeFeedback
                            title="DatePickerAndroid"
                            background={TouchableNativeFeedback.SelectableBackground()}
                            onPress={this.showToPicker.bind(this, this.props.LeavesState.toDate)}
                            underlayColor="transparent">

                            <View
                                style={styles.basicCalenderView}>

                                <Text style={styles.basicText}> {this.props.LeavesState.toDateText} </Text>

                                <Icon
                                    size={20}
                                    color='#000'
                                    name="calendar"
                                    style={{ alignSelf: "center", backgroundColor: "transparent" }}
                                />
                            </View>
                        </TouchableNativeFeedback>
                    }


                    {/*IOS Picker To Date*/}

                    {!this.props.LeavesState.isSingleDay && (Platform.OS === 'ios') &&
                        <TouchableHighlight
                            onPress={() => this.props.dispatch(LeavesState.updateToDatePicker(true))}
                            underlayColor="transparent">
                            <View style={[styles.basicPickerButton, styles.customPickerPadding]}>

                                <View
                                    style={styles.basicCalenderView}>

                                    <Text style={styles.basicText}> {this.props.LeavesState.toDateText} </Text>

                                    <Icon
                                        size={20}
                                        color='#000'
                                        name="calendar"
                                        style={{ alignSelf: "center", backgroundColor: "transparent" }}
                                    />
                                </View>

                                <Modal
                                    animationType={"fade"}
                                    transparent={true}
                                    visible={this.props.LeavesState.showToDatePicker}
                                    onRequestClose={() => { this.props.dispatch(LeavesState.updateToDatePicker(false)) }}>

                                    <View style={{ flex: 1, backgroundColor: '#000000', opacity: .6 }} />

                                    <DatePickerIOS
                                        style={{ backgroundColor: '#d7d7d7', paddingBottom: 10, paddingLeft: 10 }}
                                        date={this.props.LeavesState.fromDate}
                                        mode="date"
                                        onDateChange={(date) => {
                                            this.props.dispatch(LeavesState.updateToDate(date))
                                            this.props.dispatch(LeavesState.updateToDatePicker(false))
                                        }}
                                    />

                                </Modal>
                            </View>
                        </TouchableHighlight>
                    }


                </View>
            </View>
        );
    }


    rendorMessageBox = (flexWeight) => {
        return (
            <View style={{ flex: flexWeight }}>
                <Text style={styles.plainText}>
                    Brief reason
                </Text>
                <Kohana
                    style={{ backgroundColor: '#d7d7d7', maxHeight: 50 }}
                    label={'Comment'}
                    iconClass={Icon}
                    iconName={'commenting'}
                    iconColor={'black'}
                    labelStyle={{ color: '#000000', fontSize: 16, fontWeight: 'normal' }}
                    inputStyle={{ color: '#000000' }}
                    onChangeText={(message) => this.props.dispatch(LeavesState.updateBriefMessage(message))}
                />
            </View>

        );
    }

    rendorApplyButton = (flexWeight) => {

        return (
            <View style={{ flex: flexWeight }}>
                <View style={{ marginTop: 30 }}>

                    {this.props.LeavesState.showApplyButton &&
                        <Button
                            onPress={() => {
                                this.applyForWorkFromHome();
                            }}
                            title="Apply For Leave" />
                    }

                    {this.props.LeavesState.showProgress &&
                        <ActivityIndicator
                            size="large"
                            color="white"
                        />
                    }
                </View>
            </View>
        );
    }

    rendorProgressStatus = (flexWeight) => {

        return (
            <View style={{
                marginTop: 50,
                marginBottom: 50,
                flex: flexWeight, alignSelf: 'center'
            }}>

                <AnimatedCircularProgress
                    size={200}
                    width={3}
                    fill={this.props.LeavesState.usedLeaves / this.props.LeavesState.remainingLeaves * 100}
                    tintColor="#af00d8"
                    backgroundColor="#00D5D5">
                    {
                        (fill) => (
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ flex: 1, fontSize: 40, color: 'white', textAlign: 'center', marginTop: -140 }}>
                                    {this.props.LeavesState.usedLeaves}
                                </Text>

                                <Text style={{ flex: 0.2, fontSize: 12, textAlign: 'center', color: 'white', opacity: 0.5, marginTop: -300 }}>
                                    {this.props.LeavesState.remainingLeaves - this.props.LeavesState.usedLeaves} Leaves Remaining
                                </Text>

                            </View>
                        )
                    }
                </AnimatedCircularProgress>
            </View>
        );
    }



    render() {

        return (

            <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0.0, 0.5, 1.0]}
                colors={['#60639f', '#5e73a1', '#5b87a3']} style={styles.linearGradient}>

                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    style={styles.scrollView}>

                    {this.rendorHowManyDays(1)}

                    {this.rendorHalfOrFullDay(1)}

                    {this.rendorPaidOrUnPaid(1)}

                    {this.rendorSelectDate(1)}

                    {this.rendorMessageBox(1)}

                    {this.rendorApplyButton(1)}

                    {this.rendorProgressStatus(2)}

                </ScrollView>

            </LinearGradient>
        );
    }

    /**Show Android From Date Picker */
    showFromPicker = async (options) => {
        console.log(options);
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(null);
            if (action === DatePickerAndroid.dismissedAction) {
                //this.props.dispatch(LeavesState.updateFromDate());
            } else {
                console.log(date);
                var date = new Date(year, month, day);
                this.props.dispatch(LeavesState.updateFromDate(date));
            }
        } catch ({ code, message }) {
            console.warn(`Error in example `, message);
        }
    };

    /**Show Android To Date Picker */
    showToPicker = async (options) => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(null);
            if (action === DatePickerAndroid.dismissedAction) {
                //this.props.dispatch(LeavesState.updateDate());
            } else {
                console.log(date);
                var date = new Date(year, month, day);
                this.props.dispatch(LeavesState.updateToDate(date));
            }
        } catch ({ code, message }) {
            console.warn(`Error in example `, message);
        }
    };

    /**
     * Api call for applying work for home
     */
    applyForWorkFromHome = () => {


        this.props.dispatch(LeavesState.showApplyButton(false));
        this.props.dispatch(LeavesState.toggleProgress(true));


        Api.getLeavesDetails().then((resp) => {
            console.log(resp);
            cakeHrId = resp.result.cakeHR.id;
            wfhUsed = resp.result.cakeHR.custom_types_data['9931'].used;
            wfhAssigned = resp.result.cakeHR.custom_types_data['9931'].assigned;
            console.log("Cake hr " + cakeHrId);

            this.props.dispatch(LeavesState.updateUsedLeaves(wfhUsed));
            this.props.dispatch(LeavesState.updateRemainingLeaves(wfhAssigned));

            let toDate = this.props.LeavesState.toDateText;

            if (this.props.LeavesState.isSingleDay == true) {
                toDate = this.props.fromDateText;
            }

            Api.applyforWfh(cakeHrId, this.props.LeavesState.fromDateText, toDate, this.props.LeavesState.partOfDay, this.props.LeavesState.briefMessage).then(
                (resp) => {
                    console.log(resp);
                    if (resp.result.error) {
                        ToastAndroid.showWithGravity(resp.result.error, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                        //this.props.dispatch(LeavesState.showError(resp.result.error));         
                    } else {
                        ToastAndroid.showWithGravity(resp.result.success, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                        //this.props.dispatch(LeavesState.showSuccess(resp.result.success));
                    }
                    this.props.dispatch(LeavesState.showApplyButton(true));
                    this.props.dispatch(LeavesState.toggleProgress(false));

                    //if success reset the state
                    this.props.dispatch(LeavesState.reset());

                }
            ).catch((e) => {
                ToastAndroid.showWithGravity("There was some error, check your internet connection", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                //this.props.dispatch(LeavesState.showError(e));         
                this.props.dispatch(LeavesState.showApplyButton(true));
                this.props.dispatch(LeavesState.toggleProgress(false));
            });
        }).catch((e) => {
            ToastAndroid.showWithGravity("There was some error, check your internet connection", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            //this.props.dispatch(LeavesState.showError(e));         
            this.props.dispatch(LeavesState.showApplyButton(true));
            this.props.dispatch(LeavesState.toggleProgress(false));
            console.log(e);
        });

    };

}



const styles = StyleSheet.create({

    linearGradient: {
        flex: 1,
        flexDirection: 'column',
    },

    plainText: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 15,
        color: '#fff'

    },

    basicPickerButton: {
        backgroundColor: '#d7d7d7',
        paddingLeft: 5,
        marginBottom: 10
    },

    customPickerPadding: {
        paddingTop: 12,
        paddingBottom: 12
    },

    basicText: {
        flex: 1,
        backgroundColor: "transparent",
        paddingLeft: 5,
        textAlign: 'left', color: "#000000", fontSize: 16,
    },

    basicCalenderView: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        backgroundColor: '#d7d7d7',
        marginBottom: 10,
        marginRight: 10,
        justifyContent: 'flex-end'
    },

    scrollView: {
        backgroundColor: 'transparent',
        height: 800,
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15
    }
});

export default LeavesView;
