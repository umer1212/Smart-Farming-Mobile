import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import axios from 'axios'
import MyHeader from './MyHeader'
import moment from 'moment'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Item,Input } from 'native-base';
import {theme} from '../constants';
const MainColor = theme.colors.primary;

const THEME_COLOR_KEY = 'theme_color';
export default class Posts extends Component {

    constructor() {
        super();
        this.state = {
          todos: [],
          comments: [],
          commentUsername: "",
          commentText: "",
          countup:'',
          countdown:'',
        };
      }

      colors = ['blue', 'green', 'red', 'purple'];

      componentDidMount(){
        this.loadAsyncData()
        this.getData()
    
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

        const id = await AsyncStorage.getItem('post')

          const response = await fetch('https://smartfarmingnodeserver.herokuapp.com/community/post/'+id);
          const data  = await response.json();
          
          this.setState({
            todos: data.results,
            countup:data.results.upvotes,
            countdown:data.results.downvotes,
          comments: data.results.comments
          }
          
          ,
          
          function() {
            this.arrayholder = data;
          }
          
          )
          
        }
 upvotes=async()=>{
   const a =this.state.todos.upvotes;
   this.setState({
    countup:this.state.countup + 1
   })
   fetch("https://smartfarmingnodeserver.herokuapp.com/community/upvote/",{
      method:"PUT",
      headers: {
       'Content-Type': 'application/json'
     }, body:JSON.stringify({
      postID:this.state.todos._id
    })
  
    })
      .then(res => {
      
        if(res.data.status == 1){
         console.log('done')
        }
      })
      .catch(error => {
        console.log(error);
      });
 }
 downvotes(){
   this.setState({
     countdown:this.state.countdown +1
     
   })
   this.down();

 }
 down = async()=>{
   const{postID} = this.state.todos
   console.log(postID)
   let data = {
    postID: this.state.todos.postID
  };
  fetch("https://smartfarmingnodeserver.herokuapp.com/community/downvote/",{
    method:"PUT",
    headers: {
     'Content-Type': 'application/json'
   },
   body:JSON.stringify({
     'postID':this.state.todos._id
   })
  })
    .then(res => {
    
      if(res.data.status == 1){
        alert("Downvoted Successfully")
        this.props.navigation.navigate('PostDetails')
      }
    })
    .catch(error => {
      console.log(error);
    });

  }
 

 uploadComment=async()=>{
  const un = await AsyncStorage.getItem('username')
 
  var data = {
    username: 'Umer',
    text: this.state.commentText,
    date: Date.now,
    postID: this.state.todos._id
  };
 alert(data)
  fetch("https://smartfarmingnodeserver.herokuapp.com/community/comment",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     }, body:JSON.stringify({
      'username': un,
      'text': this.state.commentText,
      'date': Date.now,
      'postID': this.state.todos._id
    })
  
    })
      .then(res => {
      
        if(res.data.status == 1){
          alert("Comment Posted Successfully")
          this.props.navigation.navigate('PostDetails')
        }
      })
      .catch(error => {
        console.log(error);
      });
 }

 isImage(){
   console.log(this.state.todos.image)
   if(this.state.todos.image == null){
    console.log('1')
    return(
      <Body>
      <Text>
      {this.state.todos.postDescription}
    </Text>
    </Body>
    )
   }
   else{
    console.log('2')
     return(<Body>
        <Image source={{uri:this.state.todos.image}} style={{height: 200, width: 200, flex: 1}}/>
        <Text>
                 {this.state.todos.postDescription}
                </Text>
        </Body>
        )   }
 }

  render() {
    const themeColorIndex = this.props.navigation.state.params ?
    this.props.navigation.state.params.themeIndex : 0;
  const a = this.colors[themeColorIndex]
    
      const urii = this.state.todos.image
      const comm = this.state.comments
      
      const {datePosted} = this.state.todos

      

      const datee = new Date(Number(datePosted)).toDateString()
      // console.log(datee)
      // console.log(date)
      
      // console.log(a)

    
    
     const commentss=  comm.map(function(comment){
                    
       return( 

        
           <Card >
             
             
       <CardItem >
    <Text>Username : {comment.username}</Text>
        </CardItem>
        <CardItem button>
          <Body>
            <Text>
            Comment: {comment.text}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer button >
       <Text>{new Date(Number(comment.date)).toDateString()}</Text>
        </CardItem>
        </Card>
       )
     })
     
    return (
      <Container>
       <MyHeader title="Community"  navigation={this.props.navigation} isHome={false} color={a}/>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../assets/person.png')} />
                <Body>
                <Text style={{fontWeight:'bold'}}>{this.state.todos.postedBy}</Text>
                  <Text>{this.state.todos.postTitle}</Text>
    <Text note>{new Date(Number(datePosted)).toDateString()}</Text>
                </Body>
              </Left>
            </CardItem>
           {this.isImage()}
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}} onPress={()=>this.upvotes()}>
                  <Icon name="thumbs-up" />
    <Text>{this.state.countup}</Text>
                </Button>
                <Button transparent textStyle={{color: '#87838B'}} onPress={()=>this.downvotes()}>
                  <Icon name="thumbs-down" />
                  <Text>{this.state.countdown}</Text>
                </Button>
              </Left>
            </CardItem>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold'}}>Comments Section</Text>
            {commentss}
            <Item rounded style={{marginTop:10}}>
            <Input style={{marginTop:10}} onChangeText={(text)=>this.setState({commentText:text})} placeholder='Add a Comment'/>
          </Item>
          <Button rounded style={{marginTop:15,backgroundColor:MainColor,width:100,alignSelf:'flex-end',alignContent:'center',}} onPress={()=>this.uploadComment()}>
            <Text style={{marginLeft:15}}>Post</Text>
          </Button>
          </Card>
        </Content>
        {/* <Content >
        {commentss}
         
        </Content> */}
    
      </Container>
    );
  }
}