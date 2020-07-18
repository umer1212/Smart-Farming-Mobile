import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  Platform,
  Alert,
  
} from "react-native";

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
 import {CameraRoll} from 'react-native-cameraroll'
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

import MyHeader from './MyHeader'
const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default class CameraPage extends React.Component {
  state={
    user:'123',
    Image:'Image will be here'
  }
 
  takePicture = async () => {
    console.log('Hello')
    if (this.camera) {
      const options = { quality: 1, base64: true };
      const data = await this.camera.takePictureAsync(options);
     
      MediaLibrary.saveToLibraryAsync(data.uri)
     
      const body = {
        user:'123',
        Image:'Image Will Be Here'
      };
   
   
      this.uploadPhoto(data);
    }
  };
  camera = null;
 
  state = {
    hasCameraPermission: null
  };
 
  uploadPhoto = (data) =>{
 
    console.log('Sending Image'+Date.now().toString());
   
    const bodya = {
      user:'123',
      Image:'Image Will Be Here'
    };
   
    fetch('http://192.168.1.7:3002/predict/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        user:'123',
        base64Data:data.base64
      })
    }).then(response=>response.json())
    .then(responseJson=>{
      // console.log(response);
      Alert.alert('Upload Successfull',JSON.stringify(responseJson));
    })
    .catch(err=>{
      Alert.alert('Error',err.toString());
    });
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const storage = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const hasCameraPermission =
      camera.status === "granted" &&
      audio.status === "granted" &&
      storage.status === "granted";
 
    this.setState({ hasCameraPermission });
  }
 
  render() {
    const { hasCameraPermission } = this.state;
 
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }
 
    return (
      <View>
        <MyHeader isHome={false} navigation={this.props.navigation} />
        <Camera
          style={styles.preview}
          ref={camera => (this.camera = camera)}
          ratio="13:9"
        />
        <TouchableOpacity
          onPress={() => this.takePicture()}
          style={styles.button}
        >
          <Text style={styles.capture}>Capture</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const createFormData = (photo,body) =>{
  const data = new FormData();
  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach(key=>{
    data.append(key,body[key]);
  });

  return data;
}

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  button: {
    position: "absolute",
    // bottom: 0,
    top: 600,
    left: 140
  },
  capture:{
    padding:'2%',
    backgroundColor:'green',
    color:'white',
    fontSize:20,
    alignContent:'center',
    borderColor:'white'
  }
});