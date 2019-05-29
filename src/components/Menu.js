import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView, Anim } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { logout } from '../store/actions/user';

class Menu extends Component {
  constructor() {
    super();
    this.proileImage = 'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';

    this.items = [
      {
        navOptionThumb: 'image',
        navOptionName: 'Radio',
        screenToNavigate: 'Radio',
        separator: false,
      }, {
        navOptionThumb: 'image',
        navOptionName: 'Playlist',
        screenToNavigate: 'Playlist',
        separator: false
      }, {
        navOptionThumb: 'image',
        navOptionName: 'Cadastrar Rádio',
        screenToNavigate: 'Register',
        separator: false,
        //params: { submenu: 1 }
      }, {
        navOptionThumb: 'image',
        navOptionName: 'Sair',
        screenToNavigate: 'Logout',
        separator: true,
      },
    ];
  }

  /**
   * Event menu item clicked
   */
  itemClick = (item, key) => {
    this.props.navigation.closeDrawer();

    if (item.screenToNavigate === 'Logout') {
      this.props.onLogout();
      return this.props.navigation.navigate('Login');
    }

    global.currentScreenIndex = key;
    this.props.navigation.navigate(item.screenToNavigate, item.params);
  }

  /**
   * Test if menu should be visible
   */
  showMenu(menu) {
    const auth = ['Logout', 'FormRadio'];
    return auth.indexOf(menu) !== -1 && !this.props.user.token ? false : true;
  }

  /**
   * Render header different if user is logged
   */
  header = () => {
    // logged
    if (this.props.user.token) {
      return <TouchableOpacity style={styles.header}>
        <View>
          <Icon name='user' size={20} color="#808080" />
        </View>
        <View>
          <Text>
            {this.props.user.name}
          </Text>
          <Text>
            Clique aqui
        </Text>
        </View>
      </TouchableOpacity>
    }

    // not logged
    return <TouchableOpacity style={styles.header} onPress={() => this.props.navigation.navigate('Login')}>
      <View>
        <Icon name='user' size={20} color="#808080" />
      </View>
      <View>
        <Text>
          Entre e cadastre sua rádio!
        </Text>
        <Text>
          Clique aqui
        </Text>
      </View>
    </TouchableOpacity>
  }

  render() {
    let itemsMenu = this.items.map((item, key) => {
      if (this.showMenu(item.screenToNavigate)) {
        return <TouchableOpacity
          onPress={() => this.itemClick(item, key)}
          key={key}
          style={[styles.menuItem, { backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff' }]}>
          <View style={{ marginRight: 10, marginLeft: 20 }}>
            <Icon name={item.navOptionThumb} size={25} color="#808080" />
          </View>
          <Text style={{ fontSize: 15, color: global.currentScreenIndex === key ? 'red' : 'black' }}>
            {item.navOptionName}
          </Text>
        </TouchableOpacity>
      }
    });

    return (
      <SafeAreaView style={styles.container}>
        {this.header()}
        <View style={{ width: '100%' }}>
          {itemsMenu}
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    width: '100%',
    maxHeight: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
});

const mapStateToProps = ({ user }) => {
  return {
    user: user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);