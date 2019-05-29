import React, { Component } from 'react';
import { Text, StyleSheet, View, Platform } from 'react-native';
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
        statusBarProps={{ translucent: true }}
        backgroundColor={colors.primary}
        centerComponent={this.centerElem}
        leftComponent={
          this.props.hasBack ?
            { icon: 'chevron-left', color: '#fff', onPress: ()=> this.props.navigation.goBack() }
            : null
        }
        rightComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.toggleDrawer() }}
        containerStyle={styles.containerStyle}
      />
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    ...Platform.select({
      android: Platform.Version <= 20 ? { paddingTop: 0, height: 56 } : {},
    }),
    borderBottomWidth: 0
  },
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