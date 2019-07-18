import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";

import AppHeader from "../components/AppHeader";
import appStyles, { colors } from "../Theme";
import { getRegisteredRadios } from "../store/actions/radio";

import TouchableScale from "react-native-touchable-scale";
import { ListItem } from "react-native-elements";

class RadiosRegistered extends Component {
  componentDidMount = () => {
    if (this.props.user.user) {
      this.props.onGetRegisteredRadios();
    }
  };

  editRadio = radio => {
    this.props.navigation.navigate("RadioRegister", { radio: radio });
  };

  // open register page
  register = () => this.props.navigation.navigate("RadioRegister");

  getRadioAddress = radio => {
    let address = "";
    if (radio.city && radio.state) address = `${radio.city} / ${radio.state}`;
    if (!radio.city && radio.state) address = radio.state;
    return (
      <View>
        <Text>{address}</Text>
      </View>
    );
  };

  renderLogin = () => (
    <View style={styles.container}>
      <AppHeader title="Rádios Registradas" />
      <View style={styles.loginContainer}>
        <Text style={styles.loginMessage}>
          Para registar rádio você precisa estar logado em nosso sistema.
        </Text>
        <Button
          title="Entrar / Registrar"
          buttonStyle={{ backgroundColor: colors.primary.main }}
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </View>
    </View>
  );

  render() {
    if (!this.props.user.token) return this.renderLogin();

    // show message if has no message registered
    let emptyRadios = !this.props.radio.registered.length ? (
      <View style={styles.emptyRadios}>
        <Text style={appStyles.centerMsg}>
          Nenhuma rádio<Text style={appStyles.bold}> cadastrada </Text>
          até o momento. Clique no botão abaixo para cadastrar.
        </Text>
      </View>
    ) : null;

    return (
      <View style={styles.container}>
        <AppHeader title="Rádios Registradas" />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {emptyRadios}
            {this.props.radio.registered.map((radio, i) => (
              <ListItem
                key={i}
                onPress={() => this.editRadio(radio)}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                leftAvatar={{
                  rounded: true,
                  source: radio.logo ? { uri: radio.logo } : null
                }}
                title={radio.name}
                titleStyle={{ color: "#000", fontWeight: "bold" }}
                subtitleStyle={{ color: "#000" }}
                subtitle={
                  radio.city && radio.state
                    ? `${radio.city} / ${radio.state}`
                    : null
                }
                chevron={true}
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={this.register}
            style={appStyles.buttomFooter}
          >
            <Text style={appStyles.buttomFooterText}>Cadastrar Rádio</Text>
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
  },
  emptyRadios: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  loginContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    height: "100%"
  },
  loginMessage: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20
  }
});

const mapStateToProps = state => {
  return {
    radio: state.radio,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetRegisteredRadios: () => dispatch(getRegisteredRadios())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadiosRegistered);
