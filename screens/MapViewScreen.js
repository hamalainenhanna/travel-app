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
          setErrorMessage('Sijaintilupia ei myönnetty.');
          setLoading(false);
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = coords;
        setCoordinates({ latitude, longitude });
      } catch (error) {
        setErrorMessage('Virhe sijainnin hakemisessa: ' + error.message);
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
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={coordinates} title="Nykyinen sijainti" />
        </MapView>
      ) : (
        <Text>{errorMessage || 'Ladataan karttaa...'}</Text>
      )}
    </View>
  );
}



