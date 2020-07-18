import React,{useEffect} from 'react';
import { StyleSheet, Text, View,ScrollView, Dimensions } from 'react-native';
import MyHeader from './components/MyHeader';
import { TextInput,Card, List, Button } from 'react-native-paper';
import {theme} from './constants';
import { createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SearchScreen from './components/SearchScreen';
import HomeScreen from './components/HomeScreen';
import SettingScreen from './components/settings';
import AddFarm from  './components/addfarm'
import Plant from './components/plants'
import Pest from './components/pests'
import SideMenu from './components/sidemenu'
import {createDrawerNavigator} from 'react-navigation-drawer'
import Login from './components/LoginScreen'
import Signup from './components/SignupScreen'
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator} from 'react-navigation-stack';
import CameraPage from './components/image'
import Profile from './components/profile'
import fetchimages from './components/restaurantimages'
import Write from './components/writepost'
import ContactUs from './components/contactus'
import Posts from './components/posts'
import * as fire from 'firebase';
import NotificationsScreen from './components/notifications';
import ProfileScreen from './components/profile';
import ImagePickerExample from './components/uploadpic';
import ViewFarm from './components/viewFarm';
import HealthCheck from './components/healthcheck';
import AnimatedSplash from "react-native-animated-splash-screen";

import SelectImages from './DetectComp/SelectImages';
import UploadImages from './DetectComp/Uploading';
import Plants from './PAHcomp/Plants';
import SowingDate from './PAHcomp/SowingDate';
import Stages from './PAHcomp/Stages';
import PestDetection from './components/pestdet'
import UploadPest from './components/uploadPest'
import Welcome from './components/welcome'
import MainScreen from './components/main'

var firebaseConfig = {
  apiKey: "AIzaSyDkeSnOObjCEKe0BCsZhzlC3ysVL9oYftw",
  authDomain: "notifications-903a4.firebaseapp.com",
  databaseURL: "https://notifications-903a4.firebaseio.com",
  projectId: "notifications-903a4",
  storageBucket: "notifications-903a4.appspot.com"
};

if(!fire.app.length){
fire.initializeApp(firebaseConfig);

}

const navOptionHandler =(navigation) =>({
  headerShown:false
})

const imageOptionHandler = (navigation) =>{
  const options = navigation.navigationOptions = {
    headerShown:false
  }
  return options;
}

const PlanAHeadOptions = (navigation) =>{
  const options = navigation.navigationOptions = {
    headerShown:false,
    headerStyle:{
      height:65
    },
    headerTitle:'Plant Advisory'
  }
  return options;
}

console.disableYellowBox = true;


const stackNav = createStackNavigator({
 Home:{
   screen:MainScreen,
   navigationOptions:navOptionHandler
 },
 Home1:{
  screen:SelectImages,
  navigationOptions:navOptionHandler  
},
Home2:{
  screen:HomeScreen,
  navigationOptions:navOptionHandler  
},

PestDetection:{
  screen:SelectImages,
  navigationOptions:navOptionHandler
},
HealthCheck:{
  screen:SelectImages,
  navigationOptions:imageOptionHandler
},
 Search:{
   screen:SearchScreen,
   navigationOptions:navOptionHandler
 },
 Camera:{
   screen:CameraPage,
   navigationOptions:navOptionHandler
 },
 Upload:{
   screen:SelectImages,
   navigationOptions:navOptionHandler
 },
 Uploading:{
  screen:UploadImages,
  navigationOptions:navOptionHandler
},
 UploadPest:{
   screen:UploadPest,
   navigationOptions:navOptionHandler
 },
 Search:{
   screen:SearchScreen,
   navigationOptions:navOptionHandler
 },
 PlanAHead:{
   screen:Plants,
   navigationOptions:PlanAHeadOptions
 },
 Sowing:{
   screen:SowingDate,
   navigationOptions:PlanAHeadOptions
 }
})

const customOptions = ({navigation}) =>{
  const routes = navigation.state.routes;
  for(var x in routes){
    if(routes[x].routeName=="HealthCheck"||routes[x].routeName=="PlanAHead"){
      return {
        tabBarVisible:false,
      }
    }
  }
}


const TabNavigator = createBottomTabNavigator({
  "Home": {screen:stackNav,navigationOptions:customOptions},
  'Community':fetchimages,
  "Profile":ProfileScreen,
},
{defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `md-home`
  
      } else if (routeName === 'Detection') {
        iconName = `md-search`;
      }
      else if (routeName === 'Add Farm') {
        iconName = `md-add-circle`;
      }
      else if (routeName === 'Settings') {
        iconName = `md-settings`;
      }
      else if (routeName === 'Profile') {
        iconName = `md-person`;
      }
      else if (routeName === 'Community') {
        iconName = `md-people`;
      }
      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },

  }),

  tabBarOptions: {
    inactiveTintColor: theme.colors.black,
    activeTintColor: theme.colors.primary,
    labelStyle: {
      fontSize: 15,
    },
    style: {
      backgroundColor: 'white',
      marginBottom:5,
      marginLeft:2,
      marginRight:2,
      borderWidth:0.4,
      borderBottomLeftRadius:0,
      borderBottomRightRadius:0,
      borderColor:theme.colors.primary,
      borderTopColor:theme.colors.primary,
      borderRadius:5,
      marginTop:5
    },
  }
}
);
const MainStack = createStackNavigator({
  Home:{
    screen:TabNavigator,
    navigationOptions:navOptionHandler
  },
  Plant:{
    screen:Plant,
    navigationOptions:navOptionHandler
  },
  Pest:{
    screen:Pest,
    navigationOptions:navOptionHandler
  },
  Posts:{
    screen:fetchimages,
    navigationOptions:navOptionHandler
  },
  Write:{
    screen:ContactUs,
    navigationOptions:navOptionHandler
  },
  PostDetails:{
    screen:Posts,
    navigationOptions:navOptionHandler
  },
  ViewFarm:{
    screen:ViewFarm,
    navigationOptions:navOptionHandler
  },
  AddFarm:{
    screen:AddFarm,
    navigationOptions:navOptionHandler
  },
  Profile:{
    screen:ProfileScreen,
    navigationOptions:navOptionHandler
  },
  Settings:{
    screen:SettingScreen,
    navigationOptions:navOptionHandler
  }
},{initialRouteName:'Home'})

const appDrawer = createDrawerNavigator({
  drawer:MainStack,
  navigationOptions:navOptionHandler
},
{
  unmountInactiveRoutes:true,
  contentComponent:SideMenu,
  drawerWidth: Dimensions.get('window').width * 3/4
})

const authStack = createStackNavigator({
 
  Welcome:{
    screen:Welcome,
    navigationOptions:navOptionHandler
  },  Login:{
    screen:Login,
    navigationOptions:navOptionHandler
  },
  Signup:{
    screen:Signup,
    navigationOptions:navOptionHandler
  },
  
},{
 
})


const Mainapp = createSwitchNavigator({
  app:appDrawer,
  auth:authStack
},{
  initialRouteName:'auth'
})

const MainContainer =  createAppContainer(Mainapp);
class App extends React.Component {
  state = {
    isLoaded: false,
  }
 
  async componentDidMount() {
    // await loadAsync();
    this.setState({ isLoaded: true })
  }
 
  render() {
    return (
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/SmartSplash.jpg")}
        logoHeight={150}
        logoWidht={150}
      >
        <MainContainer screenProps={{ setAppLoaded: this.setAppLoaded }}/>
      </AnimatedSplash>
    )
  }
}
 
export default App