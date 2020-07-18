
import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { theme } from '../constants';
import { Button, Block, Text, Card,Badge} from '../custom';
import { View } from 'native-base';
import MyHeader from './MyHeader'

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const categories = [
    {
      id: "plants",
      name: "Plants",
     
      count: 147,
      image: require("../assets/icons/plants.png")
    },
    {
      id: "Pests",
      name: "Pests",
      
      count: 16,
      image: require("../assets/icons/pest.png")
    },
    {
      id: "Health Check",
      name: "Health Check",
    
      count: 68,
      image: require("../assets/icons/plantd.png")
    },
    {
      id: "Pest Check",
      name: "Pest Check",
     
      count: 17,
      image: require("../assets/icons/sprayers.png")
    },
    {
      id: "Weather",
      name: "Weather",
      
      count: 47,
      image: require("../assets/icons/cloud.png")
    },
    {
      id: "Plan a Head",
      name: "Plan a Head",
      
      count: '',
      image: require("../assets/icons/fertilizers.png")
    }
];
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
export default class MainScreen extends React.Component {
  render(){
    return (
      <Block>
        <MyHeader
          title="Home"
          color={"#2BDA8E"}
          isHome={true}
          navigation={this.props.navigation}
        />
        <Block flex={1} row center space="between" style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertial: theme.sizes.base * 2 }}
        >
          <Block flex={false} row space="between" style={styles.categories}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Plant")}
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image source={require("../assets/icons/plants.png")} />
                </Badge>
                <Text medium height={20}>
                  Plants
                </Text>
                {/* <Text gray caption>
                  {" "}
                  10 products
                </Text> */}
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Pest")}
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image source={require("../assets/icons/pest.png")} />
                </Badge>
                <Text medium height={20}>
                  Pests
                </Text>
                {/* <Text gray caption>
                  {" "}
                  15 products
                </Text> */}
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("HealthCheck", {
                  ToDetect: "Plant Disease",
                })
              }
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image source={require("../assets/icons/searchRbg.png")} />
                </Badge>
                <Text medium height={20}>
                  Health Check
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("HealthCheck", {
                  ToDetect: "Pests",
                })
              }
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image source={require("../assets/icons/sprayers.png")} />
                </Badge>
                <Text medium height={20}>
                  Pest Detection
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("HealthCheck", {
                  ToDetect: "Weed",
              })}
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image source={require("../assets/icons/weed.png")} />
                </Badge>
                <Text medium height={20}>
                  Weed Detection
                </Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("PlanAHead")}
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={55}
                  color="rgba(41,216,143,0.20)"
                >
                  <Image source={require("../assets/icons/planAHead.png")} />
                </Badge>
                <Text medium height={20}>
                  Plan a Head
                </Text>
              </Card>
            </TouchableOpacity>
          </Block>
        </ScrollView>
      </Block>
    );
  }
  
}
const styles = StyleSheet.create({
    header: {
      paddingHorizontal: theme.sizes.base * 1,
      marginBottom:'3%',
      marginTop:'8%'
    },
    avatar: {
      height: theme.sizes.base * 2.2,
      width: theme.sizes.base * 2.2
    },
    tabs: {
      borderBottomColor: theme.colors.gray2,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginVertical: theme.sizes.base,
      marginHorizontal: theme.sizes.base * 2
    },
    tab: {
      marginRight: theme.sizes.base * 2,
      paddingBottom: theme.sizes.base
    },
    active: {
      borderBottomColor: theme.colors.secondary,
      borderBottomWidth: 3
    },
    categories: {
      flexWrap: 'wrap',
      paddingHorizontal: theme.sizes.base * 1,
     
    
    },
    category: {
      // this should be dynamic based on screen width
      // minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
      // maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
      // maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2

      minWidth: (width*0.88) / 2,
      maxWidth: (width*0.88) / 2,
      maxHeight: (width - theme.sizes.padding * 1) / 2

    }
  });