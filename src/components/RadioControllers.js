import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { updateState } from '../store/actions/radio';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrackPlayer from 'react-native-track-player';

class RadioControllers extends Component {

  playPause = async () => {
    // prevent play before ready
    if (!this.props.radio.playbackState) return;

    if (!this.isPlaying()) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  }

  backward = () => {
    console.log(this.props.radio.actual, this.props.radio.actualIndex)
    TrackPlayer.skipToPrevious();
  }

  forward = () => {
    TrackPlayer.skipToNext();
  }

  isPlaying = () => {
    return this.props.radio.playbackState === TrackPlayer.STATE_PLAYING;
  }

  render() {
    return (
      <View style={styles.ctrlContainer}>
        <TouchableOpacity onPress={this.backward} style={[styles.ctrlBtn, styles.nextPrevBtn]}>
          <Icon
            name="backward"
            size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.playPause} style={[styles.ctrlBtn, styles.playPauseBtn]}>
          <Icon
            style={{ marginLeft: this.isPlaying() ? 0 : 8 }}
            name={this.isPlaying() ? 'pause' : 'play'}
            size={50} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.forward} style={[styles.ctrlBtn, styles.nextPrevBtn]}>
          <Icon
            name="forward"
            size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ctrlContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 104
  },
  ctrlBtn: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseBtn: {
    width: 100,
    height: 100
  },
  nextPrevBtn: {
    width: 50,
    height: 50,
    marginTop: 25,
    marginHorizontal: 10
  }
});

const mapStateToProps = ({radio}) => {
  return {
    radio: radio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateState: playbackState => dispatch(updateState(playbackState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioControllers);