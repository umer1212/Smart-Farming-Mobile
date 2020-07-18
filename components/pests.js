import React from 'react' ;
import {View,Text,StyleSheet,ActivityIndicator,TouchableOpacity,TouchableHighlight,FlatList,Image,Alert,AsyncStorage, StatusBar, Dimensions} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left, Body, Right } from 'native-base';
import {theme} from '../constants';
import ViewMoreText from 'react-native-view-more-text';
import { SearchBar } from 'react-native-elements';
import MyHeader from './MyHeader';

const THEME_COLOR_KEY = 'theme_color';
var pestFound = false;
 export default class Plant extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        isLoading: true,
        user: "",
        refreshing: false,
        plants: [],
        search: "",
        filteredData:[],
        pestFound:false,
        toRender:false
      };
      this.arrayholder = [];
    }
    colors = ["blue", "green", "red", "purple"];

    componentDidMount() {
      this.loadAsyncData();
      this.getData();
      console.disableYellowBox = true;
    }

    loadAsyncData = async () => {
      try {
        const themeColorIndex = await AsyncStorage.getItem(
          THEME_COLOR_KEY
        );

        if (themeColorIndex !== null) {
          this.props.navigation.setParams({
            themeIndex: JSON.parse(themeColorIndex),
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    SearchFilterFunction(text) {
      const newData = this.state.data.filter(function (item) {
        const itemData = item.pestName
          ? item.pestName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        filteredData: newData,
        search: text,
      });
    }

    getData = async () => {
      const response = await fetch(theme.IPs.ServerIP + "pest/");
      const data = await response.json();
      this.setState({
        data: data,
        isLoading: false,
        plants: data.plants,
        filteredData:data
      });
    };

    render() {
      const themeColorIndex = this.props.navigation.state.params
        ? this.props.navigation.state.params.themeIndex
        : 0;
      const a = this.colors[themeColorIndex];

      return (
          <Container style={{ backgroundColor: "white" }}>
          <View style={{ ...StyleSheet.absoluteFill }}>
            <Image
              source={require("../assets/plants_2.png")}
              style={{
                flex: 1,
                height: null,
                width: null,
                opacity: 0.3,
              }}
            />
          </View>
          <MyHeader navigation={this.props.navigation}/>
          <SearchBar
          round
          containerStyle={{backgroundColor:'white',shadowColor:'white'}}
          inputContainerStyle={{borderColor:'white',backgroundColor:'#00D2D3'}}
          searchIcon={{ size: 24, color: theme.colors.primary }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Type a Pest Name"
          value={this.state.search}
          />
          <FlatList
            data={this.state.filteredData}
            renderItem={({ item }) => (
              <Card center middle shadow
                style={{
                  backgroundColor: "white",
                  margin: "4%",
                  borderWidth: 1,
                }}>
                {/* HEADING BAR */}
                <View style={{ flexDirection: "row", elevation: 2 }}>
                  <View style={{ flex: 0.6 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        padding: 6,
                      }}>
                      {item.pestName}
                    </Text>
                    <Text
                      style={{
                        backgroundColor: theme.colors.primary,
                        marginLeft: 3,
                        padding: 5,
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}>
                      {item.scientificName}
                    </Text>
                    <Text
                      style={{
                        backgroundColor: theme.colors.accent,
                        marginLeft: 3,
                        padding: 5,
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}>
                      RISK : {item.severity}
                    </Text>
                  </View>
                  <Thumbnail
                    source={{ uri: item.pestImage }}
                    style={{
                      height: "100%",
                      flex: 0.4,
                      padding: 6,
                      margin: 2,
                      borderRadius: 5,
                    }}
                  />
                </View>
                {/* DIAGONOSTICS */}
                <View style={{ margin: 3, marginTop: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        flex: 0.3,
                        height: 30,
                        backgroundColor: theme.colors.primary,
                        padding: 4,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                      }}>
                      Diganostics
                    </Text>
                    <Text
                      style={{
                        flex: 0.7,
                        textAlign: "justify",
                        margin: 5,
                        marginTop: 0,
                      }}>
                      {item.diagnostics}
                    </Text>
                  </View>
                </View>
                {/* PREVENTIONS */}
                <View style={{ margin: 3 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        flex: 0.3,
                        height: 30,
                        backgroundColor: theme.colors.primary,
                        padding: 4,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                      }}>
                      Preventions
                    </Text>
                    <Text
                      style={{
                        flex: 0.7,
                        textAlign: "justify",
                        margin: 5,
                        marginTop: 0,
                      }}>
                      {item.prevention}
                    </Text>
                  </View>
                </View>
              </Card>
            )}
            ListEmptyComponent={()=>(
              <View style={{height:Dimensions.get('window').height}}>
                <ActivityIndicator color={theme.colors.primary} size={"large"} style={{marginTop:'70%'}}/>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Container>
      );
    }
}

 var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white'
  },
  back:{
    position:'absolute',
    left:0,
    marginTop:30,
    marginLeft:15
  },
  status: {
    width:100,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderRadius:25,
    
    borderColor:'green',
    marginTop:15,
    
  }





 });
 







