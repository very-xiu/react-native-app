import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList, TouchableHighlight,TouchableOpacity } from 'react-native'

// 导入路由组件
import {Actions} from 'react-native-router-flux'

const styles = StyleSheet.create({
    movieTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    AIcontainer: {
        // flex: 1,
        // flexDirection:'co',
        // justifyContent: 'center',
        marginTop: 350
    }
})

export default class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [], // 电影列表
            nowPage: 1, // 当前的页码
            totalPage: 0, // 总页数
            pageSize: 15, // 每页显示的记录条数
            isloading: true // 是否正在加载数据
        }
    }

    UNSAFE_componentWillMount() {
        this.getMoviesByPage()
    }

    render() {
        return <View>
            {this.renderList()}
        </View>
    }

    // 根据页码获取电影列表
    getMoviesByPage = () => {
        const start = (this.state.nowPage - 1) * this.state.pageSize
        const url = `https://douban.uieee.com/v2/movie/in_theaters?start=${start}&count=${this.state.pageSize}`
        fetch(url).then(res => res.json()).then(data => {
            this.setState({
                isloading: false,
                movies: this.state.movies.concat(data.subjects),
                totalPage: Math.ceil(data.total / this.state.pageSize)
            })
        })

        /* setTimeout(() => {
            this.setState({
                isloading: false,
                movies: require('./test_list.json').subjects,
                totalPage: 1
            })
        }, 1000) */
    }

    // 渲染电影列表的方法
    renderList = () => {
        if (this.state.isloading) {
            return <ActivityIndicator size={100} style={styles.AIcontainer}></ActivityIndicator>
        }
        return <FlatList
            data={this.state.movies}
            keyExtractor={(item, i) => i} // 解决 key 问题
            renderItem={({ item }) => this.renderItem(item)} // 调用方法，去渲染每一项
            ItemSeparatorComponent={this.renderSeparator}//渲染分割线的属性方法
            onEndReachedThreshold={0.5} // 距离底部还有多远的时候，触发加载更多的事件
            onEndReached={this.loadNextPage} // 当距离不足 0.5 的时候，触发这个方法，加载下一页数据
        />
    }

    // 加载下一页 PureComponent、shouldComponentUpdate
    loadNextPage = () => {
        // 如果下一页的页码值，大于总页数了，直接return
        if (this.state.nowPage > this.state.totalPage) {
            return
        }
        this.setState({
            nowPage: this.state.nowPage + 1
        }, function () {
            this.getMoviesByPage()
        })
    }

    // 渲染分割线
    renderSeparator = () => {
        return <View style={{ borderTopColor: 'gray', borderTopWidth: 1, marginLeft: 10, marginRight: 10 }}></View>
    }

    // 渲染每项电影
    renderItem = (item) => {
        return <TouchableHighlight underlayColor="white" onPress={()=>{Actions.moviedetail({id:item.id})}}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Image source={{ uri: item.images.large }} style={{ width: 200, height: 250, marginRight: 10 }}></Image>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.movieTitle}><Text>电影名称：</Text>{item.title}</Text>
                    <Text style={styles.movieTitle}><Text>电影类型：</Text>{item.genres.join(',')}</Text>
                    <Text style={styles.movieTitle}><Text>制作年份：</Text>{item.year}</Text>
                    <Text style={styles.movieTitle}><Text>豆瓣评分：</Text>{item.rating.average}</Text>
                </View>
            </View>
        </TouchableHighlight>
    }
}