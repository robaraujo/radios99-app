import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import appStyles from "../Theme";
import AppHeader from "../components/AppHeader";
import SortablePlaylist from "../components/SortablePlaylist";
import { removeFromPlaylist, playlistReorder } from "../store/actions/radio";

class Playlist extends Component {
  openSearch = () => {
    this.props.navigation.navigate("RadioSearch");
  };

  render() {
    const { radio, onRemove, onReorder } = this.props;

    return (
      <View style={styles.container}>
        <AppHeader title="Suas Rádios" />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {radio.list.length ? (
              <SortablePlaylist
                radios={radio.list}
                selected={radio.actualIndex}
                onRemove={onRemove}
                onReorder={onReorder}
              />
            ) : (
              <View style={appStyles.flexCenter}>
                <Text style={appStyles.centerMsg}>
                  Busque agora mesmo suas
                  <Text style={appStyles.bold}> rádios </Text>
                  favoritas.
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={this.openSearch}
            style={appStyles.buttomFooter}
          >
            <Text style={appStyles.buttomFooterText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

const mapStateToProps = state => {
  return {
    radio: state.radio
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemove: radio => dispatch(removeFromPlaylist(radio)),
    onReorder: order => dispatch(playlistReorder(order))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
