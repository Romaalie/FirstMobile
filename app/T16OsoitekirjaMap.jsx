import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { appT16 } from './../firebaseConfig.js';
import { getDatabase, ref, push} from "firebase/database";

export default function T16OsoitekirjaMap() {

    // React route/stack navigation stuff
    const route = useRoute();
    const { data } = route.params;

    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })
    // Set address via prop on first render
    useEffect(() => {
        setRegion(data)
    }, []);

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

    console.log("Region:", region);


    return (
        <SafeAreaProvider>
            <SafeAreaView>

            </SafeAreaView>
        </SafeAreaProvider>
    )

}

