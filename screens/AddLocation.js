import React from 'react';
import { View, Text, Button } from 'react-native';

export default function AddLocation({ navigation }) {
  return (
    <View>
      <Text>Add New Location Name input</Text>
      <Text>Add New Location Description input</Text>
      <Button
        title="Add New"
        onPress={() => navigation.navigate('Locations')}
      />
    </View>
  );
}
