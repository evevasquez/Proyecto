// src/screens/Home.jsx
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TopBar from '../components/TopBar';

const Home = ({active, setActive}) => {
  return (
    <View style={styles.container}>
      <TopBar active={active} setActive={setActive} />
      <View style={styles.content}>
        <Text>Inicio</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
