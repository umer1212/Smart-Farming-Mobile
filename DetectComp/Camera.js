import React, { useState, useEffect,useRef } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons,MaterialIcons } from '@expo/vector-icons';
import {CommonActions} from '@react-navigation/native';
var Images = []
export default function App(props) {
  const CameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [count,setCount] = useState(0);
  const [flashmode,setFlashMode] = useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if(count==5){
      Alert.alert('Maximimum Photo Capture Limit Reached','Only 5 photos are allowed')
    }
    else{
      if (CameraRef) {
        let photo = await CameraRef.current.takePictureAsync();
        var Image = {
          "name":'AddTransaction_Customer_'+count+'.jpg',
          "type":'image/jpeg',
          "uri" :Platform.OS === "android" ? photo.uri : photo.uri.replace("file://","")
        }
        Images.push(Image);
        setCount(count+1);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera ref={CameraRef} style={{ flex: 1 }} type={type} flashMode={flashmode} autoFocus={Camera.Constants.AutoFocus.on}>
        <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
                flex:0.33,
                flexDirection:'row'                  
              }}
              onPress={props.handleImagePicker}
              >
              <Ionicons
                  name="ios-photos"
                  style={{ color: "#fff", fontSize: 40,marginLeft:'27%'}}
              />
              {count>0&&(
                <Text style={{
                backgroundColor:'white',
                fontWeight:'bold',
                padding:3,
                borderRadius:90,
                marginBottom:15
                }}>{count}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
                flex:0.33
              }}
              onPress={()=>{
                snap();
              }}
              >
              <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 60}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
                flex:0.33
              }}
              onPress={()=>{
                if(flashmode==Camera.Constants.FlashMode.off){
                  setFlashMode(Camera.Constants.FlashMode.torch);
                }
                else{
                  setFlashMode(Camera.Constants.FlashMode.off);
                }
              }}

              >
              {flashmode==Camera.Constants.FlashMode.torch&&(
                <MaterialIcons
                  name="flash-on"
                  style={{ color: "white", fontSize: 40}}
              />
              )}
              {flashmode==Camera.Constants.FlashMode.off&&(
                <MaterialIcons
                  name="flash-off"
                  style={{ color: "#fff", fontSize: 40}}
              />
              )}
            </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}