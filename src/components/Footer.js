import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.socialItem}>
        <Icon name="facebook" size={24} color="#c54134" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialItem}>
        <Icon name="twitter" size={24} color="#c54134" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialItem}>
        <Icon name="whatsapp" size={24} color="#c54134" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialItem}>
        <Icon name="instagram" size={24} color="#c54134" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    height: 60,
    width: '100%',
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  socialItem: {
    backgroundColor: '#8a2517',
    borderRadius: 40,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});