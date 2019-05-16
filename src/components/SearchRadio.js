import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { search } from '../store/actions/radio';

class SearchRadio extends Component {

  timeoutSearch = null;

  changeSearch(word) {
    if (this.timeoutSearch) clearTimeout(this.timeoutSearch);
    this.timeoutSearch = setTimeout(() => {
      this.props.onSearch(word);
    }, 500);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput style={styles.input}
          autoFocus={true}
          onChangeText={searchWord => this.changeSearch(searchWord)} />
        {this.props.radio.searched.map(radio =>
          <View>
            <Text>{radio.name}</Text>
          </View>
        )}
      </SafeAreaView>
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
    onSearch: word => dispatch(search(word))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchRadio);