import React from 'react' ;
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,TouchableHighlight,FlatList,Image,Alert,AsyncStorage, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left, Body, Right } from 'native-base';

import MyHeader from './MyHeader'
import { SearchBar } from 'react-native-elements';
import {theme} from '../constants';
const MainColor = theme.colors.primary;
const THEME_COLOR_KEY = 'theme_color';
 export default class ViewFarm extends React.Component{
    constructor(){
            super();
            this.state = {
              data : [],
              isLoading: true, 
              user:'',
              refreshing:false,
              plants:[]
            }
            this.arrayholder = [];
          }

          colors = ['blue', 'green', 'red', 'purple'];
        componentDidMount(){
          this.loadAsyncData()
          this.getData();
          console.disableYellowBox = true;

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
      
        getData = async()=>{
          console.log('hello1')
          // const {user} = this.state
          // console.log(user)
          const un = await AsyncStorage.getItem('username')
            const response = await fetch('https://smartfarmingnodeserver.herokuapp.com/farmer/getFarms/'+ un);
            const data  = await response.json();
              console.log(data)
              console.log(data.latitude)
            this.setState({
              data:data,
              isLoading: false,
              plants:data.plants
              
            }
           
            )
          }  

          
          
     render(){
      const themeColorIndex = this.props.navigation.state.params ?
      this.props.navigation.state.params.themeIndex : 0;
    const a = this.colors[themeColorIndex]


         return(
          
<Container style={{backgroundColor:'white'}}>
<View style={{...StyleSheet.absoluteFill}}>
        <Image 
        source={require('../assets/plants_2.png')}
        style={{flex:1,height:null,width:null,opacity:0.3}} />
      </View>
<MyHeader title="My Farms"  navigation={this.props.navigation} color={'#2BDA8E'}/>
<Button rounded success style={{position:'absolute',bottom:10,right:8,alignItems:'center',alignContent:'center',justifyContent:'center' ,zIndex:10,width:60,height:60,backgroundColor:MainColor}} onPress={()=>this.props.navigation.navigate('AddFarm')}>
          
          <Icon name='add' />
        
          {/* <Text style={{textAlign:'center',justifyContent:'center'}}>Add Post</Text> */}
          {/* <Right></Right> */}
        </Button>
<Content>


    
    <FlatList
     data = {this.state.data}
     renderItem = {({item}) =>
          <Card  style={{borderColor:'#006400', borderRadius:30, borderBottomRightRadius:30, borderBottomLeftRadius:30,height:350}}>
            <CardItem  style={{backgroundColor:''}}>
              <Left>
                {/* <Thumbnail source={{uri:item.image}}/> */}
                <Body>
                  <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold'}}>{item.name}</Text>
                  <View style={styles.status}>
                <Text style={{color:'green'}}>Area:</Text>
            </View>
         <Text note numberOfLines={2} style={{marginTop:2,fontSize:20}}> {item.area} sqm</Text>
         <View style={styles.status}>
                <Text style={{color:'green'}}>Latitude:</Text>
            </View>
         <Text note numberOfLines={2} style={{marginTop:2,fontSize:20}}> {item.latitude}</Text>
         <View style={styles.status}>
                <Text style={{color:'green'}}>Longitude:</Text>
            </View>
         <Text note numberOfLines={2} style={{marginTop:2,fontSize:20}}> {item.longitude}</Text>
         <View style={styles.status}>
                <Text style={{color:'green'}}>Plants:</Text>
            </View>
         <Text note numberOfLines={2} style={{marginTop:2,fontSize:20}}>{item.plants}</Text>
         
                </Body>
              </Left>
            </CardItem> 
            
    
          </Card> 
    }
  
    keyExtractor={(item, index) => index.toString()}
     
     />

</Content>

</Container>

         )
     }
 }
 
 var styles = StyleSheet.create({

  status: {
    width:100,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderRadius:25,
    
    borderColor:'green',
    marginTop:15,
    
  }





 });







