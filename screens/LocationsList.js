import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

export default function LocationsList({ navigation }) {
  const [locations, setLocations] = useState([]);

  const loadLocations = async () => {
    const storedLocations = await AsyncStorage.getItem("locations");
    if (storedLocations) setLocations(JSON.parse(storedLocations));
  };

  useFocusEffect(
    React.useCallback(() => {
      loadLocations();
    }, [])
  );

  const renderStars = (rating) => {
    const fullStars = Math.max(1, Math.min(5, Math.round(rating)));
    return '⭐'.repeat(fullStars);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10, borderWidth: 2, borderColor: 'purple', backgroundColor: '' }}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{item.description}</Paragraph>
              <Paragraph>{renderStars(item.rating)}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.navigate("ShowMap", {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    locationName: item.name
                  })
                }
              > Show Map
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}