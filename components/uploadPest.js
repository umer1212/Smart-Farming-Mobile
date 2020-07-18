import * as React from 'react';
import { Button, Image, View,Alert,AsyncStorage} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import MyHeader from './MyHeader'
const THEME_COLOR_KEY = 'theme_color';
export default class UploadPest extends React.Component {
  state = {
    image: null,
    fruit:'',
    disease:''
  };
  colors = ['blue', 'green', 'red', 'purple'];



  componentDidMount() {
    this.loadAsyncData()
    this.getPermissionAsync();
    console.log('hi');
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


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  uploadPhoto = (data) =>{
   
    console.log('Sending Image'+Date.now().toString());
   
    fetch('http://192.168.43.135:3004/predictPest/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        user:'123',
        base64Data:data.base64
      }),
    
    }).then(response=>response.json())
    .then(responseJson=>{
    //   this.setState({fruit:responseJson.fruit,disease:responseJson.disease})
    //  this.AlertPro.open()
      Alert.alert('Upload Successfull',JSON.stringify(responseJson));
    })
    .catch(err=>{
      Alert.alert('Error',err.toString());
    });
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });

  
    this.uploadPhoto(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    let { image } = this.state;
    const themeColorIndex = this.props.navigation.state.params ?
      this.props.navigation.state.params.themeIndex : 0;
    const a = this.colors[themeColorIndex]
    console.log(a)

    return (
      <View style={{flex:1}}>
        <MyHeader title="Upload Picture"  navigation={this.props.navigation} color={a}/>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      
      </View>
    );
  }
}