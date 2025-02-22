import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddingNewLocation({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  const saveLocation = async () => {
    if (!name || !rating) return; // Varmista, että nimi ja arvio annetaan

    try {
      const storedLocations = await AsyncStorage.getItem("locations");
      const locations = storedLocations ? JSON.parse(storedLocations) : [];

      const newLocation = { name, description, rating: Number(rating) };
      locations.push(newLocation);

      await AsyncStorage.setItem("locations", JSON.stringify(locations));

      navigation.goBack(); // Palaa listanäkymään
    } catch (error) {
      console.error("Error saving location:", error);
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
