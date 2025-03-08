import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import LocationsList from './screens/LocationsList';
import AddingNew from './screens/AddingNew';
import MapViewScreen from './screens/MapViewScreen';
import ShowMapScreen from './screens/ShowMapScreen';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedUser = await AsyncStorage.getItem('user');
      setUser(loggedUser);
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#E1C6E0' }}>
        <Appbar.Action icon="account" size={40} color="purple" />
        <Appbar.Content title={` ${user}`} color="purple" />
        <Appbar.Action icon="logout" size={40} color="purple" onPress={logout} />
      </Appbar.Header>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Locations') {
              iconName = 'list';
            } else if (route.name === 'Add Location') {
              iconName = 'add-circle';
            } else if (route.name === 'Map View') {
              iconName = 'map';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#E1C6E0',
          },
        })}
      >
        <Tab.Screen name="Locations" component={LocationsList} options={{ headerShown: false }} />
        <Tab.Screen name="Add Location" component={AddingNew} options={{ headerShown: false }} />
        <Tab.Screen name="Map View" component={MapViewScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </View>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(user ? true : false);
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="ShowMap" component={ShowMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
