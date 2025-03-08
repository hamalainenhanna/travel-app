import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { TextInput, Button, Title, Subheading } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rating } from 'react-native-ratings';

export default function AddingNewLocation({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const saveLocation = async () => {
    if (!name || !rating) {
      Alert.alert('Error', 'Name and rating are required.');
      return;
    }

    if (rating < 1 || rating > 5) {
      Alert.alert('Error', 'Rating must be a number between 1 and 5');
      return;
    }

    try {
      const storedLocations = await AsyncStorage.getItem('locations');
      const locations = storedLocations ? JSON.parse(storedLocations) : [];

      const isLocationExists = locations.some(location => location.name.toLowerCase() === name.toLowerCase());
      if (isLocationExists) {
        Alert.alert('Error', 'This location is already added');
        return;
      }

      const newLocation = { name, description, rating };

      // Lisätään uusi kohde listan alkuun
      locations.unshift(newLocation);

      // Tallennetaan päivitetty lista takaisin AsyncStorageen
      await AsyncStorage.setItem('locations', JSON.stringify(locations));

      Alert.alert('Success', 'Location added successfully!');

      setTimeout(() => {
        navigation.goBack();
        // Tyhjennetään lomakkeen kentät tallennuksen jälkeen
        setName('');
        setDescription('');
        setRating(0);
      }, 2000);

    } catch (error) {
      Alert.alert('Error', 'Failed to save the location');
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
        
        <Subheading>Rating:</Subheading>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={40}
          onFinishRating={setRating}
          startingValue={rating}
          style={styles.rating}
        />

        <Button mode="contained" onPress={saveLocation} style={styles.button} labelStyle={{ fontSize: 20 }}>
          Save
        </Button>
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