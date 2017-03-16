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

} from 'react-native';

import * as WfhState from "./WfhState";
import Icon from 'react-native-vector-icons/FontAwesome';



const Item = Picker.Item;
// Customize bottom tab bar height here if desired
const TAB_BAR_HEIGHT = 50;

class WfhView extends Component {

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
        partOfDay: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };


    render() {
        return (
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0.0, 0.5, 1.0]}
                colors={['#60639f', '#5e73a1', '#5b87a3']} style={styles.linearGradient}>

                <Text style={styles.plainText}>
                    How many Days?
                </Text>

                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackground()}
                    underlayColor="transparent">

                    <View style={{
                        backgroundColor: '#d7d7d7',
                        borderRadius: 5,
                        paddingLeft: 5,
                        marginBottom: 10
                    }}>
                        <Picker
                            selectedValue={this.props.isSingleDay?"One Day":"Mulitple Days"}
                            onValueChange={(days) => this.props.dispatch(WfhState.updateNumberOfDays(days))}
                            mode="dropdown">
                            <Item label="One Day" value="One Day" />
                            <Item label="Mulitple Days" value="Mulitple Days" />

                        </Picker>
                    </View>

                </TouchableNativeFeedback>


                <Text style={styles.plainText}>
                    Half or Full day?
                </Text>


                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackground()}
                    underlayColor="transparent">

                    <View style={{
                        backgroundColor: '#d7d7d7',
                        borderRadius: 5,
                        paddingLeft: 5,
                        marginBottom: 10
                    }}>
                        <Picker
                         selectedValue={this.props.partOfDay}
                            onValueChange={(day) => this.props.dispatch(WfhState.updatePartOfDay(day))}
                            mode="dropdown">
                            <Item label="Full Day" value="Full Day" />
                            <Item label="First Half" value="First Half" />
                            <Item label="Second Half" value="Second Half" />

                        </Picker>
                    </View>

                </TouchableNativeFeedback>


                <Text style={styles.plainText}>
                    Select Date for WFH
                </Text>


                <View style={{ flexDirection: 'row' }}>

                    <TouchableNativeFeedback
                        title="DatePickerAndroid"
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={this.showFromPicker.bind(this, this.props.fromDate)}
                        underlayColor="transparent">

                        <View
                            style={{
                                flex: 0.5,
                                padding: 12, flexDirection: 'row', backgroundColor: '#d7d7d7',
                                borderRadius: 5,
                                marginBottom: 10,
                                marginRight: 10
                            }}
                        >


                            <Text style={{
                                flex: 1, backgroundColor: "transparent", alignSelf: "center",
                                paddingLeft: 5,
                                textAlign: 'left', color: "#000000", fontSize: 16, marginTop: 0
                            }}>{this.props.fromDateText}</Text>

                            <Icon
                                size={20}
                                color='#000'
                                name="calendar"
                                style={{ alignSelf: "center", backgroundColor: "transparent" }}
                            />
                        </View>
                    </TouchableNativeFeedback>


                    <TouchableNativeFeedback
                        title="DatePickerAndroid"
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={this.showToPicker.bind(this, this.props.toDate)}
                        underlayColor="transparent">

                        <View
                            style={{
                                flex: 0.5,
                                padding: 12, flexDirection: 'row', backgroundColor: '#d7d7d7',
                                borderRadius: 5,
                                marginBottom: 10,
                                marginRight: 10
                            }}
                        >


                            <Text style={{
                                flex: 1, backgroundColor: "transparent", alignSelf: "center",
                                paddingLeft: 5,
                                textAlign: 'left', color: "#000000", fontSize: 16, marginTop: 0
                            }}>{this.props.toDateText}</Text>

                            <Icon
                                size={20}
                                color='#000'
                                name="calendar"
                                style={{ alignSelf: "center", backgroundColor: "transparent" }}
                            />
                        </View>
                    </TouchableNativeFeedback>

                </View>

                {/*Apply Button*/}

                <View style={{ marginTop: 30 }}>

                    <View
                        style={this.props.showApplyButton ? styles.showButton : styles.hideButton}>

                        <Button
                            onPress={() => {
                                applyForWfh(this.props.dispatch)
                            }}
                            title="Apply work from home" />

                    </View>

                    <ActivityIndicator
                        style={this.props.showProgress ? styles.progressBar : styles.hideProgressBar}
                        size="large"
                        color="white"
                    />

                </View>


                <View style={{ marginTop: 100 }}>
                    <Button
                        onPress={() => {
                            this.props.dispatch(WfhState.showApplyButton(true));
                            this.props.dispatch(WfhState.toggleProgress(false))
                        }}
                        title="Mark Done" />

                </View>

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
                this.props.dispatch(WfhState.updateFromDate(date));
            }
        } catch ({ code, message }) {
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
                this.props.dispatch(WfhState.updateToDate(date));
            }
        } catch ({ code, message }) {
            console.warn(`Error in example `, message);
        }
    };

}


const onSelectDayClicked = (dispatch) => {
    console.log(this);
    //dispatch(WfhState.showNumberOfDaysPicker(true));
};

const applyForWfh = (dispatch) => {
    dispatch(WfhState.showApplyButton(false));
    dispatch(WfhState.toggleProgress(true));
    //dispatch(WfhState.reset());

    

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
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 15,
        color: '#fff'

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
    }
});

export default WfhView;
