import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';

import AppHeader from '../components/AppHeader';
import RadioSocial from '../components/RadioSocial';
import RadioVolume from '../components/RadioVolume';
import RadioControllers from '../components/RadioControllers';

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

  render() {
    const { actual } = this.props.radio;

    return (
      <LinearGradient colors={['#dc634e', '#cc4532', '#c33f3d']} style={{ flex: 1 }}>
        <AppHeader title="TOCANDO DA PLAYLIST" subtitle={actual.name} logo="true" />
        <View style={styles.body}>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={{ uri: actual ? actual.logo : '' }} />
          </View>
          <RadioVolume />
          <RadioControllers />
        </View>
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <RadioSocial />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
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