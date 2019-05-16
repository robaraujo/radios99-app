import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView, Anim } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Menu extends Component {
  constructor() {
    super();
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: 'camera',
        navOptionName: 'Profile',
        screenToNavigate: 'Profile',
      },
      {
        navOptionThumb: 'image',
        navOptionName: 'Radio',
        screenToNavigate: 'Radio',
      }, {
        navOptionThumb: 'image',
        navOptionName: 'Cadastrar Rádio',
        screenToNavigate: 'FormRadio',
      },
    ];
  }
  render() {
    let user = this.props.user;

    let itemsMenu = this.items.map((item, key) => {
      if (this.showMenu(item.screenToNavigate)) {
        return <View
          key={key}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
          }}>
          <View style={{ marginRight: 10, marginLeft: 20 }}>
            <Icon name={item.navOptionThumb} size={25} color="#808080" />
          </View>
          <Text
            style={{
              fontSize: 15,
              color: global.currentScreenIndex === key ? 'red' : 'black',
            }}
            onPress={() => {
              global.currentScreenIndex = key;
              this.props.navigation.navigate(item.screenToNavigate);
            }}>
            {item.navOptionName}
          </Text>
        </View>
      }
    });

    let header;
    if (user.loggedIn) {
      header = (
        <TouchableOpacity style={styles.header} onPress={() => this.props.navigation.navigate('Login')}>
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
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {itemsMenu}
        </View>
      </SafeAreaView>
    );
  }

  showMenu(menu) {
    return menu === 'FormRadio' && !this.props.user.isLogged ? false : true;
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
  }
});

const mapStateToProps = ({ user }) => {
  return {
    user: user
  };
};

export default connect(mapStateToProps)(Menu);