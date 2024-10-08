import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MapView, { Callout, Marker } from 'react-native-maps';
import T8ApiCaller from "./T8ApiCaller";

export default function T8EtsiOsoite() {

    const apikey = process.env.EXPO_PUBLIC_T8_API_KEY;

    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })
    const [address, setAddress] = useState("");

    const handleFetch = async () => {
        try {
            const data = await T8ApiCaller(address, apikey);
            console.log("T8EtsiOsoite, Fetched data: ", data);

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
            }))
        }
        catch (error) {
            console.error("T8EtsiOsoite, Error fetching data from api.", error);
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
                        initialRegion={region}
                    >
                        <Marker
                            coordinate={{
                                latitude: 60.201373,
                                longitude: 24.934041
                            }}
                        // Can't do multilines with title prop => <Callout></Callout>
                        // title='Verkostoitumisen ja hyvinvoinnin keskus,\n Haaga-Helian Pasilan Campus'
                        >
                            <Callout>
                                <View style={{ maxWidth: 200 }}>
                                    <Text>
                                        Verkostoitumisen ja hyvinvoinnin keskus,{"\n"}
                                        Haaga-Helian Pasilan Campus
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    </MapView>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter address here"
                        value={address}
                        onChangeText={(value) => setAddress(value)}
                    />
                    <Pressable
                        style={styles.buttonShow}
                        onPress={() => handleFetch(address, apikey)}>
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