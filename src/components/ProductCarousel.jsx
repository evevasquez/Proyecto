// ProductCarousel.jsx
import React from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import {COLOURS} from '../constants/styles/style';
import ProductCard from './ProductCard';
import ShowMoreCarousel from './ShowMoreCarousel';

const {width: viewportWidth} = Dimensions.get('window');

const ProductCarousel = ({
  products,
  category,
  categoryNameSpanish,
  active,
  setActive,
}) => {
  return (
    <>
      <View>
        <View
          style={{
            width: '98%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
              }}>
              {categoryNameSpanish}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
                opacity: 0.5,
                marginLeft: 10,
                top: 1,
              }}>
              {products.length}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.blue,
              fontWeight: '400',
              alignSelf: 'flex-start',
            }}>
            Ver todo
          </Text>
        </View>
        <View></View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        {products.slice(0, 5).map(product => (
          <View
            key={product.id}
            style={{
              width: viewportWidth * 0.9,
              marginRight: -185,
            }}>
            <ProductCard
              data={product}
              category={category}
              active={active}
              setActive={setActive}
            />
          </View>
        ))}

        {products.length > 5 && (
          <View
            style={{
              width: viewportWidth * 0.9,
              marginRight: -185,
            }}>
            <ShowMoreCarousel categoryNameSpanish={categoryNameSpanish} />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default ProductCarousel;
