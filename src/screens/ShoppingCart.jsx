import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../constants/database/products';
import {COLOURS} from '../constants/styles/style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator} from 'react-native-paper';
import TopBar from '../components/TopBar';

const ShoppingCart = ({active, setActive, navigation}) => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromAsyncStorage();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromAsyncStorage = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    if (!items) {
      setProduct([]);
      setTotal(null);
      setLoading(false);
      return;
    }
    let productData = [];
    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct([]);
      getTotal(false);
    }
    setLoading(false);
  };

  const getTotal = productData => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice;
    }
    setTotal(total);
  };

  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        getDataFromAsyncStorage();
      }
    }
  };

  const handleNavigation = (activeScreen, view, id) => {
    setActive(activeScreen);
    navigation.navigate(view, {
      productID: id,
    });
  };

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    } finally {
      setProduct([]);
      setTotal(null);
      setLoading(true);
      ToastAndroid.show(
        '¡Sus productos serán enviados pronto!',
        ToastAndroid.SHORT,
      );
    }
    handleNavigation('first', 'Inicio');
  };

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        key={data.id}
        onPress={() =>
          handleNavigation('eighth', 'Detalles del producto', data.id)
        }
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image
            source={data.productImage}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {data.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                }}>
                {parseFloat(data.productPrice).toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
              <Text>1</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={COLOURS.purple} barStyle="dark-content" />
      <TopBar active={active} setActive={setActive} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={COLOURS.primary}
          />
        </View>
      ) : product.length > 0 && product ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLOURS.white,
            position: 'relative',
            top: 30,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingTop: 16,
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleNavigation('first', 'Inicio')}>
              <MaterialCommunityIcons
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.backgroundLight,
                  borderRadius: 12,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
              }}>
              Detalles del pedido
            </Text>
            <View></View>
          </View>
          <ScrollView>
            <Text
              style={{
                fontSize: 20,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                paddingTop: 20,
                paddingLeft: 16,
                marginBottom: 10,
              }}>
              Productos en tu carrito
            </Text>
            <View
              style={{
                paddingHorizontal: 16,
              }}>
              {product.map(renderProducts)}
            </View>
            <View>
              <View
                style={{
                  paddingHorizontal: 16,
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                    marginBottom: 20,
                  }}>
                  Dirección de envío
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '80%',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        color: COLOURS.blue,
                        backgroundColor: COLOURS.backgroundLight,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 12,
                        borderRadius: 10,
                        marginRight: 18,
                      }}>
                      <MaterialCommunityIcons
                        name="truck-delivery-outline"
                        style={{
                          fontSize: 18,
                          color: COLOURS.purple,
                        }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLOURS.black,
                          fontWeight: '500',
                        }}>
                        Carrera 30 # 16-62
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: COLOURS.black,
                          fontWeight: '400',
                          lineHeight: 20,
                          opacity: 0.5,
                        }}>
                        051010, Medellin
                      </Text>
                    </View>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    style={{fontSize: 22, color: COLOURS.black}}
                  />
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 16,
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                    marginBottom: 20,
                  }}>
                  Método de pago
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '80%',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        color: COLOURS.blue,
                        backgroundColor: COLOURS.backgroundLight,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 12,
                        borderRadius: 10,
                        marginRight: 18,
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '900',
                          color: COLOURS.blue,
                          letterSpacing: 1,
                        }}>
                        VISA
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLOURS.black,
                          fontWeight: '500',
                        }}>
                        Visa Classic
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: COLOURS.black,
                          fontWeight: '400',
                          lineHeight: 20,
                          opacity: 0.5,
                        }}>
                        ****-9092
                      </Text>
                    </View>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    style={{fontSize: 22, color: COLOURS.black}}
                  />
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 16,
                  marginTop: 40,
                  marginBottom: 80,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                    marginBottom: 20,
                  }}>
                  Información de pago
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      maxWidth: '80%',
                      color: COLOURS.black,
                      opacity: 0.5,
                    }}>
                    Subtotal
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: COLOURS.black,
                      opacity: 0.8,
                    }}>
                    {parseFloat(total).toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 22,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      maxWidth: '80%',
                      color: COLOURS.black,
                      opacity: 0.5,
                    }}>
                    IVA
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: COLOURS.black,
                      opacity: 0.8,
                    }}>
                    {(parseFloat(total) * 0.19).toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      maxWidth: '80%',
                      color: COLOURS.black,
                      opacity: 0.5,
                    }}>
                    Total
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      color: COLOURS.black,
                    }}>
                    {(
                      parseFloat(total) +
                      parseFloat(total) * 0.19
                    ).toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 50,
              height: '8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => (total != 0 ? checkOut() : null)}
              style={{
                width: '30%',
                height: '40%',
                backgroundColor: COLOURS.purple,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                top: 30,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  letterSpacing: 1,
                  color: COLOURS.white,
                  textTransform: 'uppercase',
                }}>
                Ir a pagar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLOURS.white,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24, color: COLOURS.black, fontWeight: '400'}}>
            No tienes productos en tu carrito
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
});

export default ShoppingCart;
