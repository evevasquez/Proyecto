import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLOURS } from '../constants/styles/style';
import { FONTS } from '../constants/styles/style';
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import TopBar from '../components/TopBar';

const UserRegistration = ({ active, setActive }) => {
  const navigation = useNavigation();
  const [secureEntery, setSecureEntery] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("Iniciar sesión");
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLOURS.purple} />
      <TopBar active={active} setActive={setActive} />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Orbi Shop</Text>
          <Text style={styles.headingText}>Productos de calidad</Text>
        </View>
        {/* form  */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Octicons name={"person"} size={30} color={COLOURS.purple} />
            <TextInput
              style={styles.textInput}
              placeholder="Escribe tu nombre de usuario"
              placeholderTextColor={COLOURS.secondary}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name={"lock"} size={30} color={COLOURS.purple} />
            <TextInput
              style={styles.textInput}
              placeholder="Escriba su contraseña"
              placeholderTextColor={COLOURS.secondary}
              secureTextEntry={secureEntery}
            />
            <TouchableOpacity
              onPress={() => {
                setSecureEntery((prev) => !prev);
              }}
            >
              <Octicons name={secureEntery ? "eye" : "eye-closed"} size={20} color={COLOURS.purple} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name={"mail-outline"} size={30} color={COLOURS.purple} />
            <TextInput
              style={styles.textInput}
              placeholder="Escriba su correo electrónico"
              placeholderTextColor={COLOURS.secondary}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Fontisto
              name={"date"}
              size={30}
              color={COLOURS.purple}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Escriba su fecha de nacimiento"
              placeholderTextColor={COLOURS.secondary}
              secureTextEntry={secureEntery}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Fontisto
              name={"map"}
              size={30}
              color={COLOURS.purple}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Escriba su dirección"
              placeholderTextColor={COLOURS.secondary}
              secureTextEntry={secureEntery}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Fontisto
              name={"world"}
              size={30}
              color={COLOURS.purple}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Escriba los detalles de su país"
              placeholderTextColor={COLOURS.secondary}
              secureTextEntry={secureEntery}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.loginButtonWrapper}>
            <Text style={styles.loginText}>Registrarse</Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signupText}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.white,
    padding: 20,
    top: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: COLOURS.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: COLOURS.primary,
    fontFamily: FONTS.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLOURS.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: FONTS.Light,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: COLOURS.primary,
    fontFamily: FONTS.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: COLOURS.purple,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: COLOURS.white,
    fontSize: 20,
    fontFamily: FONTS.SemiBold,
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: COLOURS.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: COLOURS.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: FONTS.SemiBold,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: COLOURS.primary,
    fontFamily: FONTS.Regular,
  },
  signupText: {
    color: COLOURS.purple,
    fontFamily: FONTS.Bold,
  },
});

export default UserRegistration;
