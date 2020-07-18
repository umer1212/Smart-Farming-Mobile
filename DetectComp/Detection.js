import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';

const Detection = (props) =>{
    return(
        <View>
            <TouchableOpacity onPress={()=>{
                props.navigation.navigate('Camera',{
                    ToDetect:'Plant Disease'
                });
            }}>
                <Text style={styles.list}>Plant Disease Detection</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                props.navigation.navigate('Camera',{
                    ToDetect:'Pests'
                })
            }}>
                <Text style={styles.list}>Pest Detection</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                props.navigation.navigate('Camera',{
                    ToDetect:'Weed'
                })
            }}>
                <Text style={styles.list}>Weed Detection</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    list: { 
        fontSize: 20, 
        borderWidth: 1, 
        padding: 5, 
        margin: 2 
    },
});
export default Detection;