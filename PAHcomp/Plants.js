import React,{useEffect,useState} from 'react';
import {View,FlatList,TouchableOpacity,StyleSheet,Dimensions,Image} from 'react-native';
import PlanHeader from './Header';
import { Button, Block, Text, Card,Badge} from '../custom';
import {theme} from '../constants';
const { width } = Dimensions.get("window");

const Plants = (props) =>{
    const [data,setData] = useState([]);
    const [stages,setStages] = useState([]);
    let numberOfCols = 2;
    useEffect(()=>{
        try{
            const filePlant = require('../Plants.json');
            const fileStages = require('../Stages.json');
            setData(filePlant);
            setStages(fileStages);
        }
        catch(e){
            console.log(e);
        }
    },[])
    return(
        <View>
            <PlanHeader navigation={props.navigation}/>
            <FlatList data={data} keyExtractor={item=>item.Name} numColumns={numberOfCols} contentContainerStyle={{marginHorizontal:'2%'}} renderItem={item=>(
                <TouchableOpacity onPress={()=>{
                    var PlantStages = [];
                    for(var x in stages){
                        if(stages[x].Name==item.item.Name){
                            PlantStages = stages[x].Stages;
                            break;
                        }
                    }
                    props.navigation.navigate('Sowing',{
                        Plant:item.item,
                        Stages:PlantStages
                    });
                }}>
                    <View style={styles.categories}>
                        <Card center shadow style={styles.category}>
                            <Badge
                            margin={[0, 0, 15]}
                            size={50}
                            color="rgba(41,216,143,0.20)"
                            >
                                <Image source={{uri:item.item.Icon}} style={{resizeMode:'stretch',width:50,height:50}} />
                            </Badge>
                            <Text bold height={20}>
                            {item.item.Name}
                            </Text>
                        </Card>
                    </View>    
                </TouchableOpacity>
            )}/>
        </View>
    );
} 
const styles = StyleSheet.create({
    categories: {
        flexWrap: 'wrap',
        margin:'3%',    
    },
      category: {
        // this should be dynamic based on screen width
        // minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        // maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        // maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
        marginTop:'5%',
        marginBottom:'2%',
        minWidth: (width*0.88) / 2,
        maxWidth: (width*0.88) / 2,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  
      }  
})
export default Plants;