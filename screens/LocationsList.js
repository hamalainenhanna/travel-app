import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LocationsList({ navigation }) {
  return (
    <View>
      <Text>Locations List</Text>
      <Text>Locations List</Text>
      <Text>Locations List</Text>
      <Button
        title="Add New Location"
        onPress={() => navigation.navigate('Add Location')}
      />
    </View>
  );
}
