import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationsList from './screens/LocationsList';
import AddingNew from './screens/AddingNew';
import MapViewScreen from './screens/MapViewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Locations">
        <Stack.Screen name="Locations" component={LocationsList} />
        <Stack.Screen name="Add Location" component={AddingNew} /> 
        <Stack.Screen name="Map View" component={MapViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
