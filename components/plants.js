import React from 'react' ;
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,TouchableHighlight,FlatList,Image,Alert,AsyncStorage, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left, Body, Right } from 'native-base';
import {theme} from '../constants';
import MyHeader from './MyHeader'
import { SearchBar } from 'react-native-elements';
const THEME_COLOR_KEY = 'theme_color';
 export default class Plant extends React.Component{
    constructor(){
            super();
            this.state = {
              data : [],
              isLoading: true, 
              user:'',
              refreshing:false,
              plants:[],
              filteredData:[],
              search:""
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
            const response = await fetch('https://smartfarmingnodeserver.herokuapp.com/plant/');
            const data  = await response.json();
              
            this.setState({
              data:data,
              isLoading: false,
              plants:data.plants,
              filteredData:data
            }
           
            )
          }  

          SearchFilterFunction(text) {
            const newData = this.state.data.filter(function (item) {
              const itemData = item.plantName
                ? item.plantName.toUpperCase()
                : "".toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            this.setState({
              filteredData: newData,
              search: text,
            });
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
<MyHeader title="Plants"  navigation={this.props.navigation} color={'#2BDA8E'}/>
<SearchBar
          round
          containerStyle={{backgroundColor:'white',shadowColor:'white'}}
          inputContainerStyle={{borderColor:'white',backgroundColor:'#00D2D3'}}
          searchIcon={{ size: 24, color: theme.colors.primary }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Type a Plant Name"
          value={this.state.search}
          />
    <FlatList
     data = {this.state.filteredData}
     renderItem = {({item}) =>
     <Card center middle shadow
                style={{
                  backgroundColor: "white",
                  margin: "4%",
                  borderWidth: 1,
                }}>
                {/* HEADING BAR */}
                <View style={{ flexDirection: "row", elevation: 2 }}>
                  <View style={{ flex: 0.6 }}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        padding: 6,
                        color:theme.colors.primary
                      }}>
                      {item.plantName.toUpperCase()}.
                    </Text>
                    <Text
                      style={{
                        backgroundColor: theme.colors.primary,
                        marginLeft: 3,
                        padding: 5,
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}>
                      Season: {item.season.toUpperCase()}
                    </Text>
                    <Text
                      style={{
                        // backgroundColor: theme.colors.accent,
                        marginLeft: 3,
                        padding: 5,
                        color: 'black',
                        fontWeight: "bold",
                        textAlign: "center",
                      }}>
                      {item.description.split('.')[0]}.
                    </Text>
                  </View>
                  <Thumbnail
                    source={{ uri: item.plantImage }}
                    style={{
                      height: "100%",
                      flex: 0.4,
                      padding: 6,
                      margin: 2,
                      borderRadius: 5,
                    }}
                  />
                </View>
                {/* DIAGONOSTICS */}
                <View style={{ margin: 3, marginTop: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        flex: 0.3,
                        height: 30,
                        backgroundColor: theme.colors.primary,
                        padding: 4,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                      }}>
                      Pest Found
                    </Text>
                    <Text
                      style={{
                        flex: 0.7,
                        textAlign: "justify",
                        textAlignVertical:'center',
                        margin: 5,
                        marginTop: 0,
                        fontSize:15,
                        fontWeight:'bold'
                      }}>
                      {item.pests}
                    </Text>
                  </View>
                </View>
                {/* PREVENTIONS */}
                <View style={{ margin: 3 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        flex: 0.3,
                        height: 30,
                        backgroundColor: theme.colors.primary,
                        padding: 4,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                      }}>
                      Description
                    </Text>
                    <Text
                      style={{
                        flex: 0.7,
                        textAlign: "justify",
                        margin: 5,
                        marginTop: 0,
                      }}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </Card>
    }
    keyExtractor={(item, index) => index.toString()}
     
     />
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
    marginTop:10,
    
  }





 });