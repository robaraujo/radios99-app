import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import Footer from '../components/Footer';
import AppHeader from '../components/AppHeader';
import Volume from '../components/Volume';
import { updateState, updateActual } from '../store/actions/radio';

class Radio extends Component {
  
  componentWillMount = () => {
    if (!this.props.radio.list.length) {
      this.props.navigation.navigate('Radios');
    }
  }

  componentDidMount = () => {
    // first time, set radio 0 to be actual
    if (!this.props.radio.actual) {
      this.props.onUpdateActual(0);
    }

    TrackPlayer.registerEventHandler(async (data) => {
      if (data.type === 'playback-track-changed') {
        if (data.nextTrack) {
          const track = await TrackPlayer.getTrack(data.nextTrack);
          this.props.onUpdateActual(track.id);
        }
      } else if (data.type == 'remote-play') {
        TrackPlayer.play()
      } else if (data.type == 'remote-pause') {
        TrackPlayer.pause()
      } else if (data.type == 'remote-next') {
        TrackPlayer.skipToNext()
      } else if (data.type == 'remote-previous') {
        TrackPlayer.skipToPrevious()
      } else if (data.type === 'playback-state') {
        this.props.onUpdateState(data.state);
      }
    });

    // Creates the player
    TrackPlayer.setupPlayer().then(async () => {

      // Adds a track to the queue
      this.props.radio.list.map((radio, i)=> {
        TrackPlayer.add({
          id: i,
          url: radio.streaming,
          title: '99Rádios - ' + (i+1) + ')' + radio.name,
          artist: radio.name,
          artwork: require('../../assets/cover.png')
        });
      });
      

      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT
        ]
      });
    });
  }

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
    const { actual } = this.props.radio;

    return (
      <LinearGradient colors={['#dc634e', '#cc4532', '#c33f3d']}>
        <AppHeader title="TOCANDO DA PLAYLIST" subtitle={actual.name} logo="true" />
        <View style={styles.body}>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={{ uri: actual ? actual.logo : '' }} />
          </View>
          <Volume  />
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
        </View>
        <Footer />
      </LinearGradient>
    );
  }
}
var { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  body: {
    height: height - 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerImage: {
    padding: 20,
    width: '84%',
    height: Dimensions.get('window').width * 4 / 5,
    borderWidth: 2,
    borderColor: '#fff'
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
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

const mapStateToProps = state => {
  return {
    user: state.user,
    radio: state.radio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateState: playbackState => dispatch(updateState(playbackState)),
    onUpdateActual: radioIndex => dispatch(updateActual(radioIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radio);