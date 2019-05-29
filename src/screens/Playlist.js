import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import SortablePlaylist from '../components/SortablePlaylist';
import appStyles from '../Theme';

class Playlist extends Component {
  openSearch = () => {
    this.props.navigation.navigate('RadioSearch');
  }

  render() {
    return (
      <View style={styles.container}>
        <AppHeader title="Suas Rádios" />
        <View style={{ flex: 1 }} >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <SortablePlaylist />
          </View>
          <TouchableOpacity onPress={this.openSearch} style={appStyles.buttomFooter}>
            <Text style={appStyles.buttomFooterText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});

const mapStateToProps = state => {
  return {
    radio: state.radio
  }
}

export default connect(mapStateToProps)(Playlist);