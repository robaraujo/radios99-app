import React from 'react'
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import Menu from './components/Menu';
import Radio from './screens/Radio';
import RegisterRadio from './components/RegisterRadio';
import Login from './screens/Login';
import Radios from './screens/Radios';

const MenuNavigator = createDrawerNavigator({
  Radio: Radio,
  Radios: Radios,
  RegisterRadio: RegisterRadio,
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