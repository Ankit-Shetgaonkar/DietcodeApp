import React, {PropTypes, Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


class TimelineView extends Component {

    static displayName = 'TimelineView';

    static propTypes = {
        //TODO add props for this view
    };


    render() {
        return (
            <View style={styles.container}>

                <View style={{flex:0.4}}>
                    <Image
                        source={require('../../../images/mountain.jpg')}
                        resizeMode="cover"
                        style={styles.header}>
                        <View style={{flex:0.6,flexDirection:"row",alignItems:"center"}}>

                            <Text style={{backgroundColor:"transparent",color:"#fff",fontSize:36,margin:10,fontWeight:"bold"}}>28</Text>
                            <View>
                                <Text style={{backgroundColor:"transparent",color:"#fff",fontSize:26}}>Monday</Text>
                                <Text style={{backgroundColor:"transparent"}}>Febuary 2017</Text>
                            </View>

                            <View style={{flex:1,alignItems:"center"}}>
                            <TouchableHighlight onPress={function()
                                                {

                                                }}
                                                underlayColor="transparent"
                            >
                            <View
                                style={{backgroundColor:"#2CCA29",paddingRight:20,paddingLeft:20,paddingTop:7,paddingBottom:7,borderRadius:4,elevation:5,shadowColor: '#000000',shadowOffset: {width: 0,height: 3},shadowRadius: 5,shadowOpacity: 0.5}}
                            ><Text style={{color:"#ffffff"}}>Checkin</Text></View>
                                </TouchableHighlight>
                                </View>

                        </View>
                        <View style={{flex:0.4,flexDirection:"row"}}>

                            <View style={{alignItems:"center",margin:20}}>
                                <Text style={{backgroundColor:"transparent",fontSize:12,color:"#ffffff"}}>Last Checkin</Text>
                                <Text style={{backgroundColor:"transparent",marginTop:5,fontSize:10,color:"#ffffff"}}>no data</Text>
                            </View>
                            <View style={{alignItems:"center",margin:20}}>
                                <Text style={{backgroundColor:"transparent",fontSize:12,color:"#ffffff"}}>Last Checkout</Text>
                                <Text style={{backgroundColor:"transparent",marginTop:5,fontSize:10,color:"#ffffff"}}>no data</Text>
                            </View>
                        </View>
                    </Image>

                    </View>

                <View style={styles.timelineListContainer}></View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#0000ff"
    },
    header: {
        flex: 1,
        flexDirection: "column",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width:null,
        height:null,
        backgroundColor: "#00ff00"
    },
    timelineListContainer: {
        flex: 0.6,
        backgroundColor: "#fff"
    }
});

export default TimelineView;
