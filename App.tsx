
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigation} from './src/navigation/DrawerNavigation';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <DrawerNavigation/>
    </NavigationContainer>
  );
}

export default App;
