import React, { Component , useState, useEffect }  from 'react';



import {Text,Image, View,StyleSheet,ImageBackground,Button,Dimensions,Animated} from 'react-native';

const FadeInView = (props) => {

    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  

    React.useEffect(() => {

      Animated.timing(

        fadeAnim,

        {

          toValue: 1,

          duration: 4000,

        }

      ).start();

    }, [])

    return (

        <Animated.View                 // Special animatable View

          style={{

            ...props.style,

            opacity: fadeAnim,         // Bind opacity to animated value

          }}

        >
    <Text>

          {props.children}
</Text>

        </Animated.View>

      );

    }

export default class splash extends Component {

   

  static navigationOptions = {

    header:null,

       title:"splashScr",

      

   }

  componentWillMount(){

      setTimeout(()=>{

      this.props.navigation.navigate('Login');

      },4000)

  }

    render() {

        

      return (

         <View style={styles.containter}>

              <FadeInView style={{width: Dimensions.get("window").width, 

        height: Dimensions.get("window").height, backgroundColor: 'black'}}> 

             <ImageBackground source={require('../assets/icon.png')}  style={{width: '100%', height: '100%',flex:0, alignItems:'center', justifyContent:'center'}} >

  

          </ImageBackground>

          </FadeInView> 

         </View>

  

      );

    }

  }

  

  const styles = StyleSheet.create({

  

    contact_head:{

      color:"orange",

      fontSize:50,

      fontStyle:"italic",

      fontWeight:'bold',

      textAlign:"center",alignSelf:'center'


      

    },

    

    containter: {

        flex: 1,

        width: Dimensions.get("window").width, 

        height: Dimensions.get("window").height,

        backgroundColor:'white' ,

        justifyContent:'center',

        alignItems:'center'

  },

  

   

  });