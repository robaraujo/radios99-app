import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import TrackPlayer from "react-native-track-player";
import { Slider } from "react-native-elements";

const Volume = () => (
  <View style={styles.volumeContainter}>
    <Icon style={styles.volumeIcon} name="volume-off" size={25} color="white" />
    <Slider
      style={styles.volumeSlider}
      minimumTrackTintColor="#000"
      maximumTrackTintColor="#2b2b2b"
      thumbTintColor="#000"
      value={1}
      step={0.1}
      onValueChange={value => TrackPlayer.setVolume(value)}
    />
    <Icon style={styles.volumeIcon} name="volume-up" size={25} color="white" />
  </View>
);

const styles = StyleSheet.create({
  volumeContainter: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20
  },
  volumeIcon: {
    paddingTop: 5
  },
  volumeSlider: {
    width: "80%",
    marginHorizontal: 10
  }
});

export default memo(Volume);
