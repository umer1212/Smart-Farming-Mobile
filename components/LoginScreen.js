
import React,{useState,useEffect} from 'react';
import { TextInput} from 'react-native-paper';
import { theme } from '../constants';
import {
  View,

  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  StyleSheet,Dimensions,Image
} from 'react-native';

import { Button, Block, Text } from '../custom';

const {width,height}=Dimensions.get('window');

const LoginScreen = (props) => {
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('')
  
  useEffect(() => {
    const check = async()=>{
    try{
    const tok = await AsyncStorage.getItem('token')
    console.log(tok)
    if(tok !==null){
      props.navigation.navigate('Home')

    }
  }catch(e){
    console.log('There is an error')

  }}
  check()
  }, [])


  console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
  const sendCred = async (props)=>{

    if(email !== '' && password !==''){
    console.log("First")
    fetch("http://192.168.1.2:3001/signin",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "email":email,
       "password":password
     })
    })
    .then(res=>res.json())
    .then(async (data)=>{
        console.log('Response Received');
           try {
             await AsyncStorage.setItem('token',data.token)
            alert("login success")
            props.navigation.navigate('Home')

           } catch (e) {
             console.log("error hai",e)
              Alert("Error",e.toString());
           }
    })
  }
  else{
    alert('Please Fill in the Fields!s')
  }
 }


  return (
   <> 
  
      <View style={{flex:1,backgroundColor:'white'}}>

      <View style={{...StyleSheet.absoluteFill}}>
        <Image 
        source={require('../assets/plants_2.png')}
        style={{flex:1,height:null,width:null,opacity:0.3}} />
      </View>
        
      
   
      

      <View style={{height:height/1,justifyContent:'center'}}>
      <Block>
        <Block center bottom flex={0.8}>
          <Text h1 center bold>
            Smart
            <Text h1 primary> FARMING.</Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Enjoy the experience.
          </Text>
        </Block>
       
        </Block>
        <Block middle flex={1.4}>
        <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:0}}
        theme={{colors:{primary:"green"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
      <TextInput
        label='password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:5}}
        theme={{colors:{primary:"green"}}}
     
      />
        </Block>
        
      
        <Block middle flex={1.5} margin={[0, theme.sizes.padding * 2]}>
  <Button gradient onPress={() => sendCred(props)}>
    <Text center semibold white>Login</Text>
  </Button>
  <Button shadow onPress={() => props.navigation.replace('Signup')}>
    <Text center semibold>Don't have an account?</Text>
  </Button>

</Block>
      </View>
      </View>
   </>
  );
};
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


export default LoginScreen;
