import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { appT16 } from './../firebaseConfig.js';
import { getDatabase, ref, push } from "firebase/database";
import { Button } from "react-native-paper";


export default function T16OsoitekirjaMap() {

    // Didn't check how the useEffect works after adjusting how the MyPlaces component sends props. It seems to work. Code magic.
    useEffect(() => {
        //console.log("Param theAddress received as: ", theAddress);
        //console.log("Param theRegion received as: ", theRegion);
        setAddress(theAddress);
        setRegion(theRegion);

    }, [theRegion, theAddress]);

    // React route/stack navigation stuff
    const route = useRoute();
    const { theRegion, theAddress } = route.params;

    const [address, setAddress] = useState(theAddress);
    const [region, setRegion] = useState(theRegion);

    // Get Firebase from config file.
    const database = getDatabase(appT16);

    // Save functionality for firebase
    const handleSave = () => {
        if (address) {
            push(ref(database, 'addresses/'), address);
        }
        else {
            Alert.alert('Error', 'No valid address')
        }
    }

    //console.log("Address at map component:", address);
    //console.log("Param Address at map: ", theAddress);


    return (
        <View style={styles.containerMain}>
            <MapView
                region={region}
                style={styles.mapView}>
                <Marker
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                    title={address}
                />

            </MapView>
            <View style={styles.containerInput}>
                <Button
                    style={styles.buttonSavelocation}
                    mode="contained"
                    onPress={() => handleSave()}>
                    Save location
                </Button>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    buttonSavelocation: {
        marginTop: 10,
        width: '80%',
    },
    containerMain: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    containerInput: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapView: {
        width: '100%',
        height: '90%'
    },
});

