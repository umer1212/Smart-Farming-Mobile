import React from 'react'
import {} from '@expo/vector-icons'


import { StyleSheet,View,TouchableOpacity,Text,FlatList } from 'react-native'



class Community extends React.Component{
    constructor(){
        super()
        this.state=({
            todos:[]
        })
    }

    componentDidMount(){
        this.getData()
    }

    getData=async()=>{
        const response = await fetch('http://192.168.1.7:3000/community');
        const data = await response.json();
        this.setState({
            todos:data
        })
    }

    trunString(s){
        if(s.length >200){
            return s.substring(0,199) + "..."
        }
        return s;
    }
    
    todoList(){
        return this.state.todos.map((todos,index)=>{
            const {postID,postTitle,postDesciption,datePosted,postedBy} = todos;

            console.log(postTitle)
            console.log(datePosted)

            return (
                <View style={styles.container}>
                    <TouchableOpacity>
                        <Text>{postTitle}</Text>
                    </TouchableOpacity>

                    <Text>{postDesciption}</Text>
                    <Text>Posted on {datePosted}</Text>
                    <Text> Posted By {postedBy}</Text>
                </View>
            //      <View style={{flex: 1, paddingTop:20}}>
            //      <FlatList
            //        data={this.state.todos}
            //         renderItem = {({item,index}) =>
                   
            //             <View style = {{padding:10,marginTop:10, borderWidth:1}}>
            //               <Text>{item.postID}</Text>
            //               <Text>{item.postTitle}</Text>
            //               <Text>{item.postDesciption}</Text>
            //               <Text>{item.datePosted}</Text>
            //               <Text>{item.postDesciption}</Text>
            //         </View>
            //        }
            //        keyExtractor={item => index}
            //      />
            //    </View>
            )
        })
    }

    render(){
        return(
            <View>
                <Text>Forum Posts</Text>
                {this.todoList()}
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Community;