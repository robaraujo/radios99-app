import React from 'react'
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import Menu from './components/Menu';
import Radio from './screens/Radio';
import Profile from './screens/Profile';
import Register from './screens/Register';
import Login from './screens/Login';

const AuthStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const MenuNavigator = createDrawerNavigator({
  Login: Login,
  Radio: Radio,
  Profile: Profile
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