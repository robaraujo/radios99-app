import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../store/actions/radio';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

class Register extends Component {
  static navigationOptions = {
    title: 'Nova Rádio',
  };

  state = {
    name: '',
    streaming: null,
    logo: null,
    facebook: null,
    twitter: null,
    whatsapp: null,
    instagram: null
  };

  register = () => {
    this.props.onRegister({ ...this.state });
  }

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.setState({
        name: '',
        streaming: null,
        logo: null,
        facebook: null,
        twitter: null,
        whatsapp: null,
        instagram: null
      })
      this.props.navigation.navigate('Profile')
    }
  }

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.label}>Nome da Rádio</Text>
            <TextInput style={styles.input}
              autoFocus={true} value={this.state.name}
              onChangeText={name => this.setState({ name })} />
            <Text style={styles.label}>Streaming</Text>
            <TextInput style={styles.input}
              value={this.state.streaming}
              onChangeText={streaming => this.setState({ streaming })} />
            <Text style={styles.label}>Logomarca</Text>
            <View style={styles.imageContainer}>
              <Image source={this.state.image} style={styles.image} />
            </View>
            <TouchableOpacity onPress={this.pickImage} style={[styles.buttom, { marginBottom: 10 }]}>
              <Text style={styles.buttomText}>Escolha a foto</Text>
            </TouchableOpacity>
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
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity onPress={this.register} style={styles.buttom}>
            <Text style={styles.buttomText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#FFF'
  },
  content: {
    paddingHorizontal: 20,
    width: '100%'
  },
  imageContainer: {
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#EEE',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    resizeMode: 'contain'
  },
  buttom: {
    padding: 10,
    backgroundColor: '#4286F4'
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)