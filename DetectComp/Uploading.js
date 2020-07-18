import React,{useState,useEffect} from 'react';
import {View,ImageBackground,Text,ActivityIndicator,TouchableOpacity,FlatList,Alert, Image,StyleSheet, Dimensions, BackHandler} from 'react-native';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { theme } from '../constants';
import { StackActions, NavigationActions } from 'react-navigation';
import { Modalize } from 'react-native-modalize';
import CustomHeader from '../components/CustomHeader';
import Card from '../custom/Card';
import ImageDiff from 'react-native-image-diff'

// const MainColor = "#085f63"
const MainColor = theme.colors.primary;
const {width,height} = Dimensions.get('window');
var ratingReceived = 0;
class UploadImages extends React.Component{
  constructor(props){
        super(props);
        this.state = {
            uploading:[],
            uploaded:false,
            toDetect:"",
            count:0,
            looped:false,
            updateScreen:false,
            findings:[],
            Images:[],
            toFlex:0,
            showModal:false,
            indexToShow:0,
            modalizeOpen:false,
            pestFound:{},
            diseaseFound:{},
            pestsInDisease:[],
            weedFound:{},
            feedback:0,
            imageWeed:""
        };
        this.modalizeRef = React.createRef();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',this.backAction);
    }
    UNSAFE_componentWillMount(){
        var tmp = [];
        const pictures = this.props.navigation.state.params.ArrayImages;
        for(var x in pictures){
            tmp.push(true);
        }
        this.setState({
            Images:pictures,
            uploading:tmp,
            count:tmp.length,
            toDetect:this.props.navigation.state.params.ToDetect,
            toFlex:1/pictures.length
        });
    }
    backAction=()=>{
        Alert.alert("End Detection", "Are you sure you want to go back?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
              });
              this.props.navigation.dispatch(resetAction);
            } 
            }
        ]);      
        return true;
    };
    componentDidMount(){
        if(this.state.count>0){
            const API = (function(toDetect){
                switch(toDetect){
                    case "Pests":
                        return theme.IPs.PestIP
                    case "Plant Disease":
                        return theme.IPs.DiseaseIP
                    case "Weed":
                        return theme.IPs.WeedIP
                }
            })(this.state.toDetect);
            if(this.state.looped==false){
                var index = 0;
                for(var x in this.state.Images){
                    var fd = new FormData();
                    fd.append('image',this.state.Images[x]);
                    let data = {
                        body:fd,
                        method:'POST'
                    }
                    // To TEST
                    // this.setState({
                    //   // findings:["Yellow Rice Borer","English Grain Aphid","Bird Cherry-oat Aphid"],
                    //   // findings:["Apple Scab","Apple Black Rot","Cherry Powdery Mildew"],
                    //   findings:["Found","N/A","Found"],
                    //   count:0,
                    //   uploaded:true,
                    //   uploading:[false,false,false],
                    //   looped:true
                    // });
                    // ACTUAL REQUEST
                    if(this.state.toDetect=="Weed"){
                      setTimeout(() => {
                        const checks = this.state.uploading.slice();
                        checks[index] = false;
                        index = index+1;
                        this.setState({
                            looped:true,
                            count:this.state.count-1,
                            // findings:[...this.state.findings,'N/A'],
                            uploading:checks
                      });
                      if(this.state.count==0){
                        this.setState({
                            uploaded:true,
                        })
                      }
                      }, 3000);
                    }
                    else{
                      fetch(API,data).then(res=>res.json()).then(result=>{
                        // console.log(result);  
                        if(result){
                              const checks = this.state.uploading.slice();
                              checks[index] = false;
                              index = index+1;
                              this.setState({
                                  looped:true,
                                  count:this.state.count-1,
                                  findings:[...this.state.findings,result.Item],
                                  uploading:checks
                              });
                          }
                          if(this.state.count==0){
                              this.setState({
                                  uploaded:true,
                              })
                          }
                      }).catch(err=>{
                          console.log(err);
                          Alert.alert('Cannot connect to server','Please check your Internet Connection');
                      });
                    }
                }
            }
        }
    }
    componentWillUnmount(){
      this.backHandler.remove();
    }
    loadingStyles(Item){
        const countImages = this.state.Images.length;
        switch(countImages){
            case 1:
                if(countImages==1){
                    if(Item=="Activity"){
                        return({alignSelf:'center',marginVertical:'25%'});
                    }
                    else{
                        return({marginTop:'15%',alignSelf:'center'});
                    }
                }
            case 2:
                if(countImages==2){
                    if(Item=="Activity"){
                        return({alignSelf:'center',marginVertical:'75%'});
                    }
                    else{
                        return({marginTop:'35%',alignSelf:'center'});
                    }
                }
            case 3:
                if(Item=="Activity"){
                    return({alignSelf:'center',marginVertical:'100%'});
                }
                else{
                    return({marginTop:'40%',alignSelf:'center'});
                }
        }
    }
    closeModalize = () =>{
        this.modalizeRef.current.close();
        return true;
    }
    modalizeHeight(){
        if(this.state.findings[this.state.indexToShow]=="N/A"){
            return null;
        }
        else{
            return Dimensions.get('window').height-50;
        }
    }
    Feedback = () =>{
    function submitFeedBack(SelectedImage,toDetect,Predicted){
        // console.log(ratingReceived+' is the rating set');
        if(ratingReceived!=0){
          const ForImage = SelectedImage
          const API = theme.IPs.ServerIP+'feedback/';
          // console.log(ForImage);
          var fd = new FormData();
          // Is tarah ata ha error
          //fd.append('photo', ForImage); // yeh image theek hai ?? //Bro yeh wohi image ha jo user select karta ha 
          // Is tarah ok ha
          // fd.append('photo','photo',ForImage);
          // sir i think image nahi append ho rahi :((()))
          // Why yaar
          // Wohi Image ha 

          fd.append('Farmer','Hassan');
          fd.append('Detected',toDetect);
          fd.append('FeedBack',ratingReceived);
          fd.append('Predicted',Predicted);
          let data = {
            body:fd,
            method:'POST'
          }
          fetch(API,data).then(res=>res.json()).then(result=>{
            if(result){
              // console.log(result);
              Alert.alert('Feedback Submitted!');
            }}).catch(err=>{
            Alert.alert('Feedback submission failed','An error occured while submitting feedback');
            console.log(err);
          });
        }
        else{
          Alert.alert('Feedback Not Recorded','Swipe on the hearts to submit your feedback.')
        }
        return null;
    }

      return(
        <View style={{backgroundColor:'white',height:110,marginLeft:2,marginRight:2,borderTopLeftRadius:20,borderTopRightRadius:20}}>
            <Card center middle shadow style={{flexDirection:'row',marginBottom:0}}>
              <Rating 
                type='heart' 
                ratingImage={require('../assets/feedbackIcon.png')}
                ratingColor={theme.colors.primary}
                ratingBackgroundColor={theme.colors.white}
                ratingCount={4}
                startingValue={0}
                imageSize={40}
                onFinishRating={(rating)=>{
                    ratingReceived = rating
                }}
                style={{flex:0.6,marginRight:12,marginTop:5,marginLeft:5,marginBottom:1}}
              />
              <Card center middle shadow style={{flex:0.4,height:60,marginTop:20}}>
                <TouchableOpacity style={{margin:5,borderRadius:10,width:(width-20)/2,height:60}} onPress={async ()=>{
                  let Image = this.state.Images[this.state.indexToShow]
                  const Prediction = this.state.findings[this.state.indexToShow]
                  submitFeedBack(Image,this.state.toDetect,Prediction);
                }}>
                {false&&(
                  <Text style={{height:'100%',padding:7,paddingLeft:30,fontWeight:'bold',fontSize:18,color:'black'}}>Feedback{'\n'}
                    <Text style={{color:theme.colors.primary}}>SUBMITTED.</Text>
                  </Text>
                )}
                {(true)&&(
                  <Text style={{height:'100%',padding:7,paddingLeft:30,fontWeight:'bold',fontSize:18,color:'black'}}>Submit Your{'\n'}
                    <Text style={{color:theme.colors.primary}}>FEEDBACK.</Text>
                  </Text>
                )}
                {false&&(
                  <View style={{height:'100%',alignContent:'center'}}>
                    <ActivityIndicator color={theme.colors.primary} size="large" style={{alignSelf:'center',marginVertical:'3%'}}/>
                  </View>
                )}
                </TouchableOpacity>
              </Card>
            </Card>
            <Text style={{textAlign:'center',fontWeight:'bold',padding:7}}>Your Feedback helps in improving our system.</Text>
        </View>
      );
    }
    async getPest(index,ID){
      if(ID){
        // console.log(ID);
        // console.log('Getting Pests');
        const API = theme.IPs.ServerIP+'pest/ID/'+ID;
        // console.log(API);
        const options = {
          headers: {'Content-Type': 'application/json'},
          mode: 'no-cors'
        };
        await fetch(API,options).then(res=>res.json()).then(async result=>{
          if(await result){
            return result.result;
          }
        }).catch(err=>{
          console.log(err);
        });        
      }
      else{
        const PestName = this.state.findings[index];
        // console.log(PestName);
        const API = theme.IPs.ServerIP+'pest/name/'+PestName;
        // console.log(API);
        const options = {
          headers: {'content-type': 'application/json'},
          mode: 'no-cors'
        };
        fetch(API,options).then(res=>res.json()).then(result=>{
          if(result){
            // console.log(result);
            if(!result.result){
              this.setState({
                pestFound:{
                  scientificName:'N/A'
                }
              })
            }
            else{
              this.setState({
                pestFound:result.result
              });
            }
          }
        }).catch(err=>{
          console.log(err);
        });
      }
    }
    async getDisease(index){
      const DiseaseName = this.state.findings[index];
      // console.log(DiseaseName);
      const API = theme.IPs.ServerIP+'disease/name/'+DiseaseName;
      // console.log(API);
      const options = {
        headers: {'content-type': 'application/json'},
        mode: 'no-cors'
    };
      await fetch(API,options).then(res=>res.json()).then(result=>{
        if(result){
          // console.log('IF NUll');
          // console.log(result.result);
          if(!result.result){
            this.setState({
              diseaseFound:{
                diseaseName:'N/A',
                severity:'',
                description:''
              }
            })
          }
          else{
            this.setState({
              diseaseFound:result.result,
            });
          }
        }
      }).catch(err=>{
        console.log(err);
      });

    }
    async setImageWeed(check){
      if(check){
          setTimeout(() => {
            this.setState({
              imageWeed:'Done Loading'
            })
          }, 10000);
        }
    }
    async getWeed(indexReceived){
        // await this.getIndex(index);
    var index = indexReceived || this.state.indexToShow;
    // console.log(index);
    // console.log('In Get Weed');
    // console.log(this.state.weedFound)
      var findings = this.state.findings;
      switch(index){
        case 0:
          // console.log('Case 0');
          findings[index] = 'Found'
          this.setState({
            weedFound:{
              found:true,
              realURI:this.state.Images[index].uri,
              annotated:'../assets/Weed/010_annotation.png',
              findings:findings
            }
          });
          this.setImageWeed(true);
          break;
        case 1:
          // console.log('Case 1');
          findings[index] = "N/A"
          this.setState({
            found:false,
            realURI:this.state.Images[index].uri,
            annotated:'',
            findings:findings
          });
          break;
        case 2:
          // console.log('Case 2');
          findings[index] = 'Found'
          this.setState({
            found:true,
            realURI:this.state.Images[index].uri,
            annotated:'../assets/Weed/012_annotation.png',
            findings:findings
          });
          this.setImageWeed(true);
          break;
        default:
          // console.log('Nothing');
          break;
      }            
    }
    render(){
        return (
          <View style={{ height: "100%", borderWidth: 1 }}>
            {/* ITEM DETECTED INFO */}
            <Modalize
                adjustToContentHeight={this.modalizeHeight()==null?true:false}
                withHandle={this.modalizeHeight()==null?false:true}
                modalHeight={this.modalizeHeight()} 
                snapPoint={this.modalizeHeight()==null?null:300}
                ref={this.modalizeRef}
                onBackButtonPress={()=>{this.setState({
                  modalizeOpen:false
                })}}  
                handleStyle={{backgroundColor:theme.colors.white}}
                closeSnapPointStraightEnabled={false}
                onClosed={()=>{
                    const wait = new Promise(resolve => setTimeout(resolve, 400));
                        wait.then(() => {
                          this.setState({
                            modalizeOpen:false
                          });
                          return true;
                    });
                }}
                HeaderComponent={() => (
                <View>
                    {this.state.findings[this.state.indexToShow] == "N/A" && (
                    <CustomHeader
                        Custom1={"No " + this.state.toDetect}
                        Custom2="FOUND."
                        backHandler={this.closeModalize}
                        h2
                    />
                    )}
                    {(this.state.toDetect == "Pests" &&
                    this.state.findings[this.state.indexToShow] != "N/A" )&& (
                        <CustomHeader
                        Custom1="Pest"
                        Custom2="FOUND."
                        backHandler={this.closeModalize}
                        />
                    )}
                    {(this.state.toDetect == "Plant Disease" &&
                    this.state.findings[this.state.indexToShow] != "N/A" )&& (
                        <CustomHeader
                        Custom1="Plant Disease"
                        Custom2="FOUND."
                        backHandler={this.closeModalize}
                        />
                    )}
                    {(this.state.toDetect == "Weed" &&
                    this.state.findings[this.state.indexToShow] != "N/A" )&& (
                        <CustomHeader
                        Custom1="Weed"
                        Custom2="DETECTED."
                        backHandler={this.closeModalize}
                        />
                    )}
                </View>
                )}
                FooterComponent={this.Feedback}
            >
              <View
                style={{
                  backgroundColor: "white",
                }}
              >
                {/* IF TO BE DETECTED IS PESTS */}
                {(this.state.toDetect=="Pests"&&this.state.findings[this.state.indexToShow]!="N/A")&&(
                  <View>
                      {/* NAME AND IMAGE VIEW */}
                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:0.5}}>
                          <Text style={{fontWeight:'bold',fontSize:22,padding:10,paddingBottom:1}}>
                            {this.state.findings[this.state.indexToShow]}{'\n'}
                          </Text>
                          {this.state.pestFound.scientificName?(
                            <Text style={{fontWeight:'bold',fontSize:22,padding:10,paddingBottom:1}}>
                              {this.state.pestFound.scientificName=="N/A"?(
                                <>
                                <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>{'\n\n\n'}Pest Information Not
                                  <Text style={{color:theme.colors.primary}}> AVAILABLE.</Text>
                                </Text>
                                </>
                              ):(
                                <>
                                <Text style={{color:theme.colors.primary,fontWeight:'bold',fontSize:15}}>{this.state.pestFound.scientificName}</Text>
                                <Text style={{fontWeight:'bold',fontSize:14}}>{'\n\n'}Severity <Text style={{color:theme.colors.primary}}>{this.state.pestFound.severity.toUpperCase()}.</Text></Text>
                                </>
                              )}
                            </Text>
                          ):(
                            <View>
                            <Text style={{fontWeight:'bold',fontSize:22,padding:10,paddingBottom:1}}>
                              {this.state.findings[this.state.indexToShow]}{'\n'}
                            </Text>
                            <ActivityIndicator color={theme.colors.primary} size='large' style={{padding:0}}/>
                            <Text style={{color:theme.colors.primary,padding:10,fontWeight:'bold',textAlign:'center'}}>Loading Information</Text>
                            </View>
                          )}
                        </View>
                        <View style={{flex:0.5}}>
                          <Image source={{uri:this.state.Images[this.state.indexToShow].uri}} style={{padding:10,width:200,height:200,resizeMode:'center'}}/>
                        </View>
                      </View>
                      {/* DIAGONSTICS PARA */}
                      {this.state.pestFound.scientificName&&(
                        <View>
                          {this.state.pestFound.scientificName!="N/A"&&(
                            <>
                            <Text style={{fontSize:15,fontWeight:'bold',padding:10}}>
                              How to Identify <Text style={{color:theme.colors.primary}}>{this.state.pestFound.pestName.toUpperCase()}.</Text>
                              </Text>
                            <Text style={{padding:10,textAlign:'justify',fontWeight:'bold',fontSize:15}}>{this.state.pestFound.diagnostics}</Text>
                            </>
                          )}
                        </View>
                      )}
                      {/* PREVENTION FLATLIST */}
                      {(this.state.pestFound.scientificName&&this.state.pestFound.scientificName!="N/A")&&(
                        <FlatList
                          numColumns={1}
                          horizontal  
                          indicatorStyle={{backgroundColor:theme.colors.primary,borderRadius:10}}
                          pagingEnabled
                          data={this.state.pestFound.prevention.split('.')}
                          renderItem={({item,index})=>(
                            <>
                              {(item.trim()!="")&&(
                                <Card center middle shadow style={{flexDirection:'column',flexGrow:0,margin:3,padding:10,elevation:5,width:width-10}}>
                                    <Text style={{color:theme.colors.primary,fontWeight:'bold',fontSize:15,textAlign:'center'}}>Prevention Tips</Text>
                                    <Text style={{padding:3,alignSelf:'center',fontWeight:'bold',height:null}}>{item.toUpperCase()}.</Text>
                                </Card>
                              )}                
                            </>
                          )}
                          ListEmptyComponent={()=>(
                            <View style={{height:100,margin:3,padding:10,width:width-20}}>
                                <Text style={{textAlign:'center',width:'100%',color:theme.colors.primary,fontWeight:'bold',fontSize:17}}>No Preventions Available</Text>
                            </View>
                          )}
                          keyExtractor={(_,index)=>index+''}
                        />
                      )}
                  </View>
                )}
                {/* IF TO BE DETECTED IS PLANT DISEASE */}
                {(this.state.toDetect=="Plant Disease"&&this.state.findings[this.state.indexToShow]!="N/A")&&(
                  <View>
                      {/* NAME AND IMAGE VIEW */}
                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:0.5}}>
                          {!this.state.diseaseFound.diseaseName?(
                            <View>
                            <Text style={{fontWeight:'bold',fontSize:22,padding:10,paddingBottom:1}}>
                              {this.state.findings[this.state.indexToShow]}{'\n'}
                            </Text>
                            <ActivityIndicator color={theme.colors.primary} size='large' style={{padding:0}}/>
                            <Text style={{color:theme.colors.primary,padding:10,fontWeight:'bold',textAlign:'center'}}>Loading Information</Text>
                            </View>

                          ):(
                            <Text style={{fontWeight:'bold',fontSize:22,padding:10,paddingBottom:1}}>
                              {this.state.findings[this.state.indexToShow]}{'\n'}
                              {this.state.diseaseFound.diseaseName=="N/A"?(
                                <>
                                <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}>Disease Info Not
                                  <Text style={{color:theme.colors.primary}}> AVAILABLE.</Text>
                                </Text>
                                </>
                              ):(
                                <>
                                <Text style={{color:theme.colors.primary,fontSize:14}}>{this.state.diseaseFound.severity.toUpperCase() +' RISK.\n'}</Text>
                                <Text style={{fontSize:15,fontWeight:'bold',textAlign:'justify'}}>{this.state.diseaseFound.description.split('.',1)[0]}.</Text>  
                                </>
                              )}
                            </Text>
                          )}
                        </View>
                        <View style={{flex:0.5}}>
                          <Image source={{uri:this.state.Images[this.state.indexToShow].uri}} style={{padding:10,width:200,height:200,resizeMode:'center'}}/>
                        </View>
                      </View>
                      {/* SYMPTOMS FLATLIST */}
                      {(this.state.diseaseFound.diseaseName&&this.state.diseaseFound.diseaseName!="N/A")&&(
                        <>
                        <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center'}}>{'\n'}Symptoms About 
                          <Text style={{color:theme.colors.primary,marginTop:10}}> {'\n'+this.state.diseaseFound.diseaseName.toUpperCase()}.</Text>
                        </Text>
                        <Text style={{fontSize:15,fontWeight:'bold',padding:10,textAlign:'justify'}}>{this.state.diseaseFound.symptoms}</Text>
                        </>
                      )}
                  </View>
                )}
                {/* IF TO BE DETECTED IS WEED */}
                {(this.state.toDetect=="Weed")&&(
                  <View >
                    {this.state.findings[this.state.indexToShow]!="N/A"&&(
                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:0.5}}>
                            <Text style={{fontWeight:'bold',fontSize:16,padding:10,paddingBottom:1}}>
                              Our systems have detected weed in the images you provided.{'\n\n'}
                              Weeds must be remove from the highlighted area, your plants have our <Text style={{color:theme.colors.primary}}>
                                CONCERN.
                              </Text> 
                            </Text>
                        </View>
                        <View style={{flex:0.5}}>
                          <Image source={{uri:this.state.Images[this.state.indexToShow].uri}} style={{padding:10,width:200,height:200,resizeMode:'center'}}/>
                        </View>
                    </View>
                    )}
                    {/* {console.log('In Findings '+(this.state.findings[this.state.indexToShow]=="N/A"))} */}
                    {(this.state.findings[this.state.indexToShow]!="N/A")&&(
                      <View>
                        {this.state.imageWeed==""&&(
                        <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>{'\n'}Fetching Segmentation From Our Server...
                          <ActivityIndicator color={theme.colors.primary} size={20} style={{height:10,width:40}}/>
                        </Text>
                        )}
                        {this.state.imageWeed!=""&&(
                        <View>
                          <Text style={{fontWeight:'bold',fontSize:16,textAlign:'center'}}>Compare the <Text style={{color:theme.colors.primary}}>IMAGES BELOW.</Text></Text>
                            <ImageDiff
                            before={require('../assets/Weed/X6.png')}
                            after={require('../assets/Weed/A6.png')}
                            width={width-10} // other example: screenWidth * 0.7
                            initialHeight={200} // final height will be calculated to maintain aspect ratio
                            initialOffsetPercentage={0.6}
                            separatorWidth={3}
                            separatorColor={theme.colors.primary}
                            style={{margin:5}}
                            />
                        </View>
                        )}
                        </View>
                    )}
                  </View>
                )}
              </View>
            </Modalize>
            {/* PROGRESS UPLOAD */}
            <View
              style={{ flexDirection: "row", height: "45%", marginTop: "10%" }}
            >
              {this.state.Images.map((item, index) => (
                <ImageBackground
                  source={{ uri: item.uri }}
                  style={{
                    width: "100%",
                    resizeMode: "stretch",
                    flex: this.state.toFlex,
                    margin: 1,
                  }}
                  key={index}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      flex: 1,
                      borderWidth: 2,
                    }}
                  >
                    {this.state.uploading[index] && (
                      <View style={this.loadingStyles("Activity")}>
                        <ActivityIndicator
                          color={MainColor}
                          size={Platform.OS == "android" ? 80 : "large"}
                        />
                      </View>
                    )}
                    {this.state.uploading[index] == false && (
                      <View style={this.loadingStyles("done")}>
                        <MaterialCommunityIcons
                          name="check"
                          size={90}
                          color={MainColor}
                        />
                        <TouchableOpacity
                          style={{ margin: 5 }}
                          onPress={async() => {
                            this.setState({
                                indexToShow:index,
                                modalizeOpen:true
                            });
                            switch(this.state.toDetect){
                              case "Pests":
                                  const pest = this.getPest(index);
                                  break;
                              case "Plant Disease":
                                  const disease = this.getDisease(index);
                                  break;
                              case "Weed":
                                  const weed = await this.getWeed(index)
                                  break;
                            }
                            await this.modalizeRef.current.open();
                          }}
                        >
                          <Text
                            style={{
                              padding: 10,
                              backgroundColor: MainColor,
                              color: "white",
                              fontSize: 12,
                              fontWeight:'bold'
                            }}
                          >
                            View Result
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </ImageBackground>
              ))}
            </View>
            {/* INFO ABOUT UPLOAD */}
            <View>
              {this.state.uploaded && (
                <View style={{ height: "30%" }}>
                  {this.state.Images.length == 1 ? (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      Image Uploaded
                    </Text>
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      All Images Uploaded
                    </Text>
                  )}
                  <Text
                    style={{ textAlign: "center", fontSize: 15, padding: 9 }}
                  >
                    Click On View Result to See Any Detected{" "}
                    {this.state.toDetect}
                  </Text>
                </View>
              )}
              {this.state.uploaded == false && (
                <View style={{ height: "30%" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    Uploading {this.state.count} Images...
                  </Text>
                  <Text
                    style={{ textAlign: "center", fontSize: 18, padding: 9 }}
                  >
                    Images are being uploaded to our server.
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      padding: 9,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {"\n"}By using the highly trained Machine Learing Models, we
                    will detect if these pictures have any {this.state.toDetect}
                  </Text>
                </View>
              )}
            </View>
            {/* FOOTER */}
            <Text
              style={{
                color: MainColor,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                height: "15%",
                textAlignVertical: "bottom",
              }}
            >
              Smart Farming ML Systems © - 2020
            </Text>
          </View>
        );
}};

const styles = StyleSheet.create({
  cellLabel: {
    flex: 0.5,
    textAlign: "center",
    borderWidth: 0.6,
    padding: 10,
    textAlignVertical: "center",
    fontWeight:'bold',
    textAlignVertical:'top',
    flex:0.4
  },
  cellValue:{
    flex: 0.6,
    textAlign: "center",
    borderWidth: 0.6,
    textAlign:'justify',
    padding: 10,
    textAlignVertical: "top",      
  }
});

export default UploadImages;