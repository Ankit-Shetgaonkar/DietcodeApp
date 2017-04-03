import React, { PropTypes, Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    ListView,
    Platform,
    DatePickerIOS,
    DatePickerAndroid,
    TouchableHighlight,
    TouchableNativeFeedback,
    Modal
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class AdminDashboardView extends Component {

    static displayName = 'AdminDashboardView';

    static propTypes = {
        // timeLineState: PropTypes.shape({
        //     lastCheckin: PropTypes.string.isRequired,
        //     errorMessage: PropTypes.string.isRequired,
        //     checkin: PropTypes.bool.isRequired,
        //     lastCheckout: PropTypes.string.isRequired,
        //     timelineData: PropTypes.shape({
        //         data: PropTypes.array.isRequired
        //     }).isRequired
        // }).isRequired,
        // switchTab: PropTypes.func.isRequired
    };

    static propTypes = {
        wfhState: PropTypes.shape({
            fromDateText: PropTypes.string.isRequired,
            showFromDatePicker: PropTypes.bool.isRequired,
        }).isRequired,
        dispatch: PropTypes.func.isRequired

    };

    renderSelectDate = (flexWeight) => {

        return (
            <View style={{ flex: flexWeight }}>

                <Text style={styles.plainText}>
                    Select Date
                </Text>


                {/*Android Picker From Date*/}
                {(Platform.OS === 'android') &&
                    <TouchableNativeFeedback
                        title="DatePickerAndroid"
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={this.showFromPicker.bind(this, this.props.wfhState.fromDate)}
                        underlayColor="transparent">


                        <View
                            style={styles.basicCalenderView}>
                            <Text style={styles.basicText}>{this.props.wfhState.fromDateText}</Text>
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
                    <View style={{ flex: 1 }}>
                        <TouchableHighlight
                            onPress={() => this.props.dispatch(WfhState.updateFromDatePicker(true))}
                            underlayColor="transparent">


                            <View
                                style={[styles.basicCalenderView]}>
                                <Text style={[styles.basicText]}>{this.props.wfhState.fromDateText}</Text>
                                <Icon
                                    size={20}
                                    color='#000'
                                    name="calendar"
                                    style={{ backgroundColor: "transparent" }}
                                />
                            </View>
                        </TouchableHighlight>


                        <Modal
                            animationType={"none"}
                            transparent={true}
                            visible={this.props.wfhState.showFromDatePicker}
                            onRequestClose={() => { this.props.dispatch(WfhState.updateFromDatePicker(false)) }}>

                            <View style={{ flex: 1, backgroundColor: '#000000', opacity: .6 }} />

                            <View style={{ backgroundColor: '#d7d7d7' }}>
                                <View style={{ alignSelf: 'flex-end', backgroundColor: '#d7d7d7' }}>
                                    <Button
                                        onPress={() => {
                                            this.props.dispatch(WfhState.updateFromDatePicker(false));
                                        }}
                                        title="Done" />
                                </View>
                            </View>

                            <DatePickerIOS
                                style={{ backgroundColor: '#d7d7d7', paddingBottom: 10, paddingLeft: 10 }}
                                date={typeof (this.props.wfhState.fromDate) === 'string' ? new Date() : this.props.wfhState.fromDate}
                                mode="date"
                                onDateChange={(date) => {
                                    this.props.dispatch(WfhState.updateFromDate(date))
                                }}
                            />

                        </Modal>
                    </View>
                }
            </View>
        )
    }


    /**Show Android From Date Picker */
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
        } catch (message) {
            console.warn(`Error in example `, message);
        }
    };



    /**
     * Full screen Dialog/Modal which enables the admin to edit or enter the checkin checkout time
     * for the selected date
     */
    renderEditModal = () => {
        <Modal
            style = {{padding: 50}}
            animationType={"none"}
            transparent={true}
            visible={this.props.wfhState.showFromDatePicker}
            onRequestClose={() => { this.props.dispatch(WfhState.updateFromDatePicker(false)) }}>

            <View style={{ flex: 1, backgroundColor: '#000000', opacity: .6 }} />

            <View style={{ backgroundColor: '#d7d7d7' }}>
                <View style={{ alignSelf: 'flex-end', backgroundColor: '#d7d7d7' }}>
                    <Button
                        onPress={() => {
                            this.props.dispatch(WfhState.updateFromDatePicker(false));
                        }}
                        title="Done" />
                </View>
            </View>

        </Modal>
    }


    render() {
        return (
            <View style={styles.container}>

                {this.renderSelectDate(0.2)}

                {this.renderEditModal()}

                <View style={styles.selector}>

                    <TouchableHighlight underlayColor="transparent" style={{ width: 50 }} onPress={() => {

                    }}>
                        <Icon
                            size={20}
                            color='#fff'
                            name="angle-left"
                            style={{ alignSelf: "center", marginTop: 12, backgroundColor: "transparent" }}
                        />
                    </TouchableHighlight>



                    <TouchableHighlight underlayColor="transparent" style={{ width: 50 }} onPress={() => {

                    }}>
                        <Icon
                            size={20}
                            color='#fff'
                            name="angle-right"
                            style={{ alignSelf: "center", marginTop: 12, backgroundColor: "transparent" }}
                        />
                    </TouchableHighlight>

                </View>

                <View style={styles.checklist}></View>

            </View>
        );
    }


    _dateSelector = () => {

        return (
            <DatePickerIOS
                style={{ backgroundColor: '#d7d7d7', paddingBottom: 10, paddingLeft: 10 }}
                date={new Date()}
                mode="date"
                onDateChange={(date) => {

                }}
            />
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff"
    },
    selector: {
        flex: 0.1,
        flexDirection: "row",
        backgroundColor: "#333"
    },
    checklist: {
        flex: 0.9,
        flexDirection: "column",
        backgroundColor: "#fff"
    },
    plainText: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 15,
        color: '#fff'

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
});

export default AdminDashboardView;
