import { Appbar } from 'react-native-paper';
import React from 'react';
import { Button, Block, Text } from '../custom';
import { theme } from '../constants';



class MyHeader extends React.Component{
   render(){
    //  console.log(this.props);
     let {Custom1,Custom2,isHome} = this.props;
    //  console.log(Custom1,Custom2)
    return(
      <Appbar.Header
        style={{backgroundColor:'white'}}>
        {isHome?
          <Appbar.Action icon="menu" size={30} color={theme.colors.primary} onPress={()=>this.props.navigation.openDrawer()} />
        :
          <Appbar.BackAction size={30} color={theme.colors.primary} onPress={()=>this.props.navigation.goBack()}/>
        }
        <Block center bottom flex={0.92}>
          <Text h1 center bold>
            {Custom1?Custom1:"Smart"}
            <Text h1 primary> {Custom2?Custom2:"FARMING."}</Text>
          </Text>
        </Block>
      </Appbar.Header>
   )
  }
}


export default MyHeader;