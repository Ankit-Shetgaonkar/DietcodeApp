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
    ActivityIndicator,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as AdminDashboardState from '../admin_dashboard/AdminDashboardState';
import * as officeApi from '../../office-server/OfficeApi';
class AdminDashboardView extends Component {

    static displayName = 'AdminDashboardView';

    static propTypes = {
        adminDashboardState: PropTypes.shape({
            showDatePicker: PropTypes.bool.isRequired
        }).isRequired,
        dispatch: PropTypes.func.isRequired
    };


    componentWillUnmount(){
        let date = new Date();
        this.props.dispatch(AdminDashboardState.setFilterDate(date));
    }

    componentDidMount() {
        // reset the local state of this view for the first time`
        this.props.dispatch(AdminDashboardState.resetScreen());
        let date = new Date();
        this.props.dispatch(AdminDashboardState.setFilterDate(date));

//        let date = typeof (this.props.adminDashboardState.filterDate) === 'string' ? new Date(this.props.adminDashboardState.filterDateString) : this.props.adminDashboardState.filterDate
            officeApi.getAllUserstimelineforDay(this.props.adminDashboardState.filterDateString).then((resp)=>{
            console.log(this._manipulateArrayList(resp.results));
            this.props.dispatch(AdminDashboardState.setTimelineData({data:this._manipulateArrayList(resp.results)}));
            this.props.dispatch(AdminDashboardState.loadinDataFromApi(false));
        }).catch((err)=>{
          alert(err);
        })

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
                                    this.props.dispatch(AdminDashboardState.setFilterDate(date));
                                    this._loadListData(date);
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
                this._loadListData(date);
            }
        } catch (message) {
            console.warn(`Error in example `, message);
        }
    };




    render() {
        const {dispatch,adminDashboardState} = this.props;

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dtaSource = {dataSource: ds.cloneWithRows(this.props.adminDashboardState.timelineData.data.length>0?this.props.adminDashboardState.timelineData.data:[])};

        return (
            <View style={styles.container}>

                <View style={styles.selector}>

                    <TouchableHighlight underlayColor="transparent" style={{ width: 50 }} onPress={() => {
                            this._clickPreviousDate(dispatch);
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
                            this._clickNextDate(dispatch);
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

                    {!this.props.adminDashboardState.showProgress &&  <ListView
                        {...dtaSource}
                        enableEmptySections={true}
                        renderRow={(rowData) =>
                        <TouchableHighlight underlayColor="transparent" style={{ flex:1 }} onPress={() => {
                                alert(rowData);
                           }}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                                <View style={{flex: .2, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center', alignItems: "center"}}>
                                                   <Image style={ styles.image } source={{ uri: rowData.image }}/>
                                                </View>
                                                <View style={{flex: .3, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <Text style={{backgroundColor:"transparent",color:"#999",fontSize:12}}> {rowData.name} </Text>
                                                </View>
                                                <View style={{flex: .25, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <Text style={{backgroundColor:"transparent",color:"#333",fontSize:16}}>Checkin </Text>
                                                    <Text style={{backgroundColor:"transparent",color:"#999",fontSize:12}}>{this._getTimeFromDate(rowData.timeline.checkinTime)} </Text>
                                                </View>
                                                <View style={{flex: .25, height: 70, flexDirection:'column', backgroundColor: '#fff', justifyContent: 'center'}}>
                                                    <Text style={{backgroundColor:"transparent",color:"#333",fontSize:16}}>Checkout </Text>
                                                    <Text style={{backgroundColor:"transparent",color:"#999",fontSize:12}}>{this._getTimeFromDate(rowData.timeline.checkoutTime)}</Text>
                                                </View>
                                            </View>
                                            </TouchableHighlight>
                            }
                    />}
                    
                    {this.props.adminDashboardState.showProgress &&  <ActivityIndicator style={styles.progressBar}
                                                        size="large"
                                                        color="blue"
                    />}

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

    _manipulateArrayList(results) {

        let newList = []
        let counter = 0;

        for(let i=0;i<results.length;i++){
                let userObject = {
                    userId: results[i].user.id,
                    name: results[i].user.firstName,
                    image: results[i].user.profileImage,
                    timeline:{
                        checkinTime:null,
                        checkoutTime:null,
                        checkinId:null,
                        checkoutId:null
                    }
                }



            let checkinTimeline = results[i].timeline.filter((t)=>{
             if(t.type==='checkin'){
                 return t;
             }

            });

            let checkoutTimeline = results[i].timeline.reverse().filter((t)=>{
                if(t.type==='checkout'){
                    return t;
                }

            });

            userObject.timeline.checkinTime = (checkinTimeline && checkinTimeline.length && checkinTimeline[0].createdAt) || null;
            userObject.timeline.checkoutTime = (checkoutTimeline && checkoutTimeline.length && checkoutTimeline[0].createdAt) || null;
            userObject.timeline.checkinId = (checkinTimeline && checkinTimeline.length && checkinTimeline[0].id) || null;
            userObject.timeline.checkoutId = (checkoutTimeline && checkoutTimeline.length && checkoutTimeline[0].id) || null;

            newList.splice(counter,0,userObject);
            counter++;
        }

        return newList;
    }

    _getTimeFromDate(checkinTime) {
        if (checkinTime === null){
            return "No Data";
        }
        let date = new Date(checkinTime);
        let hours = date.getHours();
        let minute = date.getMinutes();
        return hours+":"+minute;
    }

    _clickPreviousDate(dispatch) {
        let date = typeof (this.props.adminDashboardState.filterDate) === "string" ? new Date(this.props.adminDashboardState.filterDate):this.props.adminDashboardState.filterDate;
        date.setDate(date.getDate()-1);
        dispatch(AdminDashboardState.setFilterDate(date));
        this._loadListData(date);

    }

    _clickNextDate(dispatch) {
        let date = typeof (this.props.adminDashboardState.filterDate) === "string" ? new Date(this.props.adminDashboardState.filterDate):this.props.adminDashboardState.filterDate;
        date.setDate(date.getDate()+1);
        dispatch(AdminDashboardState.setFilterDate(date));
        this._loadListData(date);
    }

    _loadListData(date) {
        this.props.dispatch(AdminDashboardState.loadinDataFromApi(true));
        officeApi.getAllUserstimelineforDay(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()).then((resp)=>{
            console.log(this._manipulateArrayList(resp.results));
            this.props.dispatch(AdminDashboardState.setTimelineData({data:this._manipulateArrayList(resp.results)}));
            this.props.dispatch(AdminDashboardState.loadinDataFromApi(false));
        }).catch((err)=>{
            this.props.dispatch(AdminDashboardState.loadinDataFromApi(false));
            alert(err);
        })
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
    progressBar: {
        opacity: 1,
        alignSelf: "center",
        padding: 10,
        marginTop: 20,
        marginBottom: 20
    }
});

export default AdminDashboardView;
