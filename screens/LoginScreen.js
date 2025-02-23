import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      setSnackbarMessage('Kirjautuminen onnistui!');
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
      setSnackbarMessage('Väärä käyttäjätunnus tai salasana');
      setVisibleSnackbar(true);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Kirjautuminen</Title>

      <TextInput
        label="Käyttäjätunnus"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        label="Salasana"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Kirjaudu sisään
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
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default LoginScreen;



