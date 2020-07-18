
import React,{useState} from 'react';
import { TextInput} from 'react-native-paper';
import { theme } from '../constants';
import {
  View,

  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,StyleSheet,Image,Dimensions
} from 'react-native';

const {width,height}=Dimensions.get('window');
import { Button, Block, Text } from '../custom';
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
const SignupScreen = (props) => {

  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('')
  const [phone,setPhone]=useState('')
  const [address,setAddress]=useState('')

  const sendCred= async (props)=>{
    
    if(email !== '' && password !=='' && phone!=='' && address!==''){
    
     fetch("http://192.168.1.2:3001/signup",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "password":password,
        "phone":phone,
        "address":address
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              await AsyncStorage.setItem('token',data.token)
              alert("Signup success")
              this.props.navigation.replace('Login')
            } catch (e) {
              Alert("error hai",e)
            }
     })
    }
    else{
      alert('Please fill in the fields!')
    }
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
//    <> 


// <View style={{backgroundColor:'white',flex:1}}>
      
// {/* <View style={{...StyleSheet.absoluteFill}}>
//         <Image 
//         source={require('../assets/plants_2.png')}
//         style={{flex:1,height:null,width:null,opacity:0.3}} />
//       </View> */}
      
// <KeyboardAvoidingView behavior="position">
//       <View style={{height:height/1,justifyContent:'center'}}>
//       <Block>
//         <Block center bottom flex={0.6}>
//           <Text h1 center bold>
//             Smart
//             <Text h1 primary> FARMING.</Text>
//           </Text>
//           <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
//             Enjoy the experience.
//           </Text>
//         </Block>
       
//         </Block>
       
      //   <TextInput
      //   label='Username'
      //   mode="outlined"
      //   value={email}
      //   style={{marginLeft:18,marginRight:18,marginTop:0}}
      //   theme={{colors:{primary:"blue"}}}
      //   onChangeText={(text)=>setEmail(text)}
     
      // />
      // <TextInput
      //   label='password'
      //   mode="outlined"
      //   secureTextEntry={true}
      //   value={password}
      //   onChangeText={(text)=>{setPassword(text)}}
      //   style={{marginLeft:18,marginRight:18,marginTop:10}}
      //   theme={{colors:{primary:"blue"}}}
     
      // />
      //  <TextInput
      //   label='Phone No'
      //   mode="outlined"
      //   keyboardType='numeric'
        
      //   value={phone}
      //   onChangeText={(text)=>{setPhone(text)}}
      //   style={{marginLeft:18,marginRight:18,marginTop:10}}
      //   theme={{colors:{primary:"blue"}}}
     
      // />
      //  <TextInput
      //   label='Address'
      //   mode="outlined"
        
      //   value={address}
      //   onChangeText={(text)=>{setAddress(text)}}
      //   style={{marginLeft:18,marginRight:18,marginTop:10}}
      //   theme={{colors:{primary:"blue"}}}
     
      // />
    
       
//         <Block middle  margin={[0, theme.sizes.padding * 2]}>
//   <Button gradient onPress={() => sendCred(props)}>
//     <Text center semibold white>Signup</Text>
//   </Button>
//   <Button shadow onPress={() => props.navigation.replace('Login')}>
//     <Text center semibold>Already have an account?</Text>
//   </Button>

// </Block>
//       </View>
//       </KeyboardAvoidingView>
//       </View>
//    </>
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
        label='Username'
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
        style={{marginLeft:18,marginRight:18,marginTop:10}}
        theme={{colors:{primary:"green"}}}
     
      />
       <TextInput
        label='Phone No'
        mode="outlined"
        keyboardType='numeric'
        
        value={phone}
        onChangeText={(text)=>{setPhone(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:10}}
        theme={{colors:{primary:"green"}}}
     
      />
       <TextInput
        label='Address'
        mode="outlined"
        
        value={address}
        onChangeText={(text)=>{setAddress(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:10}}
        theme={{colors:{primary:"green"}}}
     
      />
     </Block>
     
   
     <Block middle flex={1.5} margin={[0, theme.sizes.padding * 2]}>
<Button gradient onPress={() => sendCred(props)}>
 <Text center semibold white>Signup</Text>
</Button>
<Button shadow onPress={() => props.navigation.replace('Login')}>
 <Text center semibold>Already have an account?</Text>
</Button>

</Block>
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
export default SignupScreen;
