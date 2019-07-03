import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TextInput,
  Image,
  Dimensions
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import ImagePicker from "react-native-image-picker";

import { create, update, remove } from "../store/actions/radio";
import appStyles, { colors } from "../Theme";

import AppHeader from "../components/AppHeader";
import LoadingOverlay from "../components/LoadingOverlay";
const win = Dimensions.get("window");

class RegisterRadio extends Component {
  static navigationOptions = {
    title: "Nova Rádio"
  };

  constructor(props) {
    super(props);
    // is editing some radio?
    let radio = this.props.navigation.getParam("radio", {});

    this.state = {
      name: "Teste",
      streaming: "teste streaming",
      state: "RS",
      city: "POA",
      logo: null,
      facebook: "face",
      twitter: null,
      whatsapp: null,
      instagram: null,
      ...radio
    };
  }

  componentDidUpdate = prevProps => {
    if (
      prevProps.radio.loading &&
      !this.props.radio.loading &&
      !this.props.radio.error
    ) {
      this.props.navigation.goBack();
    }
  };

  handleChoosePhoto = () => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: "Selecione uma imagem",
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log(response);
        this.setState({
          logo: "data:image/jpeg;base64," + response.data
        });
      }
    });
  };

  /**
   * Return if is editing instead of registering
   */
  isEditing = () => {
    return this.state._id;
  };

  /**
   * Submit form of radio
   */
  submit = () => {
    if (this.isEditing()) {
      this.props.onUpdate({ ...this.state });
    } else {
      this.props.onCreate({ ...this.state });
    }
  };

  remove = () => {
    Alert.alert(
      "Remover Rádio",
      "Deseja realmente remover esta rádio? Ninguém mais poderá ouvi-la.",
      [
        { text: "Cancelar", onPress: () => console.log("Cancel remove") },
        { text: "Remover", onPress: () => this.props.onRemove(this.state._id) }
      ]
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <AppHeader
          right={
            this.isEditing() ? { icon: "delete", onPress: this.remove } : false
          }
          hasBack={true}
          title={(this.isEditing() ? "Editando" : "Registrando") + " Rádio"}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <LoadingOverlay message={this.props.radio.loading} />
          <ScrollView style={styles.content}>
            <Text style={styles.label}>Nome da Rádio</Text>
            <TextInput
              style={styles.input}
              autoFocus={true}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
            <Text style={styles.label}>Streaming</Text>
            <TextInput
              style={styles.input}
              value={this.state.streaming}
              onChangeText={streaming => this.setState({ streaming })}
            />
            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              autoFocus={true}
              value={this.state.city}
              onChangeText={city => this.setState({ city })}
            />
            <Text style={styles.label}>Estado</Text>
            <TextInput
              style={styles.input}
              autoFocus={true}
              value={this.state.state}
              onChangeText={state => this.setState({ state })}
            />
            <Text style={styles.label}>Logomarca</Text>
            {this.state.logo ? (
              <Image source={{ uri: this.state.logo }} style={styles.image} />
            ) : null}
            <Button
              buttonStyle={styles.imageBtn}
              title="Escolher Imagem"
              onPress={this.handleChoosePhoto}
            />
            <Text style={styles.label}>Facebook</Text>
            <TextInput
              style={styles.input}
              value={this.state.facebook}
              onChangeText={facebook => this.setState({ facebook })}
            />
            <Text style={styles.label}>Twitter</Text>
            <TextInput
              style={styles.input}
              value={this.state.twitter}
              onChangeText={twitter => this.setState({ twitter })}
            />
            <Text style={styles.label}>Instagram</Text>
            <TextInput
              style={styles.input}
              value={this.state.instagram}
              onChangeText={instagram => this.setState({ instagram })}
            />
            <Text style={styles.label}>Whatsapp</Text>
            <TextInput
              style={styles.input}
              value={this.state.whatsapp}
              onChangeText={whatsapp => this.setState({ whatsapp })}
            />
          </ScrollView>
        </View>
        <Button
          buttonStyle={appStyles.buttomFooter}
          disabled={!!this.props.radio.loading}
          onPress={this.submit}
          title="Salvar"
          loading={!!this.props.radio.loading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  content: {
    padding: 20,
    width: "100%"
  },
  label: {
    fontSize: 17
  },
  input: {
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
    height: 40,
    paddingLeft: 20
  },
  imageBtn: {
    marginBottom: 10,
    backgroundColor: colors.primary
  },
  image: {
    width: win.width - 40,
    height: win.width - 40,
    alignItems: "center"
  },
  removeBtn: {
    backgroundColor: colors.danger,
    marginBottom: 40
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
    onCreate: radio => dispatch(create(radio)),
    onUpdate: radio => dispatch(update(radio)),
    onRemove: id => dispatch(remove(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterRadio);
