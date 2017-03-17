import React, { PropTypes, Component } from 'react';
import {
    TouchableHighlight,
    NavigationExperimental,
    View,
    Navigator,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    Dimensions,
    Switch,
    Platform,
    Image,
    Picker
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RealmDatabse from '../database/RealmDatabase';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


class ProfileView extends Component {

    static displayName = 'ProfileView';

    static propTypes = {

    };

    render() {
        let userObj = RealmDatabse.findUser()[0];
        return (
            <View style={styles.baseContainer}>

                <LinearGradient
                    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                    locations={[0.0,0.5,1.0]}
                    colors={['#48E2FF', '#508FF5', '#5933EA']}
                    style={{flex:1}}>

                    <Image style={ styles.image } source={{ uri: userObj.image_link }}/>
                    <Text style={ {backgroundColor:"transparent",fontSize:20,color:"#fff",alignSelf:"center"} } >{userObj.name}</Text>
                    <Text style={ {backgroundColor:"transparent",fontSize:16,color:"#fff",alignSelf:"center"} } >{userObj.email}</Text>
                    <Text style={ {backgroundColor:"transparent",fontSize:14,opacity:0.8,color:"#fff",alignSelf:"center"} } >http://dietco.de</Text>
                </LinearGradient>

                <Button title="Logout" style={{alignSelf:"center" ,color:"#ff0000",backgroundColor:"#ff0000"}} onPress = {()=>{
                        console.log("cant login");
                }}>Logout</Button>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    showPicker:{
        opacity : 1
    },
    baseContainer:{
        flex:1
    },
    image:{
        margin:50,
        alignSelf:"center",
        height:120,
        width:120,
        borderRadius:60

    }

});

export default ProfileView;