import React,{useEffect,useState} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import LinearGradient from "react-native-linear-gradient";
import {
  ActivityIndicator,
 AsyncStorage
} from 'react-native';
import MyHeader from './MyHeader'
//import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Item,Input } from 'native-base';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
const ProfileScreen = (props) => {
   const [email,setEmail] = useState("loading")
   const[address,setAddress] = useState("loading")
   const[phone,setPhone] = useState("loading")
   const Boiler = async ()=>{
      const token = await AsyncStorage.getItem("token")
      
    fetch('http://192.168.1.2:3001/name',{
    headers:new Headers({
      Authorization:"Bearer "+token
    })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      setEmail(data.email),
      setPhone(data.phone),
      setAddress(data.address)
      
      AsyncStorage.setItem('username',data.email)
      
    }
    )
   }
useEffect(()=>{
   Boiler()
},[])
 

  

  return (
   <> 

   {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:18}}>Hello {email}</Text>
    </View> */}
    
       <MyHeader title="Profile" navigation={props.navigation}  isHome={true}  color="#2BDA8E" />
        {/* <Content>
          <Card style={{flex: 0}}>
            <CardItem style={{height:250}}>
              <Left>
                <Thumbnail source={require('../assets/person.png')} style={{height:80,width:90}} />
                <Body>
                <Text style={{fontSize:30,fontWeight:'bold'}}>Name : {email}</Text>
                  <Text style={{marginTop:20}}>Address: {address}</Text>
    <Text note style={{marginTop:10}}>Phone : {phone}</Text>
                </Body>
              </Left>
            </CardItem>
            </Card>
            </Content> */}
            <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require("../assets/header_detail.png")}
          style={{flex:1, alignItems:'center'}}
          resizeMode={"stretch"}
        >
          <View style={styles.image_container}>
              <Image 
               source={require("../assets/person.png")}
                style={styles.image}
              />
          </View>
        
        </ImageBackground>
        <ScrollView style={styles.footer}>
            <View style={styles.status}>
                <Text style={{color:'green'}}>Name</Text>
            </View>
            <Text style={styles.textPrice}>{email}</Text>
            <View style={styles.status}>
                <Text style={{color:'green'}}>Phone</Text>
            </View>
            <Text numberOfLines={2} style={styles.textName}>{phone}</Text>
            <View style={styles.status}>
                <Text style={{color:'green'}}>Address</Text>
            </View>

          <Text  style={styles.textDetail}>{address}</Text>
            {/* <LinearGradient
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}} 
            colors={['#009245', '#8cc631']}
            style={styles.button}
            >
              <Text style={styles.textOrder}>ORDER NOW</Text>
            </LinearGradient> */}
        </ScrollView>
           
   
   </>
  );
};
const height = Dimensions.get("screen").height;
const height_image = height * 0.5 * 0.5;

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white'
  },
  footer: {
    flex:1,
    paddingHorizontal:40
  },
  image_container: {
    width: height_image,
    height: height_image,
    marginTop: height_image/3
  },
  image: {
    width:'100%',
    height:'100%',
    borderWidth:5,
    borderColor:'white',
    borderRadius: height_image/2
  },
  back:{
    position:'absolute',
    left:0,
    marginTop:30,
    marginLeft:15
  },
  status: {
    width:100,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderRadius:50,
    paddingVertical:3,
    borderColor:'green',
    marginTop:10
  },
  textPrice: {
    color:'green',
    fontWeight:'bold',
    fontSize:60,
    marginTop:10
  },
  textName: {
    color: '#3e3c3e',
    fontSize:45,
    marginTop:10
  },
  textDetail: {
    color:'gray',
    marginTop:15
  },
  button: {
    justifyContent:'center',
    alignItems:'center',
    marginTop:30,
    paddingVertical:10,
    borderRadius:100
  },
  textOrder: {
    color:'white',
    fontWeight:'bold',
    fontSize:18
  }
});



export default ProfileScreen;