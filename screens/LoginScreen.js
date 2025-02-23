import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleLogin = async () => {
    if (username === 'user' && password === 'password') {
      // Tallennetaan käyttäjä kirjautuneeksi
      await AsyncStorage.setItem('user', username);

      // Näytetään onnistumisviesti
      setSnackbarMessage('Successful login!');
      setVisibleSnackbar(true);

      // Siirretään käyttäjä MainTabs-näkymään
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }], // Ohjaa käyttäjän päävalikkoon
        });
      }, 1500);
    } else {
      // Virheellinen kirjautuminen
      setSnackbarMessage('Incorrect username or password');
      setVisibleSnackbar(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons name="login" size={60} color="purple" />
        <Title style={styles.title} >LOGIN</Title>
      </View>

      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        LOGIN
      </Button>

      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 180,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    marginLeft: 20,
    fontSize: 30,
    color: 'purple',
    fontWeight: "bold",
  }
});

export default LoginScreen;
