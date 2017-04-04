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
    Modal,
    Image,
    TimePickerAndroid,
    ActivityIndicator
} from 'react-native';

import * as officeApi from '../../office-server/OfficeApi';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as AdminDashboardState from '../admin_dashboard/AdminDashboardState';

class AdminDashboardView extends Component {

    static displayName = 'AdminDashboardView';

    static propTypes = {
        adminDashboardState: PropTypes.shape({
            showDatePicker: PropTypes.bool.isRequired,
            showEditModal: PropTypes.bool.isRequired
        }).isRequired,
        dispatch: PropTypes.func.isRequired
    };

    renderEditModal = () => {

        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.adminDashboardState.showEditModal}
                onRequestClose={() => { this.props.dispatch(AdminDashboardState.toogleEditModal()) }}>

                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{
                        flex: 1, flexDirection: 'column', backgroundColor: '#d7d7d7',
                        height: 250, marginLeft: 20, marginRight: 20, alignSelf: 'center', borderRadius: 12
                    }}>

                        <View style={{
                            alignSelf: 'flex-end',
                            justifyContent: 'flex-start'
                        }}>

                            <TouchableHighlight underlayColor="transparent" style={{ width: 50 }} onPress={() => {
                                this.props.dispatch(AdminDashboardState.toogleEditModal());
                            }}>
                                <Icon
                                    size={20}
                                    color='#464763'
                                    name="close"
                                    style={{ alignSelf: "center", marginTop: 15, backgroundColor: "transparent" }}
                                />
                            </TouchableHighlight>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={[styles.circularImage]} source={{ uri: 'https://media.gqindia.com/wp-content/uploads/2015/11/gq-monica-belluci-22.jpg' }} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Monica Belluccci</Text>
                        </View>

                        <View style={{ flex: 0.5, flexDirection: 'row' }}>

                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', padding: 2 }}>Check in</Text>

                                {Platform.OS === 'android' &&
                                    !this.props.adminDashboardState.editModalCheckInshowProgress &&
                                    <View style={{ flex: 1, marginBottom: 5, alignItems: 'center' }}>
                                        <Button
                                            onPress={() => {
                                                this.showCheckinTimePicker("58c149b159a4cc83cff1909d");
                                            }}
                                            color='#464763'
                                            title={this.props.adminDashboardState.editModalCheckinText} />
                                    </View>
                                }

                                {Platform.OS === 'ios' &&
                                    !this.props.adminDashboardState.editModalCheckInshowProgress &&
                                    <View style={{ flex: 1, backgroundColor: '#464763', marginBottom: 5, alignItems: 'center' }}>
                                        <Button
                                            onPress={() => {
                                                this.props.dispatch(AdminDashboardState.toogleEditModalCheckinPicker());
                                            }}
                                            color='#ffffff'
                                            title={this.props.adminDashboardState.editModalCheckinText} />
                                    </View>
                                }

                                {this.props.adminDashboardState.editModalCheckInshowProgress &&
                                    <ActivityIndicator
                                        size="small"
                                        color="white"
                                    />
                                }

                            </View>


                            

                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', padding: 2 }}>Check out</Text>
                                {Platform.OS === 'android' &&
                                    !this.props.adminDashboardState.editModalCheckoutshowProgress &&
                                    <View style={{ flex: 1, marginBottom: 5, alignItems: 'center' }}>
                                        <Button
                                            onPress={() => {
                                                this.showCheckoutTimePicker();
                                            }}
                                            color='#464763'
                                            title={this.props.adminDashboardState.editModalCheckoutText} />
                                    </View>
                                }

                                {Platform.OS === 'ios' &&
                                    !this.props.adminDashboardState.editModalCheckoutshowProgress &&
                                    <View style={{ flex: 1, backgroundColor: '#464763', marginBottom: 5, alignItems: 'center' }}>
                                        <Button
                                            onPress={() => {
                                                this.props.dispatch(AdminDashboardState.toogleEditModalCheckoutPicker());
                                            }}
                                            color='#ffffff'
                                            title={this.props.adminDashboardState.editModalCheckoutText} />
                                    </View>
                                }

                                {this.props.adminDashboardState.editModalCheckoutshowProgress &&
                                    <ActivityIndicator
                                        size="small"
                                        color="white"
                                    />
                                }
                            </View>

                        </View>
                        {/*{Platform.OS === 'android' &&
                            <View style={{ marginBottom: 5, alignItems: 'center' }}>
                                <Button
                                    onPress={() => {
                                        this.props.dispatch(AdminDashboardState.toogleEditShowProgress());
                                    }}
                                    color='#464763'
                                    title="Update Time" />
                            </View>
                        }

                        {Platform.OS === 'ios' &&
                            <View style={{ backgroundColor: '#464763', marginBottom: 5 }}>
                                <Button
                                    onPress={() => {
                                        this.props.dispatch(AdminDashboardState.toogleEditShowProgress());
                                    }}
                                    color='#ffffff'
                                    title="Update Time" />
                            </View>
                        }*/}

                    </View>
                </View>

            </Modal>
        )
    }

    showCheckinTimePicker = async (checkinId) => {
        this.props.dispatch(AdminDashboardState.toogleEditModalCheckoutProgress());
        let _options = {
            is24Hour: false
        }

        if (this.props.adminDashboardState.editModalCheckinHour !== -1) {
            _options = {
                is24Hour: false,
                hour: this.props.adminDashboardState.editModalCheckinHour,
                minute: this.props.adminDashboardState.editModalCheckinMins,
            }
        }

        try {
            const { action, hour, minute } = await TimePickerAndroid.open(_options);
            if (action === TimePickerAndroid.dismissedAction) {
                //do nothing
            } else {
                let date = new Date(this.props.adminDashboardState.filterDate);
                date.setHours(hour, minute, 0);
                this.props.dispatch(AdminDashboardState.toogleEditModalCheckinProgress());
                officeApi.adminUpdateCheckinCheckoutTime(checkinId, date).then((resp) => {
                    alert("Successfully Updated Checkin Time");
                }).catch((exp)=> {
                    alert("Error, "+exp)
                }).then(() => {
                    this.props.dispatch(AdminDashboardState.toogleEditModalCheckinProgress());
                });
                this.props.dispatch(AdminDashboardState.updateEditModalCheckinTime(hour, minute));
            }
        } catch (message) {
            console.warn(`Error in example `, message);
        }
    };

    showCheckoutTimePicker = async (checkoutId) => {
        let _options = {
            is24Hour: false
        }

        if (this.props.adminDashboardState.editModalCheckoutHour !== -1) {
            _options = {
                is24Hour: false,
                hour: this.props.adminDashboardState.editModalCheckoutHour,
                minute: this.props.adminDashboardState.editModalCheckoutMins,
            }
        }

        try {
            const { action, hour, minute } = await TimePickerAndroid.open(_options);
            if (action === TimePickerAndroid.dismissedAction) {
                //do nothing
            } else {
                let date = new Date(this.props.adminDashboardState.filterDate);
                date.setHours(hour, minute, 0);
                this.props.dispatch(AdminDashboardState.toogleEditModalCheckoutProgress());
                officeApi.adminUpdateCheckinCheckoutTime(checkoutId, date).then((resp) => {
                    alert("Successfully Updated Checkout Time");
                }).catch((exp)=> {
                    alert("Error, "+exp)
                }).then(() => {
                    this.props.dispatch(AdminDashboardState.toogleEditModalCheckoutProgress());
                });
                this.props.dispatch(AdminDashboardState.updateEditModalCheckoutTime(hour, minute));
                //TODO: make api call
            }
        } catch (message) {
            console.warn(`Error in example `, message);
        }
    };

    renderDateModal = () => {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.props.adminDashboardState.showDatePicker}
                onRequestClose={() => { this.props.dispatch(AdminDashboardState.toggleDatePicker()) }}>

                <View style={{ flex: 1, backgroundColor: '#000000', opacity: .6 }} />

                <View style={{ backgroundColor: '#d7d7d7' }}>
                    <View style={{ alignSelf: 'flex-end', backgroundColor: '#d7d7d7' }}>
                        <Button
                            onPress={() => {
                                this.props.dispatch(AdminDashboardState.toggleDatePicker());
                            }}
                            title="Done" />
                    </View>
                </View>

                <DatePickerIOS
                    style={{ backgroundColor: '#d7d7d7', paddingBottom: 10, paddingLeft: 10 }}
                    date={typeof (this.props.adminDashboardState.filterDate) === 'string' ? new Date() : this.props.adminDashboardState.filterDate}
                    mode="date"
                    onDateChange={(date) => {
                        this.props.dispatch(AdminDashboardState.setFilterDate(date))
                    }}
                />

            </Modal>
        )
    }


    /**Show Android From Date Picker */
    showFromPicker = async (options) => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: typeof (this.props.adminDashboardState.filterDate) === 'string' ? new Date() : this.props.adminDashboardState.filterDate
            });
            if (action === DatePickerAndroid.dismissedAction) {
                //do nothing
            } else {
                var date = new Date(year, month, day);
                this.props.dispatch(AdminDashboardState.setFilterDate(date));
            }
        } catch (message) {
            console.warn(`Error in example `, message);
        }
    };




    render() {
        const { dispatch, adminDashboardState } = this.props;
        return (
            <View style={styles.container}>

                {this.renderEditModal()}

                <View style={styles.selector}>

                    <TouchableHighlight underlayColor="transparent" style={{ width: 50 }} onPress={() => {

                    }}>
                        <Icon
                            size={20}
                            color='#fff'
                            name="angle-left"
                            style={{ alignSelf: "center", marginTop: 15, backgroundColor: "transparent" }}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" style={{ flex: 1 }} onPress={() => {
                        { (Platform.OS === 'android') && this.showFromPicker() }
                        { (Platform.OS === 'ios') && dispatch(AdminDashboardState.toggleDatePicker()); }
                    }}>
                        <View style={{ flex: 1, backgroundColor: "transparent", justifyContent: "center" }}>
                            <Text style={{ color: "#ffffff", fontSize: 20, alignSelf: "center" }}>{
                                this.props.adminDashboardState.filterDateString
                            }</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" style={{ width: 50 }} onPress={() => {

                    }}>
                        <Icon
                            size={20}
                            color='#fff'
                            name="angle-right"
                            style={{ alignSelf: "center", marginTop: 15, backgroundColor: "transparent" }}
                        />
                    </TouchableHighlight>
                    {this.renderDateModal()}
                    {this.renderEditModalCheckinPicker()}
                    {this.renderEditModalCheckoutPicker()}
                </View>

                <View style={styles.checklist}></View>

                <Button
                    onPress={() => {
                        this.props.dispatch(AdminDashboardState.toogleEditModal());
                    }}
                    title="Show Modal" />
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

    renderEditModalCheckinPicker = () => {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.props.adminDashboardState.editModalShowCheckinPicker}
                onRequestClose={() => { this.props.dispatch(AdminDashboardState.toogleEditModalCheckinPicker()) }}>

                <View style={{ flex: 1, backgroundColor: '#000000', opacity: .6 }} />

                <View style={{ backgroundColor: '#d7d7d7' }}>
                    <View style={{ alignSelf: 'flex-end', backgroundColor: '#d7d7d7' }}>
                        <Button
                            onPress={() => {
                                this.props.dispatch(AdminDashboardState.toogleEditModalCheckinPicker());
                                //TODO: make api call
                                Api.adminUpdateCheckinCheckoutTime
                            }}
                            title="Done" />
                    </View>
                </View>

                <DatePickerIOS
                    style={{ backgroundColor: '#d7d7d7', paddingBottom: 10, paddingLeft: 10 }}
                    date={new Date()}
                    mode="time"
                    onDateChange={(date) => {
                        alert("Getting some date" + date);
                    }}
                />

            </Modal>
        );
    }

    renderEditModalCheckoutPicker = () => {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.props.adminDashboardState.editModalShowCheckoutPicker}
                onRequestClose={() => { this.props.dispatch(AdminDashboardState.toogleEditModalCheckoutPicker()) }}>

                <View style={{ flex: 1, backgroundColor: '#000000', opacity: .6 }} />

                <View style={{ backgroundColor: '#d7d7d7' }}>
                    <View style={{ alignSelf: 'flex-end', backgroundColor: '#d7d7d7' }}>
                        <Button
                            onPress={() => {
                                this.props.dispatch(AdminDashboardState.toogleEditModalCheckoutPicker());
                                //TODO: make api call
                            }}
                            title="Done" />
                    </View>
                </View>

                <DatePickerIOS
                    style={{ backgroundColor: '#d7d7d7', paddingBottom: 10, paddingLeft: 10 }}
                    date={new Date()}
                    mode="time"
                    onDateChange={(date) => {
                        alert("Getting some date" + date);
                    }}
                />

            </Modal>
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
    circularImage: {
        height: 80,
        width: 80,
        borderRadius: 40
    }
});

export default AdminDashboardView;
