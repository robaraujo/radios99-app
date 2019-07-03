import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { authenticate } from "../store/actions/user";
import AnimateLoadingButton from "../components/AnimatedButton";
import validator from "validator";

class Login extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    emailError: null,
    passwordError: null
  };

  componentWillMount = () => {
    if (this.props.user.token) {
      this.loginSuccess();
    }
  };

  componentDidUpdate = prevProps => {
    // success login
    if (this.props.user.token) {
      this.loadingButton.success();
      return setTimeout(() => this.loginSuccess(), 700);
    }

    // error login
    if (!this.props.user.loggingIn && prevProps.user.loggingIn) {
      this.loadingButton.showLoading(false);
    }
  };

  _onPressHandler() {
    // validate fields
    let emailError;
    let passwordError;
    if (!validator.isEmail(this.state.email)) {
      emailError = "E-mail inválido.";
    }
    if (!validator.isLength(this.state.password, { min: 5 })) {
      passwordError = "Senha deve conter no mínimo 5 caracteres.";
    }

    // if has some error, prevent submit
    this.setState({ emailError, passwordError });
    if (emailError || passwordError) return;

    // submit
    this.loadingButton.showLoading(true);
    this.props.onAuthenticate({ ...this.state });
  }

  help = () => {};

  loginSuccess = () => {
    const hasRadios = this.props.radio.list.length;
    this.props.navigation.navigate(hasRadios ? "Radio" : "Playlist");
  };

  render() {
    const sizes = Dimensions.get("window");
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          autoFocus={true}
          autoCapitalize="none"
          keyboardType={"email-address"}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        {this.state.emailError && (
          <Text style={styles.error}>{this.state.emailError}</Text>
        )}
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        {this.state.passwordError && (
          <Text style={styles.error}>{this.state.passwordError}</Text>
        )}
        <AnimateLoadingButton
          ref={c => (this.loadingButton = c)}
          width={sizes.width * 0.9}
          height={50}
          title="ENTRAR / REGISTRAR"
          titleFontSize={16}
          titleColor="rgb(255,255,255)"
          backgroundColor="rgb(195,63,61)"
          borderRadius={4}
          onPress={this._onPressHandler.bind(this)}
        />
        <View style={styles.containerLinks}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Playlist")}
          >
            <Text style={styles.linkText}>Suas Rádios</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.help}>
            <Text style={styles.linkText}>Ajuda?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain"
  },
  input: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: "90%",
    backgroundColor: "#EEE",
    height: 50,
    borderRadius: 4
  },
  error: {
    paddingTop: 10,
    paddingLeft: 30,
    color: "#c33f3d",
    width: "100%",
    fontSize: 12,
    textAlign: "left"
  },
  containerLinks: {
    width: "90%",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  linkText: {
    color: "#c33f3d",
    fontWeight: "bold",
    marginHorizontal: 10
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
    onAuthenticate: user => dispatch(authenticate(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
