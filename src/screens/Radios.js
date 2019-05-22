import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import { ButtonGroup, Button } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import SearchRadio from '../components/SearchRadio';
import AppHeader from '../components/AppHeader';
import SortablePlaylist from '../components/SortablePlaylist';
import { toggleSearch } from '../store/actions/radio';
import appStyles, { colors } from '../Theme';
import RegisterRadio from '../components/RegisterRadio';

class Radio extends Component {

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Playlist' },
      { key: 'second', title: 'Cadastrar' },
    ],
  };

  componentDidUpdate = prevProps => {
    // detect external change on submenu 
    const newParams = this.props.navigation.state.params || {submenu: 0};
    const prevParams = prevProps.navigation.state.params || {submenu: 0};

    if (newParams.submenu !== prevParams.submenu) {
      this.setState({ index: newParams.submenu });
    }
  }

  componentWillMount = () => {
    // open page with setted submenu
    this.setState({ index: this.props.navigation.getParam('submenu', 0) });
  }

  playlistRoute = () => (
    <View style={{ flex: 1 }} >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <SortablePlaylist />
      </View>
      <TouchableOpacity onPress={() => this.props.onToggleSearch(true)} style={appStyles.buttomFooter}>
        <Text style={appStyles.buttomFooterText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );

  registerRadioRoute = () => (
    <RegisterRadio />
  );

  loginRoute = () => (
    <View style={styles.loginContainer} >
      <Text style={styles.loginMessage}>
        Para registar rádio você precisa estar logado em nosso sistema.
      </Text>
      <Button 
        title="Entrar / Registrar"
        buttonStyle={{backgroundColor: colors.primary}}
        onPress={()=> this.props.navigation.navigate('Login')} />
    </View>
  );

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <AppHeader title="Suas Rádios" />
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: this.playlistRoute,
            second: user.token ? this.registerRadioRoute : this.loginRoute,
          })}
          onIndexChange={index => {console.log(index);this.setState({ index })}}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'white' }}
              style={{ backgroundColor: colors.primary }}
            />
          }
        />
        <Modal isVisible={this.props.radio.searchVisible} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SearchRadio />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
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
  modalContainer: {
    flex: 1,
    alignItems: 'center'
  },
  modalContent: {
    height: '60%',
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
    onToggleSearch: showHide => dispatch(toggleSearch(showHide))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radio);