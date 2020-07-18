import React,{useState,useEffect,useRef} from 'react';
import {Text,Image,View,StyleSheet,TouchableOpacity,ImageBackground, useWindowDimensions, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import StagesMania from './Stages';
import PlanHeader from './Header';
import { Button } from '../custom';

const MainColor = "#085f63"
const Sowingdate = (props) =>{
    const [show,setShow] = useState(false);
    const [date,setDate] = useState(new Date());
    const [Plant,setPlant] = useState({});
    const [Stages,setStages] = useState([]);
    const [CurrentStage,setCurrentStage] = useState("");
    const [GotSowing,SetGotSowing] = useState(false);
    const Dimensions = useWindowDimensions();

    useEffect(() => {
        const {Plant} = props.navigation.state.params;
        const {Stages} = props.navigation.state.params;
        setPlant(Plant);
        setStages(Stages);
    },[])
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setPlant({...Plant,SowingDate:currentDate.toDateString()});
    };

    return(
        <View style={{backgroundColor:'white',height:'100%'}}>
            <PlanHeader navigation={props.navigation}/>
            {Plant.HasAdvisory==false&&(
                <View>
                    <Text style={Styles.MainHeading}>No Advisory Found{'\n'}For {Plant.Name} Plant</Text>
                    <Image source={require('../assets/advisory.jpg')} style={{
                        height:'65%',
                        width:'100%',
                        marginTop:'6%'
                    }}/>
                    {Plant.AdvisoryRequested?(
                        <Button shadow style={[Styles.ButtonGradient,{borderWidth:0.5}]}>
                            <Text style={[Styles.ButtonText,{color:'black'}]}>Requested</Text>
                        </Button>
                    ):(
                        <Button gradient style={Styles.ButtonGradient} onPress={()=>{
                        setPlant({...Plant,AdvisoryRequested:true})
                    }}>
                        <Text style={Styles.ButtonText}>Request Advisory</Text>
                    </Button>
                    )}
                </View>
            )}
            {(Plant.HasAdvisory && Plant.SowingDate=="")&&(
                <View>
                    <Text style={Styles.MainHeading}>No Sowing Date Found{'\n'}For {Plant.Name} Plant</Text>
                    <Image source={require('../assets/calendar2.jpg')} style={Styles.CenterImage}/>
                    {show&&(
                        <DateTimePicker 
                            value={date}
                            mode={'date'}
                            onChange={onChange}
                            display="spinner"
                        />
                    )}
                    <Button gradient style={Styles.ButtonGradient} onPress={()=>{
                        setShow(true)
                    }}>
                            <Text style={Styles.ButtonText}>Add A Sowing Date</Text>
                    </Button>
                </View>
            )}
            {(Plant.SowingDate!="")&&(
                <StagesMania Stages={Stages} SowingDate={Plant.SowingDate} PlantName={Plant.Name}/>
            )}
        </View>
    );
}
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
        borderRadius:30,
        alignSelf:'center',
        width:'95%'
    },
    ButtonText:{
        color:'white',
        fontSize:22,
        textAlign:'center',
        alignSelf:'center',
        padding:10,
    },
    ButtonRequested:{
        color:'white',
        fontWeight:'bold',
        fontSize:22,
        textAlign:'center',
        alignSelf:'center',
        padding:10,
        width:'100%',
        backgroundColor:'#085f63',
        borderRadius:30,
    }
});
export default Sowingdate;