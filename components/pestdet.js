import React,{Component} from 'react';
import { StyleSheet,  View ,ScrollView, Alert, AsyncStorage,Image,ImageBackground} from 'react-native';
import MyHeader from './MyHeader';
import { Card ,Title} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Header, Content, Button, Icon, Text } from 'native-base';
import AlertPro from "react-native-alert-pro";



const SHOW_NOTIFICATIONS_KEY = 'notifications';
const THEME_COLOR_KEY = 'theme_color';
export default class PestDetection extends React.Component {
   

    colors = ['blue', 'green', 'red', 'purple'];


 

componentDidMount(){
  
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
   
   
        
  return (
    <ScrollView>
    <View style={styles.container}>
      
      <MyHeader title="Pest Detection" color={'#2BDA8E'} isHome={false} navigation={this.props.navigation}/>
      
      <Card style={{margin:20}}>
    
    <Card.Content >
      <Title style={{fontSize:30}}>Pest Detection</Title>
      <Title style={{fontSize:20,marginTop:20}}>Take a Picture of Your Crop to detect Pest!</Title>
      
    </Card.Content>
    <Card.Cover source={ require('../assets/plant.jpg')} />
  
  </Card>

  <View style={{flexDirection:'row'}}>

  <Button rounded style={{width:140,alignItems:'center',marginLeft:20,backgroundColor:'#32CD32'}} onPress={()=>this.props.navigation.navigate('UploadPest')}>
            
            <Text>Upload Picture</Text>
          </Button>

 

          
      <Button rounded style={{width:170,alignItems:'center',marginLeft:70,backgroundColor:'#32CD32',justifyContent:'center'}}onPress={()=>this.props.navigation.navigate('Camera')}>
            <Icon name='camera'/>
            <Text >Take Picture</Text>
          </Button>

          
          


          </View>

    
     
      </View>

      </ScrollView>

  );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
  
    },
    text:{
        textAlign:'center',
        marginBottom:10,
        color:'white',
        fontSize:22
    }
  });
  