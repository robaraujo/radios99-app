import React, { Component } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { colors } from '../Theme';

class AppHeader extends Component
{  
  centerElem = () => {
    if (this.props.title && this.props.subtitle) {
      return <View>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.subtitle}>{this.props.subtitle}</Text>
            </View>
    }
    if (this.props.title) {
      return <Text style={styles.title}>{this.props.title}</Text>
    }
  }

  render() {
    return (
      <Header
        backgroundColor={colors.primary}
        centerComponent={this.centerElem}
        rightComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.toggleDrawer() }}
        containerStyle={{ borderBottomWidth:0 }}
      />
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  logo: {
    width: 40,
    height: 30,
    resizeMode: 'contain'
  }
});

export default withNavigation(AppHeader);