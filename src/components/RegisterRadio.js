import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../store/actions/radio';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import appStyles from '../Theme';

class RegisterRadio extends Component {
  static navigationOptions = {
    title: 'Nova Rádio',
  };

  state = {
    name: '',
    streaming: null,
    state: null,
    city: null,
    logo: null,
    facebook: null,
    twitter: null,
    whatsapp: null,
    instagram: null
  };

  register = () => {
    this.props.onRegister({ ...this.state });
  }

  render() {

    return (
      <View style={{ flex: 1 }} >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <ScrollView style={styles.content}>
            <Text style={styles.label}>Nome da Rádio</Text>
            <TextInput style={styles.input}
              autoFocus={true} value={this.state.name}
              onChangeText={name => this.setState({ name })} />
            <Text style={styles.label}>Streaming</Text>
            <TextInput style={styles.input}
              value={this.state.streaming}
              onChangeText={streaming => this.setState({ streaming })} />
            <Text style={styles.label}>Cidade</Text>
            <TextInput style={styles.input}
              autoFocus={true} value={this.state.city}
              onChangeText={city => this.setState({ city })} />
            <Text style={styles.label}>Estado</Text>
            <TextInput style={styles.input}
              autoFocus={true} value={this.state.state}
              onChangeText={state => this.setState({ state })} />
            <Text style={styles.label}>Logomarca</Text>
            <TextInput style={styles.input}
              autoFocus={true} value={this.state.logo}
              onChangeText={logo => this.setState({ logo })} />
            <Text style={styles.label}>Facebook</Text>
            <TextInput style={styles.input}
              value={this.state.facebook}
              onChangeText={facebook => this.setState({ facebook })} />
            <Text style={styles.label}>Twitter</Text>
            <TextInput style={styles.input}
              value={this.state.twitter}
              onChangeText={twitter => this.setState({ twitter })} />
            <Text style={styles.label}>Instagram</Text>
            <TextInput style={styles.input}
              value={this.state.instagram}
              onChangeText={instagram => this.setState({ instagram })} />
            <Text style={styles.label}>Whatsapp</Text>
            <TextInput style={styles.input}
              value={this.state.whatsapp}
              onChangeText={whatsapp => this.setState({ whatsapp })} />
          </ScrollView>
        </View>
        <TouchableOpacity onPress={this.register} style={appStyles.buttomFooter}>
          <Text style={appStyles.buttomFooterText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    width: '100%'
  },
  label: {
    fontSize: 17
  },
  input: {
    borderRadius: 4,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#f1f1f1',
    height: 40,
    paddingLeft: 20
  }
})

const mapStateToProps = ({ user }) => {
  return {
    isLoading: user.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: radio => dispatch(register(radio)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterRadio)