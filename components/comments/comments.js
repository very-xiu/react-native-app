import React,{Component} from 'react'
import {View,Text,TextInput} from 'react-native'

export default class Comments extends Component{
    constructor(props){
        super(props)
        this.state={
            msg:'1'
        }
    }

    render(){
        return <View>
            <TextInput></TextInput>
            <Text>{this.state.msg}</Text>
        </View>
    }
}