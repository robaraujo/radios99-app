import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";

import SearchRadio from '../components/SearchRadio';

class Radio extends Component {

  state = {
    searchVisible: false
  };

  componentDidMount = () => {

  }

  componentDidUpdate = prevProps => {
    if (!this.props.radio.loading && prevProps.radio.loading && this.props.radio.searched) {
      // search success
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Sua Playlist</Text>

        <TouchableOpacity onPress={()=> this.setState({searchVisible: true})} style={styles.buttom}>
          <Text style={styles.buttomText}>Buscar</Text>
        </TouchableOpacity>

        <Modal isVisible={this.state.searchVisible} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SearchRadio/>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  input: {
    borderRadius: 4,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#f1f1f1',
    height: 40,
    paddingLeft: 20
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
  modalContainer: {
    flex: 1,
    alignItems: 'center'
  },
  modalContent: {
    height: '40%',
    width: '90%',
    borderRadius: 10,

    backgroundColor: '#fff'
  }
});

const mapStateToProps = state => {
  return {
    radio: state.radio,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radio);