import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';

export default class Volume extends Component {
  setVolume = volume => {
    TrackPlayer.setVolume(volume);
  }

  render() {
    return (
      <View style={styles.volumeContainter}>
        <Icon
          style={styles.volumeIcon}
          name='volume-off'
          size={25}
          color='white'
        />
        <Slider
          style={styles.volumeSlider}
          minimumTrackTintColor={'black'}
          maximumTrackTintColor={'#4e4e4e'}
          value={1}
          step={0.1}
          onValueChange={(value) => this.setVolume(value)} />
        <Icon
          style={styles.volumeIcon}
          name='volume-up'
          size={25}
          color='white'
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  volumeContainter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  volumeIcon: {
    paddingTop: 5
  },
  volumeSlider: {
    width: '80%',
    textAlign: 'center',
    marginHorizontal: 10
  },
});