import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import TopBar from '../components/TopBar';
import ProductCarousel from '../components/ProductCarousel';
import {Items} from '../constants/database/products';
import {COLOURS} from '../constants/styles/style';
import {ActivityIndicator} from 'react-native-paper';

const ProductsCategories = ({active, setActive, navigation}) => {
  const [technology, setTechnology] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];

    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == 'technology') {
        productList.push(Items[index]);
      } else if (Items[index].category == 'accessory') {
        accessoryList.push(Items[index]);
      }
    }

    setTechnology(productList);
    setAccessory(accessoryList);
    setLoading(false);
  };

  return (
    <View style={{height: '100%', backgroundColor: COLOURS.white}}>
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
              padding: 20,
              top: 30,
            }}>
            <View>
              <ProductCarousel
                products={technology}
                category={'technology'}
                categoryNameSpanish={'Tecnología'}
                active={active}
                setActive={setActive}
              />
            </View>
            <View style={{top: 10}}>
              <ProductCarousel
                products={accessory}
                category={'accessory'}
                categoryNameSpanish={'Accesorios'}
                active={active}
                setActive={setActive}
              />
            </View>
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

export default ProductsCategories;
