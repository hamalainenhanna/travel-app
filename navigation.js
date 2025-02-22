import React from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LocationsList from './screens/LocationsList';
import MapViewScreen from './screens/MapViewScreen';
import AddingNew from './screens/AddingNew';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Locations">
        <Stack.Screen name="Locations" component={LocationsList} />
        <Stack.Screen name="Add Location" component={AddingNew} />
        <Stack.Screen name="Map View" component={MapViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
