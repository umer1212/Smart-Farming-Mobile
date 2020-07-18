import React from 'react' ;
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,TouchableHighlight,FlatList,Image,Alert,AsyncStorage, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left, Body, Right } from 'native-base';

import MyHeader from './MyHeader'

import { SearchBar } from 'react-native-elements';
import {theme} from '../constants';
const MainColor = theme.colors.primary;
const THEME_COLOR_KEY = 'theme_color';


 export default class fetchimages extends React.Component{
    constructor(){
            super();
            this.state = {
              data : [],
              isLoading: true, 
              search: '' ,
              refreshing:false
            }
            this.arrayholder = [];
          }
          colors = ['blue', 'green', 'red', 'purple'];
        componentDidMount(){
          this.loadAsyncData()
          this.getData()
          console.disableYellowBox = true;

        }

      
        getData = async()=>{
          console.log('hello1')
            const response = await fetch('https://smartfarmingnodeserver.herokuapp.com/community');
            const data  = await response.json();
              console.log('hello2')
            this.setState({
              data:data,
              isLoading: false,
              dataSource: data,
            },
            function() {
              this.arrayholder = data;
            }
            )
          }  
          search = text => {
            console.log(text);
          };
          clear = () => {
            this.search.clear();
          };
          SearchFilterFunction(text) {
            const newData = this.arrayholder.filter(function(item) {
              const itemData = item.postTitle ? item.postTitle.toUpperCase() : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            this.setState({
              dataSource: newData,
              search: text,
            });
          }
          getListViewItem = async(item) => {
            console.log(item._id)
         const res=   await AsyncStorage.setItem('post',item._id)
         
            this.props.navigation.navigate("PostDetails")
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
         
     render(){
      const themeColorIndex = this.props.navigation.state.params ?
      this.props.navigation.state.params.themeIndex : 0;
    const a = this.colors[themeColorIndex]
         return(
          
<Container style={{backgroundColor:'white'}}>
<MyHeader title="Community"  isHome={true} navigation={this.props.navigation} color={'#2BDA8E'}/>

        <Button rounded success style={{position:'absolute',bottom:10,right:8,alignItems:'center',alignContent:'center',justifyContent:'center' ,zIndex:10,width:60,height:60,backgroundColor:MainColor}} onPress={()=>this.props.navigation.navigate('Write')}>
          
            <Icon name='add' />
          
            {/* <Text style={{textAlign:'center',justifyContent:'center'}}>Add Post</Text> */}
            {/* <Right></Right> */}
          </Button>
<Content>
    <SearchBar
          round
          containerStyle={{backgroundColor:'white',shadowColor:'white'}}
          inputContainerStyle={{backgroundColor:'#00D2D3',borderColor:'white'}}
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Search Post"
          value={this.state.search}
        />
    <FlatList
     data = {this.state.dataSource}
     renderItem = {({item}) =>
          <Card onPress={this.getListViewItem.bind(this, item)} style={{borderColor:'#00D2D3',marginTop:20, borderTopColor:'#00D2D3', borderRadius:8,borderTopLeftRadius:30,borderTopRightRadius:30, borderBottomRightRadius:30, borderBottomLeftRadius:30,height:320,width:'95%',marginLeft:9}}>
            <CardItem onPress={this.getListViewItem.bind(this, item)} >
              <Left>
                {/* <Thumbnail source={{uri:item.image}}/> */}
                <Body>
                  <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>{item.postTitle}</Text>
                  <Text  style={{marginTop:10,color:'grey',width:130,fontSize:12}}> Posted by : {item.postedBy}</Text>
         <Text  numberOfLines={3} style={{marginTop:20}}>{item.postDescription}</Text>
                </Body>
              </Left>
            </CardItem> 
           
            
            <CardItem  style={{marginTop:0}} >
              <Left>
                <Button transparent >
                  <Icon active name="heart" />
         <Text  onPress={this.getListViewItem.bind(this, item)} style={{color:'red',fontSize:17,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}}> View Details</Text>
                </Button>
         
              </Left>
              <Button transparent textStyle={{color: '#87838B'}} >
                  <Icon name="thumbs-up" />
    <Text>{item.upvotes}</Text>
                </Button>
                <Button transparent textStyle={{color: '#87838B'}} >
                  <Icon name="thumbs-down" />
                  <Text>{item.downvotes}</Text>
                </Button>
            </CardItem>
          </Card> 
    }
    onRefresh={()=>this.handlerefresh()}
    refreshing={this.state.refreshing}
    keyExtractor={(item, index) => index.toString()}
     
     />

</Content>

</Container>

         )
     }
 }
 







