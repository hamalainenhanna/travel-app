import React, { useEffect, useState } from 'react'; 
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Appbar } from 'react-native-paper';

export default function ShowMapScreen({ route, navigation }) {
  const { locationName, latitude, longitude } = route.params;

  const [coordinates, setCoordinates] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (latitude && longitude) {
          setCoordinates({ latitude, longitude });
          setLoading(false);
          return;
        }

        const geocodeResult = await Location.geocodeAsync(locationName);
        if (geocodeResult.length > 0) {
          const { latitude, longitude } = geocodeResult[0];
          setCoordinates({ latitude, longitude });
        } else {
          setErrorMessage('Location not found');
        }
      } catch (error) {
        setErrorMessage('Geocoding error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [locationName, latitude, longitude]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="purple" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Location on map" color="purple"  />
      </Appbar.Header>

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
        <Text>{errorMessage || 'Location not found'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#E1C6E0',
  },
});













