import React from 'react';
import { Button, Block, Text } from '../custom';
import { theme } from '../constants';
import { Appbar } from 'react-native-paper';
import { StackActions, NavigationActions } from 'react-navigation';


class PlanHeader extends React.Component{
   render(){
     let {title,color,isHome} = this.props;
    return(
      <Appbar.Header
        style={{backgroundColor:'white'}}>
        <Appbar.BackAction color={theme.colors.primary} size={30} onPress={()=>{
            const routeName = this.props.navigation.state.routeName;
            // console.log(routeName);
            if(routeName=="PlanAHead"){
              const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Home' })],
              });
              this.props.navigation.dispatch(resetAction);
            }
            this.props.navigation.goBack();
        }}/>
        <Block center bottom flex={0.92}>
          <Text h1 center bold>
            Plant
            <Text h1 primary> ADVISORY.</Text>
          </Text>
        </Block>
      </Appbar.Header>
   )
  }
}


export default PlanHeader;