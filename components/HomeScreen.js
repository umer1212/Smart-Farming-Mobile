import React,{Component} from 'react';
import { StyleSheet,  View ,ScrollView, Alert, AsyncStorage,Image,ImageBackground} from 'react-native';
import MyHeader from './MyHeader';
import { Card ,Title} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Header, Content, Button, Icon, Text } from 'native-base';
import {theme} from '../constants';
const MainColor = theme.colors.primary;


const SHOW_NOTIFICATIONS_KEY = 'notifications';
const THEME_COLOR_KEY = 'theme_color';
export default class HomeScreen extends React.Component {
    state={
        info:{
            name:"loading!!",
            temp:"loading!!",
            humidity:"loading!!",
            desc:"loading!!",
            icon:"loading!!",
            tmax:'',
            tmin:'',
            wind:'',
            vis:''
        }
    }

    colors = ['blue', 'green', 'red', 'purple'];
    async getWeather(){
      city = await AsyncStorage.getItem("city")
      if(!city){
        city=this.props.navigation.getParam('city','islamabad')
      }

    //Mycity = await AsyncStorage.getItem("city")
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=05c7525886db4ae6a5db7943450d1e8c`)
      .then(res=>res.json())
      .then(data=>{
          this.setState({
            info:{

            name:data.name,
            temp:data.main.temp,
            humidity:data.main.humidity,
            desc:data.weather[0].description,
            icon:data.weather[0].icon,
            tmax:data.main.temp_max,
            tmin:data.main.temp_min,
            vis:data.visibility,
            wind:data.wind.speed
          }
      })
    

}).catch(err=>{
    Alert.alert("Error"+err.message,[{text:"ok"}])
})
}   

componentDidMount(){
    this.getWeather()
    this.loadAsyncData();
    this.username();
 
}
loadAsyncData = async () => {
    

    try {
      const themeColorIndex = await AsyncStorage.getItem(THEME_COLOR_KEY)
      
      if (themeColorIndex !== null) {
        this.props.navigation.setParams({ themeIndex: JSON.parse(themeColorIndex) });
      }
    } catch (e) {
      console.log(e)
    }

    
  }

  username = async() =>{
    const un = await AsyncStorage.getItem('username')
    console.log(un)
  }


    render(){
        const themeColorIndex = this.props.navigation.state.params ?
        this.props.navigation.state.params.themeIndex : 0;
      const a = this.colors[themeColorIndex]
   
    if(this.props.navigation.getParam('city')){
        this.getWeather()
    }
        
  return (
    <ScrollView>
      
    <View style={styles.container}>
    <View style={{...StyleSheet.absoluteFill}}>
        <Image 
        source={require('../assets/plants_2.png')}
        style={{flex:1,height:null,width:null,opacity:0.3}} />
      </View>
   
      
      <MyHeader title="Health Check" color={'#2BDA8E'} isHome={false} navigation={this.props.navigation}/>
      {/* <Custom title="Current Weather" color={a} navigation={this.props.navigation} isHome={true}/> */}
      {/* <Card style={{margin:20}}>
    
    <Card.Content >
      <Title style={{fontSize:30}}>Health Check</Title>
      <Title style={{fontSize:20,marginTop:20}}>Take a Picture of Your Crop to detect Disease!</Title>
      
    </Card.Content>
    <Card.Cover source={ require('../assets/plant.jpg')} />
  
  </Card> */}

  {/* <View style={{flexDirection:'row'}}>

  <Button rounded style={{width:140,alignItems:'center',marginLeft:20,backgroundColor:'#006400'}} onPress={()=>this.props.navigation.navigate('Upload')}>
            
            <Text>Upload Picture</Text>
          </Button>

 

          
      <Button rounded style={{width:170,alignItems:'center',marginLeft:70,backgroundColor:'#006400',justifyContent:'center'}}onPress={()=>this.props.navigation.navigate('Camera')}>
            <Icon name='camera'/>
            <Text >Take Picture</Text>
          </Button>

          
          


          </View> */}
        
          <Text style={styles.title}>Weather</Text>

      <Card style={{margin:20,backgroundColor:MainColor}}>
    
          <View style={{padding:20,alignItems:"center"}}>
          <Title style={styles.text}>{this.state.info.name}</Title>
            <Image style={{width:120,height:120}}
            source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}} />
            <Title style={styles.text}>Temparature :{this.state.info.temp}</Title>
            <Title style={styles.text}> Description :{this.state.info.desc}</Title>
           
            <Title style={styles.text}> Humidity :{this.state.info.humidity}</Title>
          </View>
       

      </Card>
      <View>
      <Text style={styles.heading}>Additional Info</Text>
      <View style={styles.texttt}>
        <Text style={styles.maininfo}> Max Temp: <Text style={styles.ainfo}>{this.state.info.tmax} 'C</Text></Text>
        <Text style={styles.maininfo}> Min Temp: <Text style={styles.ainfo}>{this.state.info.tmin} 'C</Text></Text>
        
      </View>
      <View style={styles.texttt}>
      <Text style={styles.maininfo}> Wind: <Text style={styles.ainfo}></Text>{this.state.info.vis}m</Text>
        <Text style={styles.maininfo}>   Visibility: <Text style={styles.ainfo}>{this.state.info.wind}m/h</Text></Text>
      </View>
      </View>
      <Button rounded style={{marginTop:25,width:170,alignItems:'center',marginLeft:110,backgroundColor:MainColor,justifyContent:'center'}}onPress={()=>this.props.navigation.navigate('Search')}>
            <Icon name='md-options'/>
            <Text >Select City</Text>
          </Button>

 
     
      </View>

      </ScrollView>

  );
}
}

const styles = StyleSheet.create({
    container: {
     
      backgroundColor: '#f4f4f4',
  
    },
    heading:{
      fontSize:22,
      fontFamily:'Arial',
      textAlign:'left',
      marginVertical:15,
      fontWeight:'900',
      marginLeft:15,
      fontWeight:'bold'
    },
    texttt:{
      flexDirection:'row',
      marginVertical:10,
      justifyContent:'space-between',
      margin:25
    },
    ainfo:{
      fontWeight:'400',
     
    },
    maininfo:{
      fontWeight:'900',
      color:'#333'
    },
    title:{
      marginTop:10,
      alignSelf:'center',
      fontSize:30,
      fontWeight:'bold'
    },
    text:{
        textAlign:'center',
        marginBottom:10,
        color:'white',
        fontSize:22
    }
  });
  