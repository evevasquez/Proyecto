import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import TopBar from '../components/TopBar';

const ProductDetail = ({active, setActive}) => {
  return (
    <View style={styles.container}>
      <TopBar active={active} setActive={setActive} />
      <View style={styles.content}>
        <Text>Detalle del producto</Text>
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

export default ProductDetail;
