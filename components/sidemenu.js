import React from 'react'
import {View,Image,SafeAreaView,ScrollView,StyleSheet,AsyncStorage} from 'react-native';
import{Text,List, ListItem,Icon} from 'native-base'
import {theme} from '../constants';

class SideMenu extends React.Component {
  state = {
    info: {
      name: "loading!!",
      temp: "loading!!",
      humidity: "loading!!",
      desc: "loading!!",
      icon: "loading!!",
      tmax: "",
      tmin: "",
      wind: "",
      vis: "",
    },
  };

  async getWeather() {
    city = await AsyncStorage.getItem("city");
    if (!city) {
      city = this.props.navigation.getParam("city", "islamabad");
    }

    //Mycity = await AsyncStorage.getItem("city")
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=05c7525886db4ae6a5db7943450d1e8c`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          info: {
            name: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            tmax: data.main.temp_max,
            tmin: data.main.temp_min,
            vis: data.visibility,
            wind: data.wind.speed,
          },
        });
      })
      .catch((err) => {
        Alert.alert("Error" + err.message, [{ text: "ok" }]);
      });
  }

  componentDidMount(){
      this.getWeather();
  }

  logout = (props) => {
    AsyncStorage.removeItem("token").then(() => {
      this.props.navigation.navigate("Welcome");
    });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ ...StyleSheet.absoluteFill }}>
          <Image
            source={require("../assets/illustration_1.png")}
            style={{ flex: 1, height: null, width: null, opacity: 0.3 }}
          />
        </View>
        <View style={styles.view}>
          <Image source={require("../assets/icon.png")} style={styles.img} />
        </View>
        <ScrollView>
          <List>
            <ListItem onPress={() => this.props.navigation.navigate("Plant")}>
              <Text>Plants</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate("Pest")}>
              <Text>Pests</Text>
            </ListItem>
            <ListItem
              onPress={() => this.props.navigation.navigate("ViewFarm")}
            >
              <Text>My Farms</Text>
            </ListItem>
            <ListItem
              onPress={() => this.props.navigation.navigate("Home2")}
            >
              <Text>Weather</Text>
            </ListItem>
            <ListItem
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <Text>Settings</Text>
            </ListItem>
            <ListItem
              noborder
              style={{ bottom: 0 }}
              onPress={() => this.logout()}
            >
              <Text>Log Out</Text>
            </ListItem>
          </List>
        </ScrollView>
        <View style={styles.footerContainer}>
            <View style={{flexDirection:'row',height:100}}>
                <View style={{flex:0.5}}>
                    <Text style={{padding:3,fontSize:15,fontWeight:'bold'}}>{this.state.info.desc.toUpperCase()} in 
                        <Text style={{color:theme.colors.primary}}> {this.state.info.name.toUpperCase()}.</Text>
                    </Text>
                    <Text style={{padding:3,fontWeight:'bold',fontSize:10,paddingBottom:0}}>Winds at {this.state.info.vis} mph</Text>
                    <Text style={{padding:3,fontWeight:'bold',fontSize:10}}>Max visibility {this.state.info.wind} m</Text>
                </View>
                <View style={{flex:0.5}}>
                    <Image style={{width:100,height:'90%',resizeMode:'stretch',alignSelf:'center'}}
                    source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}} />
                    <Text style={{textAlign:'center',textAlignVertical:'top',fontWeight:'bold',marginTop:-20}}>{this.state.info.temp}° | {this.state.info.humidity+' '}
                        <Text style={{color:theme.colors.primary}}>
                            DRY.
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    view:{
      
        justifyContent:'center',
        alignItems:'center',
        height:150
    },
    img:{
        height:120,
        width:120,
        borderRadius:60
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'transparent',
    },
})

export default SideMenu;