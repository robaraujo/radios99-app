import React, { memo } from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { colors } from "../Theme";

const Typography = props => {
  const style = {
    ...props.style,
    ...styles[props.variant],
    ...(props.color ? { color: colors[props.color].main } : {})
  };

  return <Text style={style}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  h1: {
    color: colors.text.primary,
    fontWeight: "500",
    fontSize: 35,
    letterSpacing: -0.24,
    lineHeight: 40
  },
  h2: {
    color: colors.text.primary,
    fontWeight: "500",
    fontSize: 29,
    letterSpacing: -0.24,
    lineHeight: 32
  },
  h3: {
    color: colors.text.primary,
    fontWeight: "500",
    fontSize: 24,
    letterSpacing: -0.06,
    lineHeight: 28
  },
  h4: {
    color: colors.text.primary,
    fontWeight: "500",
    fontSize: 20,
    letterSpacing: -0.06,
    lineHeight: 24
  },
  h5: {
    color: colors.text.primary,
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: -0.05,
    lineHeight: 20
  },
  h6: {
    color: colors.text.primary,
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: -0.05,
    lineHeight: 20
  },
  subtitle1: {
    color: colors.text.primary,
    fontSize: 16,
    letterSpacing: -0.05,
    lineHeight: 25
  },
  subtitle2: {
    color: colors.text.primary,
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16
  },
  body1: {
    color: colors.text.primary,
    fontSize: 14,
    letterSpacing: -0.05,
    lineHeight: 21
  },
  body2: {
    color: colors.text.primary,
    fontSize: 12,
    letterSpacing: -0.04,
    lineHeight: 14
  },
  button: {
    color: colors.text.primary,
    fontSize: 14
  },
  caption: {
    color: colors.text.secondary,
    fontSize: 12,
    letterSpacing: 0.3,
    lineHeight: 16
  }
});

Typography.propTypes = {
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "button",
    "caption"
  ]),
  size: PropTypes.number,
  style: PropTypes.object
};

export default memo(Typography);
