import React, { PureComponent } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  View,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";

export default class Component extends PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleFontFamily: PropTypes.string,
    titleFontSize: PropTypes.number,
    backgroundColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderRadius: PropTypes.number,
    activityIndicatorColor: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    customStyles: PropTypes.object,
    zIndex: PropTypes.number
  };

  static defaultProps = {
    title: "Button",
    titleColor: "white",
    backgroundColor: "gray",
    activityIndicatorColor: "white",
    borderRadius: 0,
    zIndex: 1,
    customStyles: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      showLoading: false
    };

    this.loadingValue = {
      height: new Animated.Value(props.height),
      width: new Animated.Value(props.width),
      borderRadius: new Animated.Value(props.borderRadius),
      opacity: new Animated.Value(1)
    };

    this.loadingOverlay = {
      scale: new Animated.Value(0)
    };
  }

  showLoading(showLoading) {
    if (showLoading) {
      this._loadingAnimation(
        this.props.width,
        this.props.height,
        this.props.borderRadius,
        this.props.height / 2,
        1,
        0
      );
      this.setState({ showLoading: showLoading });
    } else {
      setTimeout(() => {
        this._loadingAnimation(
          this.props.height,
          this.props.width,
          this.props.height / 2,
          this.props.borderRadius,
          0,
          1
        );
        this.setState({ showLoading: showLoading });
      }, 1000);
    }
  }

  success() {
    const scale = Dimensions.get("window").height / this.props.height;
    this.loadingOverlay.scale.setValue(0);

    // grow overlay
    Animated.timing(this.loadingOverlay.scale, {
      toValue: scale * 2,
      duration: 700
    }).start();

    // reset loading spinner
    this.showLoading(false);

    // reset overlay after 1000s
    setTimeout(() => {
      Animated.timing(this.loadingOverlay.scale, {
        toValue: 0,
        duration: 500
      }).start();
    }, 1000);
  }

  _loadingAnimation(
    widthStart,
    widthEnd,
    borderRadiusStart,
    borderRadiusEnd,
    opacityStart,
    opacityEnd
  ) {
    if (this.loadingValue.width._value !== widthEnd) {
      this.loadingValue.width.setValue(widthStart);
      this.loadingValue.opacity.setValue(opacityStart);
      this.loadingValue.borderRadius.setValue(borderRadiusStart);

      Animated.timing(this.loadingValue.width, {
        toValue: widthEnd,
        duration: 400
      }).start();

      Animated.timing(this.loadingValue.borderRadius, {
        toValue: borderRadiusEnd,
        duration: 400
      }).start();

      Animated.timing(this.loadingValue.opacity, {
        toValue: opacityEnd,
        duration: 300
      }).start();
    }
  }

  render() {
    return (
      <View style={[styles.container, { zIndex: this.props.zIndex }]}>
        <TouchableWithoutFeedback
          onPress={!this.state.showLoading ? this.props.onPress : null}
        >
          <Animated.View
            style={[
              styles.containerButton,
              {
                width: this.loadingValue.width,
                height: this.loadingValue.height,
                backgroundColor: this.props.backgroundColor,
                borderWidth: this.props.borderWidth,
                borderRadius: this.loadingValue.borderRadius
              }
            ]}
          >
            {this.state.showLoading
              ? this._renderIndicator()
              : this._renderTitle()}
            <Animated.View
              style={[
                styles.containerOverlay,
                {
                  width: this.props.height,
                  height: this.props.height,
                  backgroundColor: this.props.backgroundColor,
                  borderWidth: this.props.borderWidth,
                  borderRadius: 1000,
                  transform: [{ scale: this.loadingOverlay.scale }]
                }
              ]}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  _renderTitle() {
    return (
      <Animated.Text
        style={[
          styles.buttonText,
          {
            opacity: this.loadingValue.opacity,
            color: this.props.titleColor,
            fontFamily: this.props.titleFontFamily,
            fontSize: this.props.titleFontSize
          },
          { ...this.props.customStyles }
        ]}
      >
        {this.props.title}
      </Animated.Text>
    );
  }

  _renderIndicator() {
    return <ActivityIndicator color={this.props.activityIndicatorColor} />;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30
  },
  containerButton: {
    justifyContent: "center"
  },
  buttonText: {
    backgroundColor: "transparent",
    textAlign: "center"
  },
  containerOverlay: {
    position: "absolute",
    top: 0,
    left: 0
  }
});
