import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from 'react-native-maps';
import T8ApiCaller from "./T8ApiCaller";
import T9ApiCaller from "./T9ApiCaller";


export default function T9Ravintolahaku() {

    const apikeyGeocode = process.env.EXPO_PUBLIC_T8_API_KEY;
    const apikeyGeoapify = process.env.EXPO_PUBLIC_T9_API_KEY;


    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })
    const [markers, setMarkers] = useState([]);
    const [address, setAddress] = useState("");

    const handleFetch = async () => {
        try {
            const data = await T8ApiCaller(address, apikeyGeocode);
            console.log("T9Ravintolahaku, Fetched data: ", data);

            if (!data || data.length === 0) {
                throw new Error("No location found with " + address)
            }

            // This is just taking the first entry, no fancy options presented to the user.
            const newLatitude = parseFloat(data[0].lat);
            const newLongitude = parseFloat(data[0].lon);
            console.log("New Latitude: ", newLatitude);
            console.log("New Longitude: ", newLongitude);

            setRegion(prevRegion => ({
                ...prevRegion,
                latitude: newLatitude,
                longitude: newLongitude
            }));

            const markerData = await T9ApiCaller(apikeyGeoapify, newLatitude, newLongitude);

            console.log("T9Ravintolahaku markerData: ", markerData)

            if (!markerData || !markerData.features) {
                throw new Error("Invalid marker data");
            }

            setMarkers(markerData.features.map((marker) => ({
                id: marker.properties.datasource.raw.osm_id,
                latlng: {
                    latitude: marker.properties.lat,
                    longitude: marker.properties.lon
                },
                name: marker.properties.name,
                address: marker.properties.address_line2
            })));
        }
        catch (error) {
            console.error("T9Ravintolahaku, Error fetching data from api.", error);
        }
    };

    // Used to refocus the map view on current region if the address is not changed, but the SHOW pressable is pressed. Code by Chat-Gpt.
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.animateToRegion(region, 800);
        }
    }, [region]);
    // Used to refocus the map view on current region if the address is not changed, but the SHOW pressable is pressed. Code by Chat-Gpt.

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerBasic}>
                    <MapView
                        ref={mapRef}
                        style={styles.mapView}
                        region={region}
                    >
                        {markers.map((marker, index) => (
                            <Marker
                                key={index}
                                coordinate={marker.latlng}
                                title={marker.name}
                                description={marker.address}
                            />
                        ))}
                    </MapView>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter address here"
                        value={address}
                        onChangeText={(value) => setAddress(value)}
                    />
                    <Pressable
                        style={styles.buttonShow}
                        onPress={() => handleFetch(address, apikeyGeocode)}>
                        <Text
                            style={styles.textButtonShow}>
                            SHOW
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    buttonShow: {
        borderRadius: 5,
        height: 40,
        width: 90,
        margin: 5,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBasic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
    },
    input: {
        height: 40,
        width: '80%',
        margin: 2,
        borderBottomWidth: 2,
        padding: 10,
        margin: 10
    },
    mapView: {
        width: '100%',
        height: '80%'
    },
    safeArea: {
        flex: 1,
    },
    textButtonShow: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    }
});