import { Appbar } from 'react-native-paper';
import React from 'react';
import { Button, Block, Text } from '../custom';
import { theme } from '../constants';



class CustomHeader extends React.Component{
   render(){
    //  console.log(this.props);
     let {Custom1,Custom2,backHandler,h2} = this.props;
    //  console.log(Custom1,Custom2)

    return(
      <Appbar.Header
        style={{backgroundColor:'white',height:20,marginBottom:10}}>
        <Appbar.Action icon="close" size={h2?25:30} color={theme.colors.primary} style={{marginBottom:15}} onPress={backHandler} />
        <Block center bottom flex={0.92}>
        {h2?(
            <Text h2 center bold>
            {Custom1?Custom1:"Smart"}
            <Text h2 primary> {Custom2?Custom2:"FARMING."}</Text>
            </Text>
        ):(
            <Text h1 center bold>
            {Custom1?Custom1:"Smart"}
            <Text h1 primary> {Custom2?Custom2:"FARMING."}</Text>
            </Text>
        )}
        </Block>
      </Appbar.Header>
   )
  }
}


export default CustomHeader;