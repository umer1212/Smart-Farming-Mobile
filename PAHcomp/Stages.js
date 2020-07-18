import React,{useState,useEffect,useRef} from 'react';
import {Text,Image,View,StyleSheet,TouchableOpacity,ImageBackground, Modal,useWindowDimensions,FlatList,ScrollView} from 'react-native';
import Dash from 'react-native-dash';
import { LinearGradient } from 'expo-linear-gradient';
import {theme} from '../constants';
import PlanHeader from './Header';
import { ActivityIndicator } from 'react-native-paper';

const MainColor = theme.colors.primary;

const StagesMania = (props) =>{
    const Flat_Stages = useRef(null);
    const Stages = props.Stages;
    const Dimensions = useWindowDimensions();
    const heightCard = Dimensions.height*0.68;
    const [StartArray,setStartArray] = useState([]);
    const [EndArray,setEndArray] = useState([]);
    const [CurrentStage,setCurrentStage] = useState(0);
    const [tenureComplete,setTenureComplete] = useState(false);
    const SowingDate = props.SowingDate;
    const [ReadMore,setReadMore] = useState(false);
    const [item,setItem] = useState({});
    const [rerender,setRerender] = useState(true);

    useEffect(() => {
        var tmpStart = [];
        var tmpEnd = [];
        var Start = 0;
        var End = 0;
        var daysPassed = Math.round((new Date()-new Date(SowingDate))/(1000*60*60*24)) 
        var totalDays = 0;
        var currentStage = 0;
        for(var x in Stages){
            totalDays = totalDays + Stages[x].Time;
            if(daysPassed<=totalDays && currentStage==0){
                // console.log(x +' ix x')
                currentStage = x;
            }
            Start = End+1;
            End = Stages[x].Time/7 + Start;
            tmpStart.push(Start);
            tmpEnd.push(End);
            // console.log(Start,End);
        }
        if(daysPassed>totalDays){
            setTenureComplete(true)
        }
        else{
            setCurrentStage(currentStage);
            setStartArray(tmpStart);
            setEndArray(tmpEnd);
        }
    }, [Stages])


    function readMore(item){
        setItem(item);
        setReadMore(true);
        setRerender(false);
    }

    const Stage = (props) =>{
        const singleStage = props.Stage;
        const Start = props.Start;
        const End = props.End;
        const {Tasks} = singleStage;
        return(
            <View>
                {/* <Modal 
                visible={ReadMore}
                onRequestClose={()=>setReadMore(false)}
                onDismiss={()=>setReadMore(false)}
                transparent
                >
                    <View style={{flex:1,backgroundColor:"rgba(0,0,0,0.2)"} }>
                        <View style={{backgroundColor:'white',width:'90%',height:'80%',alignSelf:'center',marginTop:'10%'}}>
                            <View style={{height:100,alignSelf:'center'}}>
                                <Text style={{fontSize:25,fontWeight:'bold'}}>Read
                                    <Text style={{fontSize:25,fontWeight:'bold',color:theme.colors.primary}}> MORE.</Text>
                                </Text>                            
                            </View>
                            <Text style={StageStyle.TaskHeading}>{item.Heading}</Text>
                            <Text style={StageStyle.TaskNumber}>{item.Number}</Text>
                            <ScrollView>
                                <Text style={{padding:5,textAlign:'justify'}}>{item.Description}</Text>
                            </ScrollView>

                        </View>
                    </View>
                </Modal> */}
            {/* Stage Information */}
            <View>
                <ImageBackground 
                    source={require('../assets/SmartSplash.jpg')} 
                    style={{height:125,width:'98%',alignSelf:'center'}}
                >
                    <View style={StageStyle.Pamphelet}>
                        <Text style={StageStyle.StageText}>{singleStage.Stage}</Text>
                        {Start==End?<Text style={StageStyle.Weeks}>Week {End}</Text>:<Text style={StageStyle.Weeks}>Week {Start} - Week {End}</Text>}
                        <Text style={StageStyle.TaskBelow}>{Tasks.length} task(s) to perform during this time</Text>
                    </View>
                </ImageBackground>
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator style={[StageStyle.TaskCard,{width: Dimensions.width - 7}]}>
                    {Tasks.map(item=>(
                        <View key={item.Number} style={{width:Dimensions.width-7,borderWidth:1,alignItems:'center'}}>
                            <View style={{flexDirection:'row',width:'100%'}}>
                                <Text style={StageStyle.TaskHeading}>{item.Heading}</Text>
                                <Text style={StageStyle.TaskDays}>{item.Frequency}</Text>
                            </View>
                            <View style={{borderBottomWidth:1,width:'100%'}}>
                                <Text style={StageStyle.TaskNumber}>Task Number {item.Number}</Text>
                            </View>
                            <View style={{}}>
                                <Text style={{padding:5,textAlign:'justify'}} >{item.Description}</Text>
                            </View>
                            <View style={{flexDirection:'row',height:200,width:Dimensions.width-10,justifyContent:'center',marginTop:'3%'}}>
                                {item.Pictures.map(PictureUrl=>(
                                    <Image key={PictureUrl} source={{uri:PictureUrl}} style={{width:50,resizeMode : 'stretch',flex:0.5,margin:1}}/>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
                {singleStage.Stage=="Ripening Stage"
                ?
                <View style={{marginBottom:40,borderWidth:1}}>
                <Dash dashThickness={10} dashLength={80} dashGap={20} dashColor={"#FFFF"} dashStyle={{margin:5,marginBottom:10}}/>
                </View>
                :
                <Dash dashThickness={10} dashLength={68} dashGap={20} dashColor={MainColor} dashStyle={{margin:5,marginBottom:10}}/>
                }
            </View>
        </View>
        );
    }

    return(
        <View>
            {tenureComplete==false&&(
                <FlatList 
                    ref={Flat_Stages}
                    onScrollToIndexFailed={info=>{}}
                    onLayout={()=>{
                        // console.log('Current Stage Received'+CurrentStage);
                        const wait = new Promise(resolve => setTimeout(resolve, 400));
                        wait.then(() => {
                        Flat_Stages.current.scrollToIndex({ index: parseInt(CurrentStage-1), animated: true });
                    });
                }}
                data={Stages}
                renderItem={({item,index})=>(
                    <View>
                        <Stage Stage={item} Start={StartArray[index]} End={EndArray[index]}/>
                    </View>
                )}
                keyExtractor={Stages=>Stages.Stage}
                ListEmptyComponent={()=>(
                    <View style={{flex:1,height:Dimensions.height}}>
                        <ActivityIndicator size={"large"} color={theme.colors.primary} style={{alignSelf:'center',flex:0.8}}/>
                    </View>
                )}
                />
            )}
            {tenureComplete&&(
                <View>
                    <Text style={Styles.MainHeading}>Congratulations on Growing Your {props.PlantName} Plant</Text>
                    <Image source={require('../assets/complete.jpg')} style={Styles.CenterImage}/>
                    <TouchableOpacity>
                        <LinearGradient colors={["#360033", "#0b8793"]} style={Styles.ButtonGradient}>
                            <Text style={Styles.ButtonText}>Reset Sowing Date</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

}
const StageStyle = StyleSheet.create({
    Pamphelet: {
      borderWidth: 1,
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.4)",
      borderRadius: 10,
      borderBottomRightRadius:0,
      borderBottomLeftRadius:0
    },
    TaskCard: {
      borderWidth: 1,
      alignSelf: "center",
      margin: 5,
      marginTop: -1,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    StageText: {
      fontSize: 30,
      fontWeight: "bold",
      padding: 10,
      color: "white",
      textAlign: "center",
    },
    Weeks: {
      fontSize: 22,
      textAlign: "center",
      textDecorationLine: "underline",
      padding: 2,
      fontWeight: "bold",
      color: "white",
    },
    TaskBelow: {
      color: "white",
      textAlign: "center",
      fontSize: 12,
      fontWeight: "bold",
    },
    TaskNumber: {
      padding: 5,
      backgroundColor: MainColor,
      textAlign: "center",
      width: "40%",
      margin: 5,
      marginLeft: "2%",
      color: "white",
      fontWeight: "bold",
    },
    TaskHeading: {
      fontSize: 20,
      fontWeight: "bold",
      flex: 0.7,
      padding: 5,
      paddingBottom: 1,
    },
    TaskDays: {
      fontWeight: 22,
      fontWeight: "bold",
      flex: 0.3,
      padding: 4,
      textAlignVertical: "center",
      textAlign: "center",
    },
    TaskReadMore: {
      color: MainColor,
      fontWeight: "bold",
      fontSize: 15,
      padding: 2,
      marginTop: 2,
      textAlign: "center",
    },
});

const Styles = StyleSheet.create({
    MainHeading:{
        textAlign:'center',
        fontSize:26,
        fontWeight:'bold',
        paddingTop:'5%'
    },
    CenterImage:{
        width:'100%',
        height:'65%'
    },
    ButtonGradient:{
        marginTop:'10%',
        borderWidth:0.5,
        borderRadius:30,
        width:'90%',
        alignSelf:'center'
    },
    ButtonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:22,
        textAlign:'center',
        alignSelf:'center',
        padding:10,
    },
})
export default StagesMania;