import React, { PureComponent } from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import { Header } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { colors } from "../Theme";

class AppHeader extends PureComponent {
  render() {
    let rightElem = null;
    let leftElem = null;
    let centerElem = null;

    // right elem
    if (this.props.right !== false) {
      rightElem = {
        color: "#fff",
        icon: "menu",
        underlayColor: colors.primary.light,
        onPress: () => this.props.navigation.toggleDrawer(),
        ...(this.props.right || {})
      };
    }

    // left elem
    if (this.props.hasBack) {
      leftElem = {
        icon: "chevron-left",
        color: "#fff",
        underlayColor: colors.primary.light,
        onPress: () => this.props.navigation.goBack()
      };
    }

    // center elem
    if (this.props.title && this.props.subtitle) {
      centerElem = (
        <View>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.subtitle}>{this.props.subtitle}</Text>
        </View>
      );
    } else if (this.props.title) {
      centerElem = <Text style={styles.title}>{this.props.title}</Text>;
    }

    return (
      <Header
        statusBarProps={{ translucent: true }}
        backgroundColor={colors.primary.main}
        centerComponent={centerElem}
        leftComponent={leftElem}
        rightComponent={rightElem}
        containerStyle={styles.containerStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    ...Platform.select({
      android: Platform.Version <= 20 ? { paddingTop: 0, height: 56 } : {}
    }),
    borderBottomWidth: 0,
    zIndex: 999
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12
  },
  subtitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  },
  logo: {
    width: 40,
    height: 30,
    resizeMode: "contain"
  }
});

export default withNavigation(AppHeader);
