import * as React from 'react';
import Main from './Components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
//import { Platform, StyleSheet, Text, View } from 'react-native';


const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={ store}>
    < Main />
    </Provider>
    
  );
}

