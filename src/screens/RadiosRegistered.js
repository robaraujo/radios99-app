import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native'

import AppHeader from '../components/AppHeader';
import appStyles, { colors } from '../Theme';
import { getRegisteredRadios } from '../store/actions/radio';

import TouchableScale from 'react-native-touchable-scale';
import { ListItem } from 'react-native-elements';

class RadiosRegistered extends Component {
  componentDidMount = () => {
    this.props.onGetRegisteredRadios();
  }

  componentDidUpdate = prevProps => {

  }

  // open register page
  register = () => this.props.navigation.navigate('RadioRegister');

  getRadioAddress = radio => {
    if (radio.city && radio.state) return <Text>{radio.city} / {radio.state}</Text>;
    if (!radio.city && radio.state) return <Text>{radio.state}</Text>;
  }
  
  renderLogin = () => (
    <View style={styles.container} >
      <AppHeader title="Rádios Registradas" />
      <View style={styles.loginContainer}>
        <Text style={styles.loginMessage}>
          Para registar rádio você precisa estar logado em nosso sistema.
        </Text>
        <Button
          title="Entrar / Registrar"
          buttonStyle={{ backgroundColor: colors.primary }}
          onPress={() => this.props.navigation.navigate('Login')} />
      </View>
    </View>
  );

  render() {

    if (!this.props.user.token) return this.renderLogin();

    // show message if has no message registered
    let emptyRadios = !this.props.radio.registered.length ? (
      <View style={styles.emptyRadios}>
        <Text>Nenhuma rádio cadastrada até o momento.</Text>
      </View>
    ) : null;

    return (
      <View style={styles.container}>
        <AppHeader title="Rádios Registradas" />
        <View style={{ flex: 1 }} >
          <View style={{ flex: 1 }}>
            {emptyRadios}
            {
              this.props.radio.registered.map(radio => (
                <ListItem
                  Component={TouchableScale}
                  friction={90}
                  tension={100}
                  activeScale={0.95}
                  leftAvatar={{ rounded: true, source: { uri: radio.logo } }}
                  title={radio.name}
                  titleStyle={{ color: '#000', fontWeight: 'bold' }}
                  subtitleStyle={{ color: '#000' }}
                  subtitle={()=> this.getRadioAddress(radio)}
                  chevronColor="red"
                  chevron
                />
              ))
            }
          </View>
          <TouchableOpacity onPress={this.register} style={appStyles.buttomFooter}>
            <Text style={appStyles.buttomFooterText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  emptyRadios: {

  },
  loginContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    height: '100%'
  },
  loginMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20
  },
});

const mapStateToProps = state => {
  return {
    radio: state.radio,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetRegisteredRadios: ()=> dispatch(getRegisteredRadios()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RadiosRegistered)