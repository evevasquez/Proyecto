import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  Image,
  ToastAndroid,
  Text,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import TopBar from '../components/TopBar';
import { Items } from '../constants/database/products';
import { COLOURS } from '../constants/styles/style';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ProductDetail = ({ active, setActive, route, navigation }) => {
  const { productID } = route.params;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });
    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == productID) {
        const productData = Items[index];

        // Convertir el precio de texto a número
        const priceNumber = parseFloat(productData.productPrice);

        // Formatear el número como moneda colombiana
        const formattedPrice = priceNumber.toLocaleString('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        await setProduct({
          ...productData,
          formattedPrice,
        });
        setLoading(false);
        return;
      }
    }
  };

  const renderProduct = ({ item, index }) => {
    return (
      <View style={styles.productImageContainer}>
        <Image source={item} style={styles.productImage} />
      </View>
    );
  };

  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show('Producto agregado al carrito', ToastAndroid.SHORT);
        handleNavigation('first', 'Inicio');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show('Producto agregado al carrito', ToastAndroid.SHORT);
        handleNavigation('first', 'Inicio');
      } catch (error) {
        return error;
      }
    }
  };

  const handleNavigation = (activeScreen, view) => {
    setActive(activeScreen);
    navigation.navigate(view);
  };

  return (
    <>
      <StatusBar backgroundColor={COLOURS.purple} barStyle="dark-content" />
      <TopBar active={active} setActive={setActive} />
      {!loading ? (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.header}>
              <FlatList
                data={product.productImageList ? product.productImageList : null}
                horizontal
                renderItem={renderProduct}
                showsHorizontalScrollIndicator={false}
                decelerationRate={0.8}
                snapToInterval={width}
                bounces={false}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false },
                )}
              />
              <View style={styles.indicatorContainer}>
                {product.productImageList
                  ? product.productImageList.map((data, index) => {
                    let opacity = position.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [0.2, 1, 0.2],
                      extrapolate: 'clamp',
                    });
                    return (
                      <Animated.View
                        key={index}
                        style={[styles.indicator, { opacity }]}
                      />
                    );
                  })
                  : null}
              </View>
            </View>
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Entypo name="shopping-cart" style={styles.cartIcon} />
                <Text style={styles.productInfoText}>Información del producto</Text>
              </View>
              <Text style={styles.productName}>{product.productName}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <View style={styles.divider} />
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>{product.formattedPrice}</Text>
                <Text style={styles.productTax}>
                  IVA 19% ~{' '}
                  {(parseFloat(product.productPrice) * 0.19).toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{' '}
                  (
                  {(
                    parseFloat(product.productPrice) +
                    parseFloat(product.productPrice) * 0.19
                  ).toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  )
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  disabled={!product.isAvailable}
                  onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
                  style={[
                    styles.addButton,
                    {
                      backgroundColor: product.isAvailable ? COLOURS.green : COLOURS.red,
                    },
                  ]}>
                  <Text style={styles.addButtonText}>
                    {product.isAvailable ? 'Agregar al carrito' : 'Producto no disponible'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" color={COLOURS.primary} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.white,
    top: 30,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  header: {
    width: '100%',
    backgroundColor: COLOURS.backgroundLight,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    marginBottom: 4,
    position: 'relative',
  },
  productImageContainer: {
    width: width,
    height: 240,
    marginTop: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 32,
  },
  indicator: {
    width: '16%',
    height: 2.4,
    backgroundColor: COLOURS.purple,
    marginHorizontal: 4,
    borderRadius: 100,
  },
  productInfo: {
    paddingHorizontal: 16,
    marginTop: 6,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  cartIcon: {
    fontSize: 18,
    color: COLOURS.purple,
    marginRight: 6,
  },
  productInfoText: {
    fontSize: 12,
    color: COLOURS.black,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginVertical: 4,
    color: COLOURS.black,
    maxWidth: '84%',
  },
  productDescription: {
    fontSize: 12,
    color: COLOURS.black,
    fontWeight: '400',
    letterSpacing: 1,
    opacity: 0.5,
    lineHeight: 20,
    textAlign: 'justify',
  },
  divider: {
    marginVertical: 14,
    borderBottomColor: COLOURS.backgroundLight,
    borderBottomWidth: 1,
  },
  priceContainer: {
    paddingHorizontal: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '500',
    color: COLOURS.black,
    marginBottom: 4,
  },
  productTax: {
    fontSize: 12,
    color: COLOURS.black,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  addButton: {
    width: '86%',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLOURS.white,
    textTransform: 'uppercase',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
});

export default ProductDetail;