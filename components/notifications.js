import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import * as fire from 'firebase';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import MyHeader from './MyHeader';
import { Button } from 'react-native-paper';



export default class NotificationsScreen extends React.Component{
    constructor(){
        super();
        console.ignoredYellowBox = [
            'Setting a timer'
            ]
        
    }
    state={
        token:''
    }

   async componentDidMount(){
        console.log("hey")
        // await this.registerForPushNotifications()
        this.readUserData()
        
        
    }
    readUserData() {
        fire.database().ref('tokens/').once('value', function (snapshot) {
            // console.log(snapshot.val())
            var tasks = [];;
           snapshot.forEach((child=>{
            const a = (child.val().tok);
          
            let response = fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to:child.val().tok,
                sound:'default',
                title:'aur sunao',
                body:'mai thek tm btao!'
              
            }),
          });
             
              
           }))
        
            
        });
    }

    sendNotification= ()=>{
      let response =   fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to:'',
                sound:'default',
                title:'Umer',
                body:'Demo Notification'
              
            }),
          });
    }

    // registerForPushNotifications = async () => {
    // const { status: existingStatus } = await Permissions.getAsync(
    //   Permissions.NOTIFICATIONS
    // );
    // let finalStatus = existingStatus;

    // // only ask if permissions have not already been determined, because
    // // iOS won't necessarily prompt the user a second time.
    // if (existingStatus !== 'granted') {
    //   // Android remote notification permissions are granted during the app
    //   // install, so this will only ask on iOS
    //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //   finalStatus = status;
    // }

    // // Stop here if the user did not grant permissions
    // if (finalStatus !== 'granted') {
    //   return;
    // }

  
    //   // Get the token that uniquely identifi 
    //   try{
    //   let token =await Notifications.getExpoPushTokenAsync();

    //   console.log("hello")
    //   console.log(token);
       
    //     fire.database().ref('tokens/').push().set({
    //         tok:token
    //     });

    //   }
    //   catch(e){
    //       console.log("error"+e)
    //   }

    // }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader />
                <Text>
                    Hello
                </Text>
                <Button onPress={this.readUserData} >Press me</Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
  
    }
})