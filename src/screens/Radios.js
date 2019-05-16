import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';
import { search } from '../store/actions/radio';

class Radio extends Component {

  timeoutSearch = null;

  componentDidMount = () => {
    
  }

  componentDidUpdate = prevProps => {
    if (!this.props.radio.loading && prevProps.radio.loading && this.props.radio.searched) {
      // search success
    }
  }

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
          <Text>teste</Text>
          {this.props.radio.searched.map(radio=> 
            <View>
              <Text>{radio.name}</Text>
            </View>
          )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red'
  },
  input: {
    borderRadius: 4,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#f1f1f1',
    height: 40,
    paddingLeft: 20
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
    onSearch: word => dispatch(search(word))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radio);