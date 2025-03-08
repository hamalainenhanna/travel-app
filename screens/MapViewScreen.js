import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapViewScreen() {
  const [coordinates, setCoordinates] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMessage('Location permission denied');
          setLoading(false);
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = coords;
        setCoordinates({ latitude, longitude });
      } catch (error) {
        setErrorMessage('Error in fetching location: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : coordinates ? (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={coordinates} title="Your Location" />
        </MapView>
      ) : (
        <Text>{errorMessage || 'Loading...'}</Text>
      )}
    </View>
  );
}