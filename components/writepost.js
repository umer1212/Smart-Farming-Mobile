
import React,{useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,StyleSheet,Image,Dimensions
} from 'react-native';
import {theme} from '../constants';
const MainColor = theme.colors.primary;


const {width,height}=Dimensions.get('window');

const Write = (props) => {

  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('')
  const [passwor,setPasswor]=useState('')
  const [passwo,setPasswo]=useState('')

  const sendCred= async (props)=>{
    
    
     fetch("https://smartfarmingnodeserver.herokuapp.com/community",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "postTitle":setEmail,
        "postDescription":password,
        "category":passwor,
        "postedBy":passwo
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
             
              alert("Signup success")
            } catch (e) {
              Alert("error hai",e)
            }
     })
   
  }

 


  const validate =(props)=>{
    if(email==""){
      Alert("Enter Username")
    }
    else if(password==""){
      Alert("Enter Password")
    }
    else if (email != null && password !=null){
      sendCred(props);
    }
  
  }
  return (
   <> 
   {/* <KeyboardAvoidingView behavior="position">
     <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Text 
      style={{fontSize:35,marginLeft:18,marginTop:10,color:"#3b3b3b"}}>welcome to</Text>
      <Text 
      style={{fontSize:30,marginLeft:18,color:"blue"}}
      >Smart Farming</Text>
      <View
      style={{
        borderBottomColor:"blue",
        borderBottomWidth:4,
        borderRadius:10,
        marginLeft:20,
        marginRight:150,
        marginTop:4
      }}
       />
      <Text
      style={{
        fontSize:20,marginLeft:18,marginTop:20
      }}
      
      >create new account</Text>
      <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
      <TextInput
        label='password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
     
      />
      <Button 
        mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:18}}
       onPress={() => sendCred(props)}>
        signup
      </Button>
      <TouchableOpacity>
        <Text
      style={{
        fontSize:18,marginLeft:18,marginTop:20
      }}
      onPress={()=>props.navigation.replace("Login")}
      >already have a account ?</Text>
      </TouchableOpacity>
      
      </KeyboardAvoidingView> */}

<View style={{flex:1,backgroundColor:'white',justifyContent:'flex-end'}}>

  
      
      <View style={{...StyleSheet.absoluteFill}}>
        <Image 
        source={require('../assets/1234.jpg')}
        style={{flex:1,height:null,width:null}} />
      </View>
      

      <View style={{height:height/1,justifyContent:'center'}}>
      <View style={styles.button1}>
          <Text style={{fontSize:60,fontWeight:'bold',alignItems:'center',justifyContent:'center',color:'white',marginTop:-250}}>Smart Farming</Text>
        </View>
        <View>
        <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
      <TextInput
        label='password'
        mode="outlined"
        
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
     
      />
       <TextInput
        label='password'
        mode="outlined"
       
        value={passwor}
        onChangeText={(text)=>{setPasswor(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
     
      />
       <TextInput
        label='password'
        mode="outlined"
        
        value={passwo}
        onChangeText={(text)=>{setPasswo(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
     
      />
        </View>
        {/* <View style={styles.button}> */}
          <TouchableOpacity style={styles.button} onPress={() => sendCred(props)}>
          <Text style={{fontSize:20,fontWeight:'bold',alignItems:'center',justifyContent:'center'}}>Sign Up</Text>
          </TouchableOpacity>
        {/* </View> */}
        <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate("Posts")}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
      </View>
   </>
  );
  
    }

    const styles=StyleSheet.create({
      button:{
        
        height:70,
        marginHorizontal:20,
        borderRadius:35,
        alignItems:'center',
        marginTop:20,
        justifyContent:'center',
        backgroundColor:'lightblue'
      },
      button1:{
        
        height:70,
        marginHorizontal:20,
        
        alignItems:'center',
        marginTop:20,
        justifyContent:'center',
        
       
      }
    })
export default Write;
