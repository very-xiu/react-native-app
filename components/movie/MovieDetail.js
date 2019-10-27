import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native'

export default class MovieDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieInfo: {}, //电影详细信息
            isloading: true
        }
    }

    UNSAFE_componentWillMount() {
        fetch('https://douban.uieee.com/v2/movie/subject/' + this.props.id)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    movieInfo: data,
                    isloading: false
                })
            })
    }

    render() {
        return <View>
            {this.renderInfo()}
        </View>
    }

    renderInfo = () => {
        if (this.state.isloading) {
            return <ActivityIndicator size={100} style={{ marginTop: 350 }}></ActivityIndicator>
        }
        return <ScrollView>
            <View style={{padding:6}}>
                <Text style={{textAlign:'center',fontSize:30,marginTop:20,marginBottom:20}}>{this.state.movieInfo.title}</Text>
                <View style={{alignItems:'center'}}>
                    <Image source={{ uri: this.state.movieInfo.images.large }} style={{ width: 300, height: 480 }}></Image>
                </View>
                <Text style={{lineHeight:50,marginTop:20,fontSize:18}}>{this.state.movieInfo.summary}</Text>
            </View>
        </ScrollView>
    }
}