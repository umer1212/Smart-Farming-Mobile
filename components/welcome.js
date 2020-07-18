import { StyleSheet,Image } from 'react-native';
import * as React from 'react';
import { Button, Block, Text } from '../custom';
import { theme } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
export default class Welcome extends React.Component {
  static navigationOptions = {
    header : null
  }

  renderIllustrations(){
    return(
      <Block>
       <Image 
        source={require('../assets/illustration_1.png')}
        style={{height:150,width:250,flex:1}} />
      </Block>
    )
  }
 
  render(){
    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Smart
            <Text h1 primary> FARMING.</Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Enjoy the experience.
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
         
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
  <Button gradient onPress={() => this.props.navigation.navigate('Login')}>
    <Text center semibold white>Login</Text>
  </Button>
  <Button shadow onPress={() => this.props.navigation.navigate('Signup')}>
    <Text center semibold>Signup</Text>
  </Button>

</Block>
      </Block>
     
    );
  }
  
}