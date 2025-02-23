
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput, Button, Title, Subheading, Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';
import { Rating } from 'react-native-ratings';

export default function AddingNewLocation({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);  // Alustetaan rating numerolla
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const saveLocation = async () => {
    if (!name || !rating) {
      Alert.alert('Nimi ja arvio ovat pakollisia');
      return;
    }
  
    if (rating < 1 || rating > 5) {
      Alert.alert('Arvio tulee olla luku välillä 1-5');
      return;
    }
  
    try {
      const storedLocations = await AsyncStorage.getItem('locations');
      const locations = storedLocations ? JSON.parse(storedLocations) : [];
  
      const isLocationExists = locations.some(location => location.name.toLowerCase() === name.toLowerCase());
      if (isLocationExists) {
        Alert.alert('Virhe', 'Tämä kohde on jo lisätty');
        return;
      }
  
      const newLocation = { name, description, rating };
  
      // Lisätään uusi kohde listan alkuun
      locations.unshift(newLocation);
  
      // Tallennetaan päivitetty lista takaisin AsyncStorageen
      await AsyncStorage.setItem('locations', JSON.stringify(locations));
  
      setSnackbarMessage("Kohde lisätty onnistuneesti!");
      setVisibleSnackbar(true);
  
      setTimeout(() => {
        navigation.goBack();
        // Tyhjennetään lomakkeen kentät tallennuksen jälkeen
        setName('');
        setDescription('');
        setRating(0);
      }, 2000);
    } catch (error) {
      console.error('Virhe tallennettaessa kohdetta:', error);
      Alert.alert('Virhe', 'Kohteen tallentaminen epäonnistui');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Title style={{ marginBottom: 25 }}>Add New Travel Location:</Title>

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
        
        <Subheading> </Subheading>
        <Rating
          type="star" // Voit käyttää myös muita tyyppejä kuten "heart", "custom" jne.
          ratingCount={5} // Määrittelee tähtien määrän
          imageSize={40} // Määrittelee tähtien koon
          onFinishRating={setRating} // Funktio, joka vie arvion
          startingValue={rating} // Näyttää käyttäjän nykyisen arvion
          style={styles.rating} // Lisää tyylit
        />

        <Button mode="contained" onPress={saveLocation} style={styles.button} labelStyle={{ fontSize: 20 }}>
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
    </TouchableWithoutFeedback>
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
  rating: {
    marginVertical: 10,
  },
});


