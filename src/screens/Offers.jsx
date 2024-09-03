import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import TopBar from '../components/TopBar';
import ProductCard from '../components/ProductCard';
import {Items} from '../constants/database/products';
import {COLOURS} from '../constants/styles/style';

const Offers = ({active, setActive, navigation}) => {
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

    for (let index = 0; index < Items.length; index++) {
      if (Items[index].isOff && Items[index].isAvailable) {
        productList.push(Items[index]);
      }
    }

    setProducts(productList);
    setLoading(false);
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
          <View>
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 10,
                alignSelf: 'center',
                marginTop: 10,
              }}>
              Nuestras ofertas
            </Text>

            {products
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

export default Offers;
