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
      },{
        navOptionThumb: 'image',
        navOptionName: 'Playlist',
        screenToNavigate: 'Radios',
        separator: false,
        params: { submenu: 0 }
      },{
        navOptionThumb: 'image',
        navOptionName: 'Cadastrar Rádio',
        screenToNavigate: 'Radios',
        separator: false,
        params: { submenu: 1 }
      },{
        navOptionThumb: 'image',
        navOptionName: 'Sair',
        screenToNavigate: 'Logout',
        separator: true,
      },
    ];
  }

  itemClick = (item, key) => {
    this.props.navigation.closeDrawer();

    if (item.screenToNavigate === 'Logout') {
      this.props.onLogout();
      return this.props.navigation.navigate('Login');
    }

    global.currentScreenIndex = key;
    this.props.navigation.navigate(item.screenToNavigate, item.params);
  }

  render() {
    
    let user = this.props.user;

    let itemsMenu = this.items.map((item, key) => {
      if (this.showMenu(item.screenToNavigate)) {
        return <View
          key={key}
          style={[styles.menuItem, {backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff'}]}>
          <View style={{ marginRight: 10, marginLeft: 20 }}>
            <Icon name={item.navOptionThumb} size={25} color="#808080" />
          </View>
          <Text
            style={{
              fontSize: 15,
              color: global.currentScreenIndex === key ? 'red' : 'black',
            }}
            onPress={() => this.itemClick(item, key)}>
            {item.navOptionName}
          </Text>
        </View>
      }
    });

    let header;
    if (user.token) {
      header = (
        <TouchableOpacity style={styles.header}>
          <View>
            <Icon name='user' size={20} color="#808080" />
          </View>
          <View>
            <Text>
              {user.user.email}
            </Text>
            <Text>
              Clique aqui
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      header = (
        <TouchableOpacity style={styles.header} onPress={() => this.props.navigation.navigate('Login')}>
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
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        {header}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        <View style={{ width: '100%' }}>
          {itemsMenu}
        </View>
      </SafeAreaView>
    );
  }

  showMenu(menu) {
    const auth = ['Logout', 'FormRadio'];
    return auth.indexOf(menu) !== -1 && !this.props.user.token ? false : true;
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