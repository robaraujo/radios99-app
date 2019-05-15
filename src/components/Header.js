import React, { Component } from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component
{  
  openMenu() {
    this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.menu} onPress={()=> this.openMenu()}>
          <Icon name='navicon' size={25} color="#fff" />
        </TouchableOpacity>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </View>
    )
  }
  
}
const top = Platform.OS === 'ios' ? 25 : 15;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40 + top,
    position: 'absolute',
    top: 0,
    zIndex: 9
  },
  logo: {
    width: 70,
    height: 30,
  },
  menu: {
    position: 'absolute',
    right: 15,
    top: top - 5,
    zIndex: 2
  }
})