'use_strict';

import React, { PropTypes, Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    Platform,
    Dimensions,
    AppRegistry,
    DatePickerIOS,
    TimePickerAndroid,
    TouchableHighlight,
    Modal,
    Button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RealmDatabse from '../../database/RealmDatabase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';
import * as SettingsState from './SettingsState';

var isModalVisible = false

class SettingsView extends Component {

    static displayName = 'SettingsView';

    constructor() {
        super();
        // constructor called in initialization of this screen.
    }

    static propTypes = {
        settingsState: PropTypes.shape({
            showPicker: PropTypes.bool.isRequired
        }).isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        // called when the component is mounted
    }

    render() {
        console.log('PROPS: ' + JSON.stringify(this.props) + ' TIME: ' + JSON.stringify((new Date((new Date().getFullYear()), (new Date().getMonth()), (new Date().getDate()), 0, 0, 0, 0))));
        let dateToDisplay = new Date(this.props.settingsState.time);
        console.log('dateToDisplay: ' + dateToDisplay.getHours());
        return (
            <LinearGradient 
                style={styles.linearGradient} 
                colors={['#48E2FF', '#508FF5', '#5933EA']} 
                start={{x: 0.0, y: 0.0}} 
                end={{x: 1.0, y: 1.0}}
                locations={[0.0, 0.5, 1.0]}>
                <View style={styles.center}>
                    <ScrollView style={styles.scrollView} automaticallyAdjustContentInsets={false} horizontal={false} contentContainerStyle={styles.scrollviewContentContainerStyle}>
                        <View style={{flex: 1, backgroundColor: 'transparent', alignItems: 'flex-start', width: Dimensions.get('window').width}}>
                            <Text style={styles.headingText}>
                                Settings
                            </Text>
                            <Text style={styles.subHeadingText}>
                                Checkin Notification Alert Time:
                            </Text>
                            <View style={{height: 50, marginLeft: 16, marginRight: 16, backgroundColor: '#d3d3d3', alignItems: 'flex-start', width: (Dimensions.get('window').width-32), borderRadius: 4, marginBottom: 8}}>
                                <TouchableHighlight style={{flex: 1, width: (Dimensions.get('window').width-32), borderRadius: 4}} underlayColor='#d3d3d3' activeOpacity={0.7} onPress={() => {Platform.OS === 'ios' ? this.props.dispatch(SettingsState.showPickerView(!this.props.settingsState.showPicker)) : this.showAndroidPicker()}}>
                                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center'}}>
                                        <Icon size={26} color='#000000' name={"clock-o"} style={styles.iconStyle} />
                                        <Text style={styles.textInput_TextStyle}>{(dateToDisplay.getHours() > 12 ? (dateToDisplay.getHours() - 12) : dateToDisplay.getHours()) + ':' + dateToDisplay.getMinutes() + ' ' + (dateToDisplay.getHours() > 12 ? 'pm' : 'am')}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <Text style={styles.subHeadingText}>
                                Office Co-ordinates:
                            </Text>
                            <Modal animationType={'slide'} visible={Platform.OS === 'ios' ? this.props.settingsState.showPicker : false} transparent={true} onRequestClose={() => {console.log('DID CLOSE MODAL BY CLICKING DONE')}}>
                                <View style={{flex:1, backgroundColor:'transparent'}}>
                                </View>
                                <View style={{backgroundColor:'#d7d7d7', alignItems: 'flex-end', height: 40, justifyContent: 'center'}}>
                                    <View style={{ backgroundColor: 'transparent', borderRadius: 2 }}>
                                        <Button title={'Done'} accessibilityLabel={'Finish selection of time.'} color={'#000080'} onPress={() => {this.props.dispatch(SettingsState.showPickerView(!this.props.settingsState.showPicker))}}/>
                                    </View>
                                </View>
                                <DatePickerIOS style={{backgroundColor: '#d7d7d7'}} date={dateToDisplay} mode={'time'} onDateChange={(date) => {this.updateTime(date)}}/>
                            </Modal>
                        </View>
                    </ScrollView>                 
                </View>
            </ LinearGradient>
        );
    }

  updateTime(time) {
      this.props.dispatch(SettingsState.updateDateTime(time));
  }

  showAndroidPicker = async (options) => {
      let date = new Date(this.props.settingsState.time);
      this.props.dispatch(SettingsState.showPickerView(!this.props.settingsState.showPicker));
      const {action, hour, minute} = await TimePickerAndroid.open({
          hour: date.getHours(),
          minute: date.getMinutes(),
          is24Hour: false,
      });
      if (action === TimePickerAndroid.timeSetAction) {
          var updatedDate = new Date();
          updatedDate.setHours(hour);
          updatedDate.setMinutes(minute);
          this.props.dispatch(SettingsState.updateDateTime(updatedDate));
      } else {
          this.props.dispatch(SettingsState.showPickerView(!this.settingsState.showPicker));
      }
  }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    test: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    linearGradient: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    scrollView: {
        backgroundColor: 'transparent',
        width: Dimensions.get('window').width
    },
    scrollviewContentContainerStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    headingText: {
            marginTop: 16,
            marginBottom: 8,
            marginLeft: 8,
            marginRight: 8,
            textAlign: 'left',
            color: '#ffffff',
            fontSize: 28,
            backgroundColor:"transparent",
            fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Roboto',
            textDecorationLine: 'underline'
        },
    subHeadingText: {
            marginTop: 8,
            marginBottom: 8,
            marginLeft: 8,
            marginRight: 8,
            textAlign: 'left',
            color: '#ffffff',
            fontSize: 18,
            backgroundColor:"transparent",
            fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Roboto'
    },
    textInput_TextStyle: {
            marginTop: 2,
            marginBottom: 2,
            marginRight: 4,
            marginLeft: 4,
            textAlign: 'left',
            color: '#000000',
            fontSize: 16,
            backgroundColor:"transparent",
            fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Roboto'
    },
    iconStyle: {
            alignSelf:"center",
            marginTop: 2,
            marginBottom: 2,
            marginLeft: 16,
            marginRight: 8,
            backgroundColor: 'transparent'
        }
});

export default SettingsView;