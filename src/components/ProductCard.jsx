import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLOURS } from '../constants/styles/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductCard = ({ data, category, active, setActive }) => {
  const navigation = useNavigation();

  const handleNavigation = (activeScreen, view, id) => {
    setActive(activeScreen);
    navigation.navigate(view, {
      productID: id,
    });
  };

  return (
    <TouchableOpacity
      onPress={() =>
        handleNavigation('eighth', 'Detalles del producto', data.id)
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
        {data.isOff ? (
          <View
            style={{
              position: 'absolute',
              width: '20%',
              height: '24%',
              backgroundColor: COLOURS.green,
              top: 0,
              left: 0,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.white,
                fontWeight: 'bold',
                letterSpacing: 1,
              }}>
              {data.offPercentage}%
            </Text>
          </View>
        ) : null}
        <Image
          source={data.productImage}
          style={{
            width: '80%',
            height: '80%',
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
        }}>
        {data.productName}
      </Text>
      {data.category == category ? (
        data.isAvailable ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome
              name="circle"
              style={{
                fontSize: 12,
                marginRight: 6,
                color: COLOURS.green,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.green,
              }}>
              Disponible
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome
              name="circle"
              style={{
                fontSize: 12,
                marginRight: 6,
                color: COLOURS.red,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.red,
              }}>
              Sin stock
            </Text>
          </View>
        )
      ) : null}
      {!category ? null : (
        <Text>
          {parseFloat(data.productPrice).toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
          })}
        </Text>
      )}


      {/* Renderizado de las tarjetas de productos en el inicio */}
      {!category ? (
        data.isAvailable ? (
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.green,
                  top: 2,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.green,
                }}>
                Disponible
              </Text>
            </View>
            <Text>
              {parseFloat(data.productPrice).toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP',
              })}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.red,
                  top: 2,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.red,
                }}>
                Sin stock
              </Text>
            </View>
            <Text>
              {parseFloat(data.productPrice).toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP',
              })}
            </Text>
          </View>
        )
      ) : null}
      {/* Fin del renderizado de las tarjetas de productos en el inicio */}
    </TouchableOpacity>
  );
};

export default ProductCard;
