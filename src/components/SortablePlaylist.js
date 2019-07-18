import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import SortableList from "react-native-sortable-list";
import TrackPlayer from "react-native-track-player";
import PropTypes from "prop-types";

import PlaylistItem from "./PlaylistItem";
const window = Dimensions.get("window");

class SortablePlaylist extends Component {
  state = {
    activeRow: null
  };

  onClick = async index => {
    if (index != this.props.selected) {
      await TrackPlayer.skip(index + "");
    } else {
      await TrackPlayer.pause();
    }
  };

  remove = item => {
    this.props.onRemoveFromPlaylist(item);
  };

  onChangeOrder = (i, order) => {
    this.props.onReorder(order);
    this.setState({ activeRow: null });
  };

  onActivateRow = activeRow => {
    this.setState({ activeRow });
  };

  render() {
    const { radios } = this.props;

    return (
      <View style={styles.container}>
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={radios}
          renderRow={this.renderRow}
          onActivateRow={this.onActivateRow}
          onReleaseRow={this.onChangeOrder}
        />
      </View>
    );
  }

  renderRow = ({ data, active, index }) => {
    return (
      <PlaylistItem
        data={data}
        activeRow={this.state.activeRow}
        active={active}
        index={index}
        selected={this.props.selected}
        onClick={this.onClick}
        onRemove={this.props.onRemove}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",

    ...Platform.select({
      ios: {
        paddingTop: 20
      }
    })
  },
  list: {
    flex: 1
  },
  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30
      },

      android: {
        paddingHorizontal: 0
      }
    })
  }
});

SortableList.propTypes = {
  radios: PropTypes.array,
  selected: PropTypes.number,
  onRemove: PropTypes.func,
  onReorder: PropTypes.func
};

export default SortablePlaylist;
