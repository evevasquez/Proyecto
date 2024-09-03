import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLOURS} from '../constants/styles/style';
import AntDesing from 'react-native-vector-icons/AntDesign';

const ProductCard = ({categoryNameSpanish}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detalles del producto', {productID: data.id})
      }
      style={{
        width: '48%',
        marginVertical: 14,
      }}>
      <View
        style={{
          width: '100%',
          height: 100,
          borderRadius: 10,
          backgroundColor: COLOURS.backgroundLight,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
        }}>
        <AntDesing
          name="pluscircleo"
          size={50}
          style={{
            resizeMode: 'contain',
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          color: COLOURS.black,
          fontWeight: '600',
          marginBottom: 2,
          textAlign: 'center',
        }}>
        Ver más productos de {categoryNameSpanish.toLowerCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductCard;
