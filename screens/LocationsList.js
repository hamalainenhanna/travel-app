import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LocationsList({ navigation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      const storedLocations = await AsyncStorage.getItem("locations");
      if (storedLocations) setLocations(JSON.parse(storedLocations));
    };
    loadLocations();
  }, []);

  const handleAddLocationPress = () => {
    navigation.navigate("Add Location"); // Navigoi lisäysnäkymään
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
              <Paragraph>⭐ {item.rating}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate("Map View", { locationName: item.name })}>
                Näytä kartalla
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
      {/* Siirretään "Lisää uusi kohde" -nappi listan ulkopuolelle */}
      <Button mode="contained" onPress={handleAddLocationPress} style={{ marginTop: 20 }}>
        Lisää uusi kohde
      </Button>
    </View>
  );
}



