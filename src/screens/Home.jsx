// src/screens/Home.jsx
import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, ScrollView, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import TopBar from '../components/TopBar';
import {COLOURS} from '../constants/styles/style';
import ProductCard from '../components/ProductCard';
import {Items} from '../constants/database/products';

const Home = ({active, setActive, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = () => {
    let productList = [];

    for (let index = Items.length - 1; index >= 0; index--) {
      productList.push(Items[index]);
    }

    setProducts(productList);
    setLoading(false);
  };

  const handleNavigation = (activeScreen, view, id) => {
    setActive(activeScreen);
    navigation.navigate(view, {
      productID: id,
    });
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>
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
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
            }}></View>
          <View
            style={{
              marginBottom: 10,
              padding: 16,
            }}>
            <Text
              style={{
                fontSize: 26,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 10,
                alignSelf: 'center',
              }}>
              Orbi Shop
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
                letterSpacing: 1,
                lineHeight: 24,
              }}>
              Productos de calidad {'\n'}Al mejor precio
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  left: 10,
                }}>
                Últimos productos
              </Text>
              <Text
                onPress={() => handleNavigation('sixth', 'Productos', '')}
                style={{
                  fontSize: 14,
                  color: COLOURS.blue,
                  fontWeight: '400',
                  alignSelf: 'flex-start',
                  right: 10,
                }}>
                Ver todo
              </Text>
            </View>
            {products
              .slice(0, 10)
              .reduce((result, product, index, array) => {
                if (index % 2 === 0) {
                  result.push(array.slice(index, index + 2));
                }
                return result;
              }, [])
              .map((productPair, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingHorizontal: 5,
                  }}>
                  {productPair.map(product => (
                    <ProductCard
                      key={product.id}
                      data={product}
                      active={active}
                      setActive={setActive}
                    />
                  ))}
                </View>
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
});

export default Home;
