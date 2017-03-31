import React, {PropTypes, Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    ListView,
    Platform,
    DatePickerIOS,
    TouchableHighlight
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

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.selector}>

                    <TouchableHighlight underlayColor="transparent" style={{width:50}} onPress={()=>{

                        }}>
                        <Icon
                            size={20}
                            color='#fff'
                            name= "angle-left"
                            style={{alignSelf:"center",marginTop:12,backgroundColor:"transparent"}}
                        />
                    </TouchableHighlight>


                    <View style={{flex:1}}>

                        {this._dateSelector()}

                    </View>


                    <TouchableHighlight underlayColor="transparent" style={{width:50}} onPress={()=>{

                        }}>
                        <Icon
                            size={20}
                            color='#fff'
                            name= "angle-right"
                            style={{alignSelf:"center",marginTop:12,backgroundColor:"transparent"}}
                        />
                    </TouchableHighlight>

                </View>

                <View style={styles.checklist}></View>

            </View>
        );
    }


    _dateSelector= () => {

        return(
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
    }
});

export default AdminDashboardView;
