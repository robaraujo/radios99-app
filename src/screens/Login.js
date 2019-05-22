import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { authenticate } from '../store/actions/user'
import AnimateLoadingButton from '../components/AnimatedButton';

class Login extends Component {

  state = {
    name: 'Temporario',
    email: 'Teste',
    password: 'teste'
  }

  componentWillMount = () => {
    console.log('componentWillMount', this.props.user.token)
    if (this.props.user.token) {
      return this.props.navigation.resetTo('Radio');
    }
  }

  componentDidUpdate = prevProps => {
    // success login
    console.log(this.props)
    if (this.props.user.token) {
      this.loadingButton.success();
      return setTimeout(()=> this.props.navigation.navigate('Radio'), 700);
    }

    // error login
    if (!this.props.user.loggingIn && prevProps.user.loggingIn) {
      this.loadingButton.showLoading(false);
    }
  }

  _onPressHandler() {
    this.loadingButton.showLoading(true);
    this.props.onAuthenticate({ ...this.state });
  }

  help = ()=> {
    
  }

  render() {
    const sizes = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <TextInput placeholder='Email' style={styles.input}
          autoFocus={true} keyboardType={"email-address"}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}/>
        <TextInput placeholder="Senha" style={styles.input}
          secureTextEntry={true} value={this.state.password}
          onChangeText={password => this.setState({ password })}/>
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
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Radios', {submenu: 0})}>
            <Text style={styles.linkText}>Suas Rádios</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.help}>
            <Text style={styles.linkText}>Ajuda?</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  input: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: '90%',
    backgroundColor: '#EEE',
    height: 50,
    borderRadius: 4
  },
  containerLinks: {
    width: '90%',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  linkText: {
    color: '#c33f3d',
    fontWeight: 'bold',
    marginHorizontal: 10
  },
})

const mapStateToProps = ({ user }) => {
  return {
    user: user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: user => dispatch(authenticate(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)