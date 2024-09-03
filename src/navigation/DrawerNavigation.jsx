// src/components/DrawerNavigation.jsx
import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Drawer as DrawerPaper,
  Text,
  IconButton,
  Divider,
} from 'react-native-paper';
import { BackHandler, View, Image } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import Login from '../screens/Login';
import UserRegistration from '../screens/UserRegistration';
import PaymentBranch from '../screens/PaymentBranch';
import ShoppingCart from '../screens/ShoppingCart';
import ProductsList from '../screens/ProductsList';
import ProductsSearch from '../screens/ProductsSearch';
import ProductDetail from '../screens/ProductDetail';
import ProductsCategories from '../screens/ProductsCategories';
import MyPurchases from '../screens/MyPurchases';
import MyFavorites from '../screens/MyFavorites';
import Offers from '../screens/Offers';
import UserProfile from '../screens/UserProfile';
import HelpAndSupport from '../screens/HelpAndSupport';

import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { active, setActive } = props;
  const didTryAutoLogin = false;
  useEffect(() => {
    const backAction = () => {
      if (active !== 'first') {
        setActive('first');
        props.navigation.navigate('Inicio');
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [active]);

  return (
    <ScrollView
      contentContainerStyle={{
        width: 'auto',
        height: '100%',
      }}>
      <SafeAreaView
        style={{
          top: 5,
          height: '25%',
          with: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBotonColor: '#f4f4f4',
          borderBotonWidth: 1,
          marginBottom: 10,
        }}>
        <IconButton
          size={100}
          icon={() => (
            <Image
              source={require('../../src/constants/database/images/foto_perfil.jpg')}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}
          onPress={() => {
            props.navigation.navigate('Iniciar sesión');
            setActive('second');
          }}
        />
        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            width: '80%',
            color: '#111',
          }}>
          {didTryAutoLogin
            ? userData.fullName
            : 'Inicia sesión para ver tu perfil'}
        </Text>
      </SafeAreaView>
      <Divider
        style={{
          backgroundColor: '#663399',
          width: '95%',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: 1.2,
          bottom: 17,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{ height: '40%' }}>
            <DrawerPaper.Section showDivider={false}>
              <DrawerPaper.Item
                icon="home"
                label="Inicio"
                active={active === 'first'}
                onPress={() => {
                  setActive('first');
                  props.navigation.navigate('Inicio');
                }}
              />
              <DrawerPaper.Item
                icon={({ color, size }) => (
                  <IconMaterialCommunityIcons
                    name="shopping"
                    color={color}
                    size={size}
                  />
                )}
                label="Productos"
                active={active === 'sixth'}
                onPress={() => {
                  props.navigation.navigate('Productos');
                  setActive('sixth');
                }}
              />
              <DrawerPaper.Item
                icon={({ color, size }) => (
                  <IconMaterialIcons name="search" color={color} size={size} />
                )}
                label="Buscar productos"
                active={active === 'seventh'}
                onPress={() => {
                  props.navigation.navigate('Buscar productos');
                  setActive('seventh');
                }}
              />
              <DrawerPaper.Item
                icon={({ color, size }) => (
                  <IconMaterialIcons name="list" color={color} size={size} />
                )}
                label="Categorías"
                active={active === 'ninth'}
                onPress={() => {
                  props.navigation.navigate('Categorias');
                  setActive('ninth');
                }}
              />
              <Divider
                style={{
                  backgroundColor: '#663399',
                  width: '70%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  height: 1.2,
                  top: 17,
                }}
              />
            </DrawerPaper.Section>
          </SafeAreaView>
        </View>
        <DrawerPaper.Section showDivider={false}>
          <View style={{ top: 32 }}>
            <DrawerPaper.Item
              icon={({ color, size }) => (
                <IconMaterialIcons
                  name="shopping-bag"
                  color={color}
                  size={size}
                />
              )}
              label="Mis compras"
              active={active === 'tenth'}
              onPress={() => {
                props.navigation.navigate('Mis compras');
                setActive('tenth');
              }}
            />
            <DrawerPaper.Item
              icon="heart"
              label="Mis productos favoritos"
              active={active === 'eleventh'}
              onPress={() => {
                props.navigation.navigate('Mis favoritos');
                setActive('eleventh');
              }}
            />
            <DrawerPaper.Item
              icon={({ color, size }) => (
                <IconMaterialIcons
                  name="shopping-cart"
                  color={color}
                  size={size}
                />
              )}
              label="Tu carrito"
              active={active === 'fifth'}
              onPress={() => {
                props.navigation.navigate('Tu carrito');
                setActive('fifth');
              }}
            />
            <DrawerPaper.Item
              icon="sale"
              label="Ofertas"
              active={active === 'twelfth'}
              onPress={() => {
                props.navigation.navigate('Ofertas');
                setActive('twelfth');
              }}
            />
            <DrawerPaper.Item
              icon={({ color, size }) => (
                <IconMaterialIcons
                  name="contact-support"
                  color={color}
                  size={size}
                />
              )}
              label="Ayuda y soporte"
              active={active === 'fourteenth'}
              onPress={() => {
                props.navigation.navigate('Ayuda y soporte');
                setActive('fourteenth');
              }}
            />
            <Divider
              style={{
                backgroundColor: '#663399',
                width: '95%',
                marginLeft: 'auto',
                marginRight: 'auto',
                height: 1.2,
                top: 17,
              }}
            />
          </View>
        </DrawerPaper.Section>
      </ScrollView>
    </ScrollView>
  );
}

export function DrawerNavigation() {
  const [active, setActive] = useState('first');
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => (
          <CustomDrawerContent
            {...props}
            active={active}
            setActive={setActive}
          />
        )}
        screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name="Inicio"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <Home {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Iniciar sesión"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <Login {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Crear una cuenta"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <UserRegistration
                {...props}
                active={active}
                setActive={setActive}
              />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Procesar pago"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <PaymentBranch {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Tu carrito"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <ShoppingCart {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Productos"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <ProductsList {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Buscar productos"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <ProductsSearch
                {...props}
                active={active}
                setActive={setActive}
              />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Detalles del producto"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <ProductDetail {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Categorias"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <ProductsCategories
                {...props}
                active={active}
                setActive={setActive}
              />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Mis compras"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <MyPurchases {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Mis favoritos"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <MyFavorites {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Ofertas"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <Offers {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Perfil de usuario"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <UserProfile {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Ayuda y soporte"
          options={{ headerShown: false, unmountOnBlur: true }}>
          {props => (
            <>
              <HelpAndSupport
                {...props}
                active={active}
                setActive={setActive}
              />
            </>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
}
