import React from 'React';
import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/store/storeConfig';

import App from './src/App';
import { name as appName } from './app.json';

import axios from 'axios';
import Reactotron from 'reactotron-react-native';

Reactotron.configure().useReactNative().connect();
//axios.defaults.baseURL = 'http://3.88.181.58';
axios.defaults.baseURL = 'http://localhost:3000';

const { store, persistor } = configureStore();

const Redux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => Redux);
TrackPlayer.registerPlaybackService(() => require('./src/RadioService.js'));