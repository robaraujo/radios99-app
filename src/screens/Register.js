import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../store/actions/user';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

class Register extends Component {
  static navigationOptions = {
    title: 'Nova Rádio',
  };

  state = {
    email: '',
    password: '',
    name: '',
    streaming: null,
    logo: null,
    facebook: null,
    twitter: null,
    whatsapp: null,
    instagram: null
  }

  

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.setState({
        email: '',
        password: '',
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
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text>Cadastre sua rádio</Text>
          </View>
          <Text style={styles.label}>Nome da Rádio</Text>
          <TextInput style={styles.input}
            autoFocus={true} value={this.state.name}
            onChangeText={name => this.setState({ name })} />
          <Text style={styles.title}>Logomarca</Text>
          <View style={styles.imageContainer}>
            <Image source={this.state.image} style={styles.image} />
          </View>
          <Text style={styles.label}>Logomarca</Text>
          <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
            <Text style={styles.buttomText}>Escolha a foto</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Streaming</Text>
          <TextInput style={styles.input}
            value={this.state.streaming}
            onChangeText={streaming => this.setState({ streaming })} />
          <View style={styles.header}>
            <Text>Dados de acesso</Text>
            <Text>(Usado para futuras alterações)</Text>
          </View>
          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input}
            keyboardType='email-address' value={this.state.email}
            onChangeText={email => this.setState({ email })} />
          <TextInput placeholder="Senha" style={styles.input}
            secureTextEntry={true} value={this.state.password}
            onChangeText={password => this.setState({ password })} />
          <View style={styles.header}>
            <Text>Redes Sociais</Text>
            <Text>(Opciontal)</Text>
          </View>
          <TextInput placeholder="Facebook" style={styles.input}
            value={this.state.facebook}
            onChangeText={name => this.setState({ facebook })} />
        </ScrollView>
        <View>
        <TouchableOpacity onPress={()=> this.props.onCreateUser(this.state)} style={styles.buttom}>
            <Text style={styles.buttomText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  imageContainer: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#EEE',
    marginTop: 10
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
    resizeMode: 'contain'
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286F4'
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF'
  },
  label: {

  },
  input: {
    borderRadius: 4,
    marginTop: 20,
    width: '90%',
    backgroundColor: '#f1f1f1',
    height: 40,
    paddingLeft: 15
  }
})

const mapStateToProps = ({ user }) => {
  return {
    isLoading: user.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateUser: radio => dispatch(createUser(radio)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)