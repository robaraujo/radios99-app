import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";

import { logout } from "../store/actions/user";
import appStyles, { colors } from "../Theme";

class Menu extends Component {
  constructor() {
    super();
    this.proileImage =
      "https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png";

    this.items = [
      {
        icon: <Icon name="play-circle" size={25} color={colors.primary.main} />,
        navOptionName: "Radio",
        screenToNavigate: "Radio",
        separator: false
      },
      {
        icon: <Icon2 name="playlist" size={25} color={colors.primary.main} />,
        navOptionName: "Playlist",
        screenToNavigate: "Playlist",
        separator: false
      },
      {
        icon: <Icon name="plus" size={25} color={colors.primary.main} />,
        navOptionName: "Cadastrar Rádio",
        screenToNavigate: "Register",
        separator: false
      },
      {
        icon: <Icon name="sign-out" size={25} color={colors.primary.main} />,
        navOptionName: "Sair",
        screenToNavigate: "Logout",
        separator: true
      }
    ];
  }

  /**
   * Event menu item clicked
   */
  itemClick = (screenToNavigate, key) => {
    this.props.navigation.closeDrawer();

    if (screenToNavigate === "Logout") {
      this.props.onLogout();
      return this.props.navigation.navigate("Login");
    }
    this.props.navigation.navigate(screenToNavigate);
  };

  /**
   * Test if menu should be visible
   */
  showMenu(menu) {
    const auth = ["Logout", "FormRadio"].indexOf(menu) !== -1;
    const noRadio = menu === "Radio" && !this.props.radio.list.length;
    return (auth && !this.props.user.token) || noRadio ? false : true;
  }

  itemSelected = menu => {
    const state = this.props.navigation.state;
    const selected = state.routes[state.index];
    return selected.key === menu;
  };

  /**
   * Render header different if user is logged
   */
  header = () => {
    // logged
    return this.props.user.token ? (
      <View>
        <Text style={[styles.headerText, appStyles.bold]}>
          {this.props.user.user.email}
        </Text>
        <Text style={styles.headerText}>Usuário autenticado</Text>
      </View>
    ) : (
      <View>
        <Text style={styles.headerText}>Entre e cadastre sua rádio!</Text>
        <Text style={[styles.headerText, appStyles.bold]}>Clique aqui</Text>
      </View>
    );
  };

  render() {
    let itemsMenu = this.items.map((item, key) => {
      if (this.showMenu(item.screenToNavigate)) {
        return (
          <TouchableOpacity
            onPress={() => this.itemClick(item.screenToNavigate, key)}
            key={key}
            style={[
              styles.menuItem,
              this.itemSelected(item.screenToNavigate)
                ? styles.menuSelected
                : null
            ]}
          >
            <View style={{ marginRight: 10, marginLeft: 20 }}>{item.icon}</View>
            <Text style={styles.menuItemText}>{item.navOptionName}</Text>
          </TouchableOpacity>
        );
      }
    });

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => this.itemClick("Login", 5)}
          >
            <View style={styles.avatar}>
              <Icon name="user" size={20} color="#fff" />
            </View>
            {this.header()}
          </TouchableOpacity>
        </View>
        {this.props.navigation.state.routeName}
        <View style={{ width: "100%" }}>{itemsMenu}</View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#222",
    alignItems: "center",
    paddingTop: 20
  },
  avatar: {
    borderWidth: 2,
    borderColor: colors.primary.main,
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    marginLeft: 10,
    marginRight: 10
  },
  headerContainer: {
    width: "100%",
    height: 90,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colors.primary.main,
    marginBottom: 20,
    paddingBottom: 10
  },
  header: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15
  },
  menuSelected: {
    backgroundColor: "#191919"
  },
  menuItemText: {
    fontSize: 15,
    color: "#fff"
  },
  headerText: {
    color: "#fff"
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
    onLogout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
