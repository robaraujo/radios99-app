import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { updateState } from "../store/actions/radio";

import AppHeader from "../components/AppHeader";
import RadioSocial from "../components/RadioSocial";
import RadioVolume from "../components/RadioVolume";
import RadioControllers from "../components/RadioControllers";

class Radio extends Component {
  render() {
    const { actual, playbackState } = this.props.radio;

    return (
      <LinearGradient
        colors={["#dc634e", "#cc4532", "#c33f3d"]}
        style={{ flex: 1 }}
      >
        <AppHeader
          title="TOCANDO DA PLAYLIST"
          subtitle={actual.name}
          logo="true"
        />
        <View style={styles.body}>
          <View style={styles.containerImage}>
            <Image
              style={styles.image}
              source={{ uri: actual ? actual.logo : "" }}
            />
          </View>
          <RadioVolume />
          <RadioControllers playbackState={playbackState} />
        </View>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <RadioSocial {...actual} />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50
  },
  containerImage: {
    padding: 20,
    width: "84%",
    height: (Dimensions.get("window").width * 4) / 5,
    borderWidth: 2,
    borderColor: "#fff"
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "100%"
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    radio: state.radio
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateState: playbackState => dispatch(updateState(playbackState)),
    clearMessage: () => dispatch(setMsg({ title: "", text: "" }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radio);
