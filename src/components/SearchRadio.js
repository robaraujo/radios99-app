import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, SearchBar, Header } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import TrackPlayer from 'react-native-track-player';

import { search, addToPlaylist, toggleSearch } from '../store/actions/radio';

class SearchRadio extends Component {

  state = {
    searchWord: '',
  };

  timeoutSearch = null;

  componentDidMount() {
    this.props.onSearch('');
  }

  /**
   * add radio to playlist and hide search modal
   */
  addToPlaylist = radio => {
    // add to tracker
    TrackPlayer.add({
      id: this.props.radio.list.length,
      url: radio.streaming,
      title: '99 Rádios',
      artist: radio.name,
      artwork: require('../../assets/cover.png')
    });
    // add radio to playlist
    this.props.onAddToPlaylist(radio);
    // close search
    setTimeout(()=> this.props.onToggleSearch(false), 200);
  }

  /**
   * On change search word, search radios again
   */
  changeSearch = searchWord => {
    this.setState({ searchWord });
    // prevent to trigger search if user type and less then 500ms
    if (this.timeoutSearch) clearTimeout(this.timeoutSearch);
    // trigger search after 500ms
    this.timeoutSearch = setTimeout(() => {
      this.props.onSearch(searchWord);
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Buscar Rádio', style: { color: '#fff' } }}
          rightComponent={{ icon: 'close', color: '#fff', onPress: ()=> this.props.onToggleSearch(false) }}
        />
        <SearchBar
          containerStyle={{ borderWidth: 0 }}
          lightTheme={true}
          showLoading={this.props.radio.loading}
          placeholder="Nome da rádio"
          onChangeText={this.changeSearch}
          value={this.state.searchWord}
        />
        <View>
          {
            this.props.radio.searched.map((radio, i) =>
              <ListItem
                key={i}
                style={{ borderRadius: 5, margin: 3 }}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                leftAvatar={{ rounded: true, source: { uri: radio.logo } }}
                title={radio.name}
                subtitleStyle={{ color: '#dadada' }}
                subtitle="best rádio on the world"
                chevron
                onPress={() => this.addToPlaylist(radio)}
              />
            )
          }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
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
  }
});

const mapStateToProps = state => {
  return {
    radio: state.radio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearch: word => dispatch(search(word)),
    onAddToPlaylist: radio => dispatch(addToPlaylist(radio)),
    onToggleSearch: showHide => dispatch(toggleSearch(showHide))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchRadio);