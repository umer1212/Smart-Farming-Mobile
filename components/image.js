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

import * as MediaLibrary from 'expo-media-library';

import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
const { width: winWidth, height: winHeight } = Dimensions.get("window");
 
export default class CameraPage extends React.Component {
  takePicture = async () => {
    console.log('Hello')
    if (this.camera) {
      const options = { quality: 1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      // CameraRoll.saveToCameraRoll(data.uri, ['photo']);
      MediaLibrary.saveToLibraryAsync(data.uri)
      console.log(data.uri);
      const body = {
        name:data.uri 
      }
      this.uploadPhoto(data,body);
    }
  };
  camera = null;
 
  state = {
    hasCameraPermission: null
  };
 
  uploadPhoto = (photo,body) =>{
    console.log('Sending Image');
    const a = createFormData(photo,body)
    console.log(a)
    fetch('http://192.168.137.1:3000/upload',{
      method:'POST',
      body:a
    }).then(response=>response.json())
    .then(response=>{
      Alert.alert('Upload Successfull');
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
        <Camera
          style={styles.preview}
          ref={camera => (this.camera = camera)}
          ratio="16:9"
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
  data.append('photo',photo);
  

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