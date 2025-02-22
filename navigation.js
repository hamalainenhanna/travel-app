import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LocationsList from './screens/LocationsList';
import AddLocation from './screens/AddLocation';
import MapViewScreen from './screens/MapViewScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Locations">
        <Stack.Screen name="Locations" component={LocationsList} />
        <Stack.Screen name="Add Location" component={AddLocation} />
        <Stack.Screen name="Map View" component={MapViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
