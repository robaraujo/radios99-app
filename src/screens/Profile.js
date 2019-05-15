import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

class Profile extends Component {

  render() {
    let options = { email: this.props.email, secure: true }
    return (
      <View style={styles.container}>
        <Text style={styles.nickname}>{this.props.name}</Text>
        <Text style={styles.email}>{this.props.email}</Text>
        <TouchableOpacity onPress={this.logout} style={styles.buttom}>
          <Text style={styles.buttomText}>Sair</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 100 
  },
  nickname: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold'
  },
  email: {
    marginTop: 20,
    fontSize: 25
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286F4'
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF'
  }
})

// ({ user }) = state.user
const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name
  }
}

export default connect(mapStateToProps)(Profile)