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
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as AdminDashboardState from '../admin_dashboard/AdminDashboardState';

class AdminDashboardView extends Component {

    static displayName = 'AdminDashboardView';

    static propTypes = {
        adminDashboardState: PropTypes.shape({
            showDatePicker: PropTypes.bool.isRequired
        }).isRequired,
        dispatch: PropTypes.func.isRequired
    };


    componentWillMount() {
        // reset the local state of this view for the first time`
        this.props.dispatch(AdminDashboardState.resetScreen());

    }

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
                //this.props.dispatch(WfhState.updateFromDate());
            } else {
                var date = new Date(year, month, day);
                this.props.dispatch(AdminDashboardState.setFilterDate(date));
            }
        } catch (message) {
            console.warn(`Error in example `, message);
        }
    };




    render() {
        const {dispatch,adminDashboardState} = this.props;

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dtaSource = {dataSource: ds.cloneWithRows(["test1","test2","test3","test4"])};

        return (
            <View style={styles.container}>

                <View style={styles.selector}>

                    <TouchableHighlight underlayColor="transparent" style={{ width: 50 }} onPress={() => {
                            let date = typeof (this.props.adminDashboardState.filterDate) === "string" ? new Date(this.props.adminDashboardState.filterDate):this.props.adminDashboardState.filterDate;
                            date.setDate(date.getDate()-1);
                            dispatch(AdminDashboardState.setFilterDate(date));
                    }}>
                        <Icon
                            size={20}
                            color='#fff'
                            name="angle-left"
                            style={{ alignSelf: "center", marginTop: 15, backgroundColor: "transparent" }}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" style={{ flex:1 }} onPress={() => {
                        {(Platform.OS === 'android') && this.showFromPicker()}
                        {(Platform.OS === 'ios') && dispatch(AdminDashboardState.toggleDatePicker());}
                    }}>
                    <View style={{flex:1 ,backgroundColor:"transparent",justifyContent:"center"}}>
                        <Text style={{color:"#ffffff",fontSize:20,alignSelf:"center"}}>{
                            this.props.adminDashboardState.filterDateString
                        }</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" style={{ width: 50 }} onPress={() => {
                            let date = typeof (this.props.adminDashboardState.filterDate) === "string" ? new Date(this.props.adminDashboardState.filterDate):this.props.adminDashboardState.filterDate;
                            date.setDate(date.getDate()+1);
                            dispatch(AdminDashboardState.setFilterDate(date));
                    }}>
                        <Icon
                            size={20}
                            color='#fff'
                            name="angle-right"
                            style={{ alignSelf: "center", marginTop: 15, backgroundColor: "transparent" }}
                        />
                    </TouchableHighlight>
                    { this.renderDateModal() }
                </View>

                <View style={styles.checklist}>

                    <ListView
                        {...dtaSource}
                        enableEmptySections={true}
                        renderRow={(rowData) =>
                        <TouchableHighlight underlayColor="transparent" style={{ flex:1 }} onPress={() => {
                                alert(rowData);
                           }}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                                <View style={{flex: .2, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center', alignItems: "center"}}>
                                                   <Image style={ styles.image } source={{ uri: "https://lh4.googleusercontent.com/-wLDL5bCoI1U/AAAAAAAAAAI/AAAAAAAACsk/q1Y0JeSP8OE/photo.jpg" }}/>
                                                </View>
                                                <View style={{flex: .3, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <Text style={{backgroundColor:"transparent",color:"#999",fontSize:12}}> Divyanshu negi </Text>
                                                </View>
                                                <View style={{flex: .25, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <Text style={{backgroundColor:"transparent",color:"#333",fontSize:16}}>Checkin </Text>
                                                    <Text style={{backgroundColor:"transparent",color:"#999",fontSize:12}}>09:30 AM </Text>
                                                </View>
                                                <View style={{flex: .25, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <Text style={{backgroundColor:"transparent",color:"#333",fontSize:16}}>Checkout </Text>
                                                    <Text style={{backgroundColor:"transparent",color:"#999",fontSize:12}}>06:30 PM </Text>
                                                </View>
                                            </View>
                                            </TouchableHighlight>
                            }
                    />

                </View>

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
    image: {
        height: 40,
        marginTop: 5,
        width: 40,
        borderRadius: 20
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
