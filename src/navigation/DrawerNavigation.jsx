import Home from "../screens/Home";  
import Login from "../screens/Login"; 
import UserRegistration from "../screens/UserRegistration";
import PaymentBranch from "../screens/PaymentBranch";
import ShoppingCart from "../screens/ShoppingCart";
import ProductsList from "../screens/ProductsList";
import ProductsSearch from "../screens/ProductsSearch";
import ProductDetail from "../screens/ProductDetail";
import ProductsCategories from "../screens/ProductsCategories";
import MyPurchases from "../screens/MyPurchases";
import MyFavorites from "../screens/MyFavorites";
import Offers from "../screens/Offers";
import UserProfile from "../screens/UserProfile";
import HelpAndSupport from "../screens/HelpAndSupport";

import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as DrawerPaper } from 'react-native-paper';
import { BackHandler } from 'react-native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const [active, setActive] = useState('first'); //Estado para guardar la pantalla activa

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

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); // Limpia el listener al desmontar el componente
    }, [active]); // Se ejecuta cada vez que 'active' cambia

    return (
        <DrawerPaper.Section title="Menú">
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
                icon="magnify"
                label="Iniciar sesión"
                active={active === 'second'}
                onPress={() => {
                    props.navigation.navigate('Iniciar sesión');
                    setActive('second');
                }}
            />
            <DrawerPaper.Item
                icon="steering"
                label="Crear una cuenta"
                active={active === 'third'}
                onPress={() => {
                    props.navigation.navigate('Crear una cuenta');
                    setActive('third');
                }}
            />
            <DrawerPaper.Item
                icon="shopping-search"
                label="Procesar pago"
                active={active === 'fourth'}
                onPress={() => {
                    props.navigation.navigate('Procesar pago');
                    setActive('fourth');
                }}
            />
            <DrawerPaper.Item
                icon="currency-usd"
                label="Tu carrito"
                active={active === 'fifth'}
                onPress={() => {
                    props.navigation.navigate('Tu carrito');
                    setActive('fifth');
                }}
            />
            <DrawerPaper.Item
                icon="car-cog"
                label="Productos"
                active={active === 'sixth'}
                onPress={() => {
                    props.navigation.navigate('Productos');
                    setActive('sixth');
                }}
            />
            <DrawerPaper.Item
                icon="history"
                label="Buscar productos"
                active={active === 'seventh'}
                onPress={() => {
                    props.navigation.navigate('Buscar productos');
                    setActive('seventh');
                }}
            />
            <DrawerPaper.Item
                icon="offer"
                label="Detalles del producto"
                active={active === 'eighth'}
                onPress={() => {
                    props.navigation.navigate('Detalles del producto');
                    setActive('eighth');
                }}
            />
            <DrawerPaper.Item
                icon="contacts"
                label="Categorías"
                active={active === 'ninth'}
                onPress={() => {
                    props.navigation.navigate('Categorias');
                    setActive('ninth');
                }}
            />
            <DrawerPaper.Item
                icon="help"
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
                icon="help-circle"
                label="Ayuda y soporte"
                active={active === 'fourteenth'}
                onPress={() => {
                    props.navigation.navigate('Ayuda y soporte');
                    setActive('fourteenth');
                }}
            />
        </DrawerPaper.Section>
    );
}


export function DrawerNavigation() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Inicio" component={Home} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Iniciar sesión" component={Login} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Crear una cuenta" component={UserRegistration} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Procesar pago" component={PaymentBranch} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Tu carrito" component={ShoppingCart} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Productos" component={ProductsList} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Buscar productos" component={ProductsSearch} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Detalles del producto" component={ProductDetail} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Categorias" component={ProductsCategories} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Mis compras" component={MyPurchases} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Mis favoritos" component={MyFavorites} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Ofertas" component={Offers} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Perfil de usuario" component={UserProfile} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Ayuda y soporte" component={HelpAndSupport} options={{ unmountOnBlur: true }} />
        </Drawer.Navigator>
    );
}