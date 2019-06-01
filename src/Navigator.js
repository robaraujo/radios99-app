import React from 'react'
import { createDrawerNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'

import Menu from './components/Menu';
import Radio from './screens/Radio';
import RadioRegister from './screens/RadioRegister';
import RadiosRegistered from './screens/RadiosRegistered';
import Login from './screens/Login';
import Playlist from './screens/Playlist';
import RadioSearch from './screens/RadioSearch';
import Intro from './screens/Intro';

const PlaylistSwitch = createSwitchNavigator({
  Playlist: Playlist,
  RadioSearch: RadioSearch,
}, {
  backBehavior: 'initialRoute'
});
const RegisterSwitch = createSwitchNavigator({
  RadiosRegistered: RadiosRegistered,
  RadioRegister: RadioRegister
}, {
  backBehavior: 'initialRoute'
});

const MenuNavigator = createDrawerNavigator({
  Intro: Intro,
  Register: RegisterSwitch,
  Playlist: PlaylistSwitch,
  Radio: Radio,
  Login: Login
}, {
    contentComponent: Menu,
    drawerPosition: 'right',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });

const App = createAppContainer(MenuNavigator)
export default App