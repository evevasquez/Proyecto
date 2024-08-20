import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import TopBar from '../components/TopBar';

const PaymentBranch = ({active, setActive}) => {
  return (
    <View style={styles.container}>
      <TopBar active={active} setActive={setActive} />
      <View style={styles.content}>
        <Text>Sucursal de pago</Text>
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

export default PaymentBranch;
