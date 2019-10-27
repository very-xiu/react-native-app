/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet, // 样式相关的组件，专门用来创建样式的
  View, // 用来布局的，相当于 div
  Text // 文本节点，所有文本必须放到这个里面
} from 'react-native';

// 当修改了 项目根目录中，Android 目录下的任何文件之后，如果想要看项目效果，不要使用 react-native start了，而是需要再一次编译安装一下项目 ，运行 react-native run-android
// 导入图标相关的组件
import Icon from 'react-native-vector-icons/FontAwesome'

// 导入Tabbar相关的组件
import TabNavigator from 'react-native-tab-navigator'
// 导入底部 Tab 栏的组件
import Home from './components/Tabbars/Home.js'
import Search from './components/Tabbars/Search.js'
import Shopcar from './components/Tabbars/Shopcar.js'
import Me from './components/Tabbars/Me.js'

// 当修改了 项目根目录中，Android 目录下的任何文件之后，如果想要看项目效果，不要使用 react-native start了，而是需要再一次编译安装一下项目 ，运行 react-native run-android

// 这是 TS（TypeScript） 的语法
export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedTab:'home' // 选中的tab栏名称
    }
  }

  render() {
    return (
      <View style={styles.container} >
        {/* Tab栏区域 */}
        <TabNavigator>
          
          {/* 主页的tab栏 */}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'} // 判断当前的 tab栏是否被选中的
            title="Home" titleStyle={{fontSize:10,fontWeight:'bold',marginTop:0}} //表示tabbar展示的内容
            renderIcon={() => <Icon name="home" size={23} color="gray" />}// 未选中状态下，展示的图标
            renderSelectedIcon={() => <Icon name="home" size={23} color="#298FFE" />}// 选中状态下展示的图标
            onPress={() => this.setState({ selectedTab: 'home' })} //点击tab栏的操作
            >
            <Home></Home>
          </TabNavigator.Item>

          {/* Search的tab栏 */}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'search'}
            title="Search" titleStyle={{fontSize:10,fontWeight:'bold',marginTop:0}}
            renderIcon={() => <Icon name="search" size={23} color="gray" />}
            renderSelectedIcon={() => <Icon name="search" size={23} color="#298FFE" />}
            onPress={() => this.setState({ selectedTab: 'search' })}
            >
            <Search></Search>
          </TabNavigator.Item>

          {/* Shopcar的tab栏 */}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'shopcar'}
            title="Shopcar" titleStyle={{fontSize:10,fontWeight:'bold',marginTop:0}}
            renderIcon={() => <Icon name="shopping-cart" size={23} color="gray" />}
            renderSelectedIcon={() => <Icon name="shopping-cart" size={23} color="#298FFE" />}
            badgeText="0"
            onPress={() => this.setState({ selectedTab: 'shopcar' })}
            >
            <Shopcar></Shopcar>
          </TabNavigator.Item>
          
          {/* Me的tab栏 */}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'me'}
            title="Me" titleStyle={{fontSize:10,fontWeight:'bold',marginTop:0}}
            renderIcon={() => <Icon name="user" size={23} color="gray" />}
            renderSelectedIcon={() => <Icon name="user-o" size={23} color="#298FFE" />}
            onPress={() => this.setState({ selectedTab: 'me' })}
            >
            <Me></Me>
          </TabNavigator.Item>

        </TabNavigator>
      </View>
    );
  }
}

// 使用 StyleSheet.create 创建样式表对象，可以为 create 传递 一个配置对象，这个对象，就是要创建的样式
const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

