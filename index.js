import React from 'React';
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native';
import axios from 'axios';
import Reactotron from 'reactotron-react-native'
import App from './src/App';
import {name as appName} from './app.json';

Reactotron.configure().useReactNative().connect();

import storeConfig from './src/store/storeConfig';
axios.defaults.baseURL = 'http://localhost:3000';

const store = storeConfig()
const Redux = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => Redux);