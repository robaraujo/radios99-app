import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeFromPlaylist } from '../store/actions/radio';
const window = Dimensions.get('window');

class SortablePlaylist extends Component {

  remove = item => {
    console.log(item);
    this.props.onRemoveFromPlaylist(item);
  }

  render() {
    const data = this.props.radio.list;
    return (
      <View style={styles.container}>
        {!data.length ?
          <Text style={styles.noRadio}>
            Você ainda não buscou nenhuma rádio, clique no botão abaixo para começar.
          </Text>
          :
          <SortableList
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={data}
            renderRow={this._renderRow} />
        }
      </View>
    );
  }

  _renderRow = ({ data, active, index }) => {
    return <Row data={data} active={active} index={index} remove={item => this.remove(item)} />
  }
}

class Row extends Component {

  constructor(props) {
    super(props);
    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
    const { data, index } = this.props;

    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        <Text style={styles.index}>{index + 1}</Text>
        <Image source={{ uri: data.logo }} style={styles.image} />
        <Text style={styles.text}>{data.name}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Icon style={styles.closeBtn} name="remove" size={20} color="#dadada" onPress={() => this.props.remove(data)} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  noRadio: {
    color: '#5a5a5a',
    textAlign: 'center',
    fontSize: 17,
    padding: 15
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  index: {
    fontWeight: 'bold',
    marginRight: 4
  },
  text: {
    fontSize: 20,
    color: '#222222',
  },
  description: {
    fontSize: 17,
    color: '#dadada'
  },
  closeBtn: {
    position: 'absolute',
    right: 14,
    top: 30
  }
});

const mapStateToProps = state => {
  return {
    radio: state.radio
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveFromPlaylist: radio => dispatch(removeFromPlaylist(radio))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SortablePlaylist));