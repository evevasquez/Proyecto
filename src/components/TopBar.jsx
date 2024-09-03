// src/components/TopBar.jsx
import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const TopBar = ({active, setActive}) => {
  const navigation = useNavigation();
  useEffect(() => {
    if (active === undefined) {
      setActive('first'); // Set a default value if active is undefined
    }
  }, [active, setActive]);
  const handleNavigation = (activeScreen, view) => {
    setActive(activeScreen);
    navigation.navigate(view);
  };
  
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IconMaterialIcons
          name="menu"
          size={30}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => handleNavigation('first', 'Inicio')}>
          <IconMaterialIcons
            name="home"
            size={30}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handleNavigation('thirteenth', 'Perfil de usuario')}>
          <IconMaterialIcons
            name="manage-accounts"
            size={30}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 40,
    backgroundColor: '#af62ec',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default TopBar;
