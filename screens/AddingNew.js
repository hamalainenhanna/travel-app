
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title, Subheading, Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

export default function AddingNewLocation({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const saveLocation = async () => {
    if (!name || !rating) {
      Alert.alert('Nimi ja arvio ovat pakollisia');
      return;
    }

    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      Alert.alert('Arvio tulee olla luku välillä 1-5');
      return;
    }

    try {
      const storedLocations = await AsyncStorage.getItem('locations');
      const locations = storedLocations ? JSON.parse(storedLocations) : [];

      // Tarkistetaan, onko kohde jo olemassa
      const isLocationExists = locations.some(location => location.name.toLowerCase() === name.toLowerCase());
      if (isLocationExists) {
        Alert.alert('Virhe', 'Tämä kohde on jo lisätty');
        return;
      }

      // Luodaan uusi kohde
      const newLocation = { name, description, rating: ratingNum };

      // Lisätään uusi kohde listaan
      locations.push(newLocation);

      // Tallennetaan päivitetty lista takaisin AsyncStorageen
      await AsyncStorage.setItem('locations', JSON.stringify(locations));

      // Näytetään ilmoitus onnistuneesta tallennuksesta
      setSnackbarMessage("Kohde lisätty onnistuneesti!");
      setVisibleSnackbar(true);

      // Navigoidaan takaisin LocationsList-näkymään
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.error('Virhe tallennettaessa kohdetta:', error);
      Alert.alert('Virhe', 'Kohteen tallentaminen epäonnistui');
    }
  };

  return (
    <View style={styles.container}>
      <Title>Add New Travel Location:</Title>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        label="Rate (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={saveLocation} style={styles.button}>
        Save
      </Button>

      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});
