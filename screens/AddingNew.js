import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

export default function AddingNewLocation({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

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

      // Navigoidaan takaisin LocationsList-näkymään
      navigation.goBack();
    } catch (error) {
      console.error('Virhe tallennettaessa kohdetta:', error);
    }
  };

  return (
    <View>
      <Text>Lisää uusi matkakohde:</Text>
      <TextInput placeholder="Nimi" onChangeText={setName} value={name} />
      <TextInput placeholder="Kuvaus" onChangeText={setDescription} value={description} />
      <TextInput placeholder="Arvio (1-5)" onChangeText={setRating} value={rating} keyboardType="numeric" />
      <Button title="Tallenna" onPress={saveLocation} />
    </View>
  );
}