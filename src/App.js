import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import TrackPlayer from "react-native-track-player";
import axios from "axios";
import firebase from "react-native-firebase";

import Navigator from "./Navigator";
import { setMsg } from "./store/actions/message";
import { updateState, updateActual } from "./store/actions/radio";
import { registerPushToken } from "./store/actions/pushToken";

class App extends Component {
  changeWhenPlaying = 0; // 0=false, 1=changePlaying, 2=ready

  componentWillMount = () => {
    this.configRadio();
    this.configPush();
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      this.props.user.token
    }`;
  };

  configRadio() {
    TrackPlayer.addEventListener("playback-track-changed", async data => {
      if (data.nextTrack) {
        // go next radio or
        this.props.onUpdateActual(data.nextTrack);
      } else {
        // got first radio
        TrackPlayer.skip("0");
      }
      this.changeWhenPlaying =
        this.props.radio.playbackState === TrackPlayer.STATE_PLAYING ? 1 : 0;
    });

    TrackPlayer.addEventListener("playback-state", async data => {
      this.fixChangeWhenPlaying(data.state);
      this.props.onUpdateState(data.state);
    });

    // Creates the player
    TrackPlayer.setupPlayer().then(async () => {
      // Adds a track to the queue
      let tracks = [];
      this.props.radio.list.map((radio, i) => {
        tracks.push({
          id: i + "",
          url: radio.streaming,
          title: radio.name + "(99radios)",
          artist: radio.name,
          artwork: require("../assets/cover.png")
        });
      });
      TrackPlayer.add(tracks);

      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT
        ]
      });

      if (!this.props.radio.actual && this.props.radio.list.length) {
        this.props.onUpdateActual("0");
      } else {
        TrackPlayer.skip(this.props.radio.actualIndex);
      }
    });
  }

  configPush() {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) this.props.onRegisterPushToken(fcmToken);
      });

    firebase.messaging().onTokenRefresh(fcmToken => {
      if (fcmToken) this.props.onRegisterPushToken(fcmToken);
    });
  }

  componentDidUpdate = () => {
    if (this.props.text && this.props.text.toString().trim()) {
      Alert.alert(this.props.title, this.props.text.toString());
      this.props.clearMessage();
    }
  };

  /**
   * Fix bug when change radio playing and lib stop it
   * @param {string} state
   */
  fixChangeWhenPlaying(state) {
    if (this.changeWhenPlaying === 1 && state === TrackPlayer.STATE_READY) {
      this.changeWhenPlaying = 2;
    }
    if (
      this.changeWhenPlaying === 2 &&
      (state === TrackPlayer.STATE_PAUSED ||
        state === TrackPlayer.STATE_PLAYING)
    ) {
      if (state === TrackPlayer.STATE_PAUSED) TrackPlayer.play();
      this.changeWhenPlaying = 0;
    }
  }

  render() {
    return <Navigator />;
  }
}

const mapStateToProps = state => {
  return {
    title: state.message.title,
    text: state.message.text,
    radio: state.radio,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegisterPushToken: token => dispatch(registerPushToken(token)),
    onUpdateState: playbackState => dispatch(updateState(playbackState)),
    onUpdateActual: radioIndex => dispatch(updateActual(radioIndex)),
    clearMessage: () => dispatch(setMsg({ title: "", text: "" }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
