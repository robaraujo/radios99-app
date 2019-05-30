import React from 'react'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'

export default (props) => {
  return props.message && typeof props.message === 'string' ? (
      <View style={[styles.container, styles.absolule]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <View style={[styles.overlay, styles.absolule]}></View>
        <Text>{props.message}</Text>
      </View>
    ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  overlay: {
    opacity: 0.5,
    backgroundColor: '#fff'
  },
  absolule: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  }
});