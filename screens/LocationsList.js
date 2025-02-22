import React, { useState } from "react"; 
import { View, FlatList } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native'; // Tuo tarvittava hook

export default function LocationsList({ navigation }) {
  const [locations, setLocations] = useState([]);

  // Funktio, joka lataa kohteet AsyncStorageista
  const loadLocations = async () => {
    const storedLocations = await AsyncStorage.getItem("locations");
    if (storedLocations) setLocations(JSON.parse(storedLocations));
  };

  // Käytetään useFocusEffectiä, jotta lataamme kohteet aina kun palaamme näkymään
  useFocusEffect(
    React.useCallback(() => {
      loadLocations(); // Lataa kohteet aina, kun näkymä saa fokuksen
    }, [])
  );

  const handleAddLocationPress = () => {
    navigation.navigate("Add Location"); // Navigoi lisäysnäkymään
  };

  // Funktio tähtien näyttämiseen
  const renderStars = (rating) => {
    const fullStars = Math.max(1, Math.min(5, Math.round(rating)));
    return '⭐'.repeat(fullStars); // Palautetaan tähtiä annetun arvion mukaan
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{item.description}</Paragraph>
              {/* Näytetään vain tähtiä ilman numeroa */}
              <Paragraph>{renderStars(item.rating)}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate("Map View", { locationName: item.name })}>
                Map View
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
      <Button mode="contained" onPress={handleAddLocationPress} style={{ marginTop: 20 }}>
        Add New Location
      </Button>
    </View>
  );
}


