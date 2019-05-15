import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Volume from '../components/Volume';
import { radioUpdateState, radioUpdateInfo } from '../store/actions/radio';

class Radio extends Component {

  componentDidMount = () => {

    TrackPlayer.registerEventHandler(async (data) => {
      if (data.type === 'playback-track-changed') {
        if (data.nextTrack) {
          const track = await TrackPlayer.getTrack(data.nextTrack);
          this.props.onUpdateInfo({
            title: track.title,
            artist: track.artist,
            artwork: track.artwork
          });
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
      TrackPlayer.add({
        id: 1,
        url: 'http://www.somdomato.com/stream?type=http',
        title: '99 Rádios',
        artist: 'Som do Mato',
        artwork: require('../../assets/cover.png')
      });

      TrackPlayer.add({
        id: 2,
        url: 'http://www.somdomato.com/stream?type=http',
        title: '99 Rádios 2',
        artist: 'Som do Mato 2',
        artwork: require('../../assets/cover.png')
      });

      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE
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

  isPlaying = () => {
    return this.props.radio.playbackState === TrackPlayer.STATE_PLAYING;
  }

  render() {
    return (
      <LinearGradient colors={['#dc634e', '#cc4532', '#c33f3d']} style={styles.container}>
        <Header navigation={this.props.navigation} />
        <View style={styles.body}>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={require('../../assets/cover.png')} />
          </View>
          <Volume />
          <View style={styles.ctrlContainer}>
            <TouchableOpacity onPress={this.playPause} style={[styles.ctrlBtn, styles.nextPrevBtn]}>
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
            <TouchableOpacity onPress={this.playPause} style={[styles.ctrlBtn, styles.nextPrevBtn]}>
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
    margin: '8%',
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
    radio: state.radio,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateState: playbackState => dispatch(radioUpdateState(playbackState)),
    onUpdateInfo: info => dispatch(radioUpdateInfo(info)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radio);