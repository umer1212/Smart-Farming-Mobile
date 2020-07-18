import React from 'react';
import { StyleSheet, Text, View,ScrollView,AsyncStorage,Image } from 'react-native';
import MyHeader from './MyHeader';
import { TextInput,Card, List, Button } from 'react-native-paper';

const THEME_COLOR_KEY = 'theme_color';
export default class SearchScreen extends React.Component {
  state={
    text:'',cities:[]
  };
  colors = ['blue', 'green', 'red', 'purple'];
  async buttonclick(){
    this.props.navigation.navigate('Home2',{city:this.state.text})
    await AsyncStorage.setItem("city",this.state.text)
}
async listclicked(name){
    this.setState({text:name})
    await AsyncStorage.setItem("city",this.state.text)
    

}
componentDidMount(){
  this.loadAsyncData();
}

  fectchCities(text){
    // console.log(text)

    this.setState({ text })
    fetch("https://autocomplete.wunderground.com/aq?query="+text)
    .then(data=>data.json())
    .then(data2=>{
      console.log(data2)
      this.setState({
        cities:city.RESULTS.slice(0,9)
      })
    })
    console.log('hereeeeee')
    console.log(this.state.cities);
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
    // console.log(a)

    renderCity=<Card><List.Item title="no cities"/></Card>
    if(this.state.cities.length>0){
      renderCity=this.state.cities.map((city,i)=>{
        return(
          <Card style={{margin:5}} key={i} onPress={()=>this.listclicked(city.name)}>

             <List.Item title={city.name}/>
          </Card>
        )
      })
    }
   
 
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <MyHeader title="Select City" color={'#2BDA8E'} navigation={this.props.navigation} isHome={false}/>
      <View style={{...StyleSheet.absoluteFill}}>
        <Image 
        source={require('../assets/plants_2.png')}
        style={{flex:1,height:null,width:null,opacity:0.3}} />
      </View>
       
    
      <TextInput
        label='Enter City'
        value={this.state.text}
        onChangeText={text => this.fectchCities(text)}
      />
       <Button style={{margin:20}} onPress={()=>this.buttonclick()}>
          Save Changes
      </Button>
       <ScrollView>
        {renderCity}
      </ScrollView>
      
      
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
   
    

  },
});
