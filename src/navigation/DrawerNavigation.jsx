// src/components/DrawerNavigation.jsx
import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Drawer as DrawerPaper,
  Text,
  IconButton,
  Divider,
  Button,
} from 'react-native-paper';
import {BackHandler, View} from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import TopBar from '../components/TopBar';
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

import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {active, setActive} = props;
  const didTryAutoLogin = false;
  useEffect(() => {
    const backAction = () => {
      if (active !== 'first') {
        setActive('first');
        props.navigation.navigate('Inicio');
        return true; // Esto previene que la app se cierre
      }
      // Si la pantalla activa es 'Inicio', permite que el comportamiento por defecto del botón de retroceso se ejecute
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Limpia el listener al desmontar el componente
  }, [active]); // Se ejecuta cada vez que 'active' cambia

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
          icon={({color, size}) => (
            <IconMaterialIcons
              name="account-circle"
              color={color}
              size={size}
            />
          )}
          onPress={() => {
            props.navigation.navigate('Perfil de usuario');
            setActive('thirteenth');
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
      <ScrollView>
        <View style={{flex: 0.5}}>
          <SafeAreaView style={{height: '50%'}}>
            <DrawerPaper.Section>
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
                icon="login"
                label="Iniciar sesión"
                active={active === 'second'}
                onPress={() => {
                  props.navigation.navigate('Iniciar sesión');
                  setActive('second');
                }}
              />
              <DrawerPaper.Item
                icon="account"
                label="Crear una cuenta"
                active={active === 'third'}
                onPress={() => {
                  props.navigation.navigate('Crear una cuenta');
                  setActive('third');
                }}
              />
              <DrawerPaper.Item
                icon={({color, size}) => (
                  <IconMaterialIcons name="payment" color={color} size={size} />
                )}
                label="Procesar pago"
                active={active === 'fourth'}
                onPress={() => {
                  props.navigation.navigate('Procesar pago');
                  setActive('fourth');
                }}
              />
              <DrawerPaper.Item
                icon={({color, size}) => (
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
                icon={({color, size}) => (
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
                icon={({color, size}) => (
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
                icon={({color, size}) => (
                  <IconIonicons name="information" color={color} size={size} />
                )}
                label="Detalles del producto"
                active={active === 'eighth'}
                onPress={() => {
                  props.navigation.navigate('Detalles del producto');
                  setActive('eighth');
                }}
              />
              <DrawerPaper.Item
                icon={({color, size}) => (
                  <IconMaterialIcons name="list" color={color} size={size} />
                )}
                label="Categorías"
                active={active === 'ninth'}
                onPress={() => {
                  props.navigation.navigate('Categorias');
                  setActive('ninth');
                }}
              />
              <DrawerPaper.Item
                icon={({color, size}) => (
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
                icon="sale"
                label="Ofertas"
                active={active === 'twelfth'}
                onPress={() => {
                  props.navigation.navigate('Ofertas');
                  setActive('twelfth');
                }}
              />
              <DrawerPaper.Item
                icon="account"
                label="Perfil de usuario"
                active={active === 'thirteenth'}
                onPress={() => {
                  props.navigation.navigate('Perfil de usuario');
                  setActive('thirteenth');
                }}
              />
              <DrawerPaper.Item
                icon={({color, size}) => (
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
            </DrawerPaper.Section>
          </SafeAreaView>
        </View>
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
        screenOptions={{headerShown: false}}>
        <Drawer.Screen
          name="Inicio"
          options={{headerShown: false, unmountOnBlur: true}}>
          {props => (
            <>
              <Home {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Iniciar sesión"
          options={{headerShown: false, unmountOnBlur: true}}>
          {props => (
            <>
              <Login {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Crear una cuenta"
          options={{headerShown: false, unmountOnBlur: true}}>
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
          options={{headerShown: false, unmountOnBlur: true}}>
          {props => (
            <>
              <PaymentBranch {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Tu carrito"
          options={{headerShown: false, unmountOnBlur: true}}>
          {props => (
            <>
              <ShoppingCart {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Productos"
          options={{headerShown: false, unmountOnBlur: true}}>
          {props => (
            <>
              <ProductsList {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Buscar productos"
          options={{headerShown: false, unmountOnBlur: true}}>
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
          options={{headerShown: false, unmountOnBlur: true}}>
          {props => (
            <>
              <ProductDetail {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Categorias"
          options={{headerShown: false, unmountOnBlur: true}}>
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
          options={{headerShown: false, unmountOnBlur: true}}>
          {props => (
            <>
              <MyPurchases {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Mis favoritos"
          options={{headerShown: false, unmountOnBlur: true}}>
          {props => (
            <>
              <MyFavorites {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Ofertas"
          options={{headerShown: false, unmountOnBlur: true}}>
          {props => (
            <>
              <Offers {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Perfil de usuario"
          options={{headerShown: false, unmountOnBlur: true}}>
          {props => (
            <>
              <UserProfile {...props} active={active} setActive={setActive} />
            </>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Ayuda y soporte"
          options={{headerShown: false, unmountOnBlur: true}}>
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
