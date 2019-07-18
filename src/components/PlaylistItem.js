import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  Easing,
  Text,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
const window = Dimensions.get("window");

import Typography from "./Typography";
import { colors } from "../Theme";

class PlaylistItem extends Component {
  constructor(props) {
    super(props);
    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            }
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10]
          })
        },

        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07]
              })
            }
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6]
          })
        }
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active)
      }).start();
    }
  }

  render() {
    const { data, index, activeRow } = this.props;
    const selected = this.props.selected == index && !activeRow;
    const color = selected ? "white" : "black";
    let style = {
      ...styles.row,
      ...this._style,
      backgroundColor: selected ? colors.primary.main : "#fff"
    };

    return (
      <Animated.View style={style}>
        <Typography style={{ marginRight: 5 }} color={color} variant="h6">
          {index + 1}
        </Typography>
        <Image source={{ uri: data.logo }} style={styles.image} />
        <TouchableOpacity onPress={() => this.props.onClick(index)}>
          <Typography variant="h4" color={color}>
            {data.name}
          </Typography>
          <View style={{ opacity: 0.75 }}>
            <Typography variant="subtitle1" color={color}>
              {selected ? "atual" : "toque para reproduzir"}
            </Typography>
          </View>
        </TouchableOpacity>
        <Icon
          style={styles.closeBtn}
          name="remove"
          size={20}
          color="#dadada"
          onPress={() => this.props.onRemove(data)}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30
      }
    })
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25
  },
  iconPlay: {
    fontSize: 14,
    color: "#aaa"
  },
  closeBtn: {
    position: "absolute",
    right: 14,
    top: 30
  }
});

PlaylistItem.propTypes = {
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  active: PropTypes.string
};

export default PlaylistItem;
