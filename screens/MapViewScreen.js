import React, { useEffect, useState } from 'react'; 
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapViewScreen({ route }) {
  const { locationName } = route.params; 
  const [coordinates, setCoordinates] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        console.log('Haetaan koordinaatit kohteelle:', locationName);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMessage('Sijaintilupia ei myönnetty.');
          setLoading(false);
          return;
        }

        const geocodeResult = await Location.geocodeAsync(locationName);
        if (geocodeResult.length > 0) {
          const { latitude, longitude } = geocodeResult[0];
          setCoordinates({ latitude, longitude });
        } else {
          setErrorMessage('Paikkaa ei löytynyt');
        }
      } catch (error) {
        setErrorMessage('Virhe geokoodauksessa: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [locationName]);

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
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          <Marker coordinate={coordinates} title={locationName} />
        </MapView>
      ) : (
        <Text>{errorMessage || 'Ladataan karttaa...'}</Text>
      )}
    </View>
  );
}


