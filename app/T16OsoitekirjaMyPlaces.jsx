import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import T8ApiCaller from "./T8ApiCaller";

import { appT16 } from './../firebaseConfig.js';
import { getDatabase, ref, remove, onValue } from "firebase/database";

export default function T16OsoitekirjaMyPlaces() {

    // Apikey for geocode maps.
    const apikey = process.env.EXPO_PUBLIC_T8_API_KEY;

    // Get Firebase from config file.
    const database = getDatabase(appT16);

    // React stack navigation
    const navigation = useNavigation();


    const [address, setAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    // Could this be handled differently? Not much meaning having this here, maybe..
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })

    // Updates the addresses useState via Firebase eventlistener.
    useEffect(() => {
        const addressesRef = ref(database, 'addresses/');
        onValue(addressesRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(snapshot);
            if (data) {
                const dataWithKeys = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    address: value
                }));
                //console.log(dataWithKeys)
                setAddresses(dataWithKeys);
            } else {
                setAddresses([]);
            }
        })
    }, []);

    // Delete functionality for firebase
    const handleDelete = (id, address) => {
        Alert.alert(
            `Do you want to remove the address ${address}`,
            'The address will be deleted permanently',
            [{
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: () => remove(ref(database, `addresses/${id}`))
            }],
            { cancelable: false }
        )
    }

    // Fetching of location data from geocode maps
    const handleFetch = async (providedAddress, apikey) => {
        try {
            const data = await T8ApiCaller(providedAddress, apikey);
            //console.log("T16OsoitekirjaMyPlaces, Fetched data: ", data);

            if (!data || data.length === 0) {
                const noAddress = "provided address"
                throw new Error(`No location found with ${providedAddress ? providedAddress : noAddress}`);
            }

            return data;
        }
        catch (error) {
            console.error("T16OsoitekirjaMyPlaces, Error fetching data from api.", error);
            throw error;
        }
    };

    const showMapScreen = async (providedAddress) => {
        const addressToUse = providedAddress || address;
        //console.log("Provided address: ", providedAddress);
        // console.log("Address to use: ", addressToUse)

        try {
            const fetchedData = await handleFetch(addressToUse, apikey)

            // This is just taking the first entry, no fancy options presented to the user.
            const newLatitude = parseFloat(fetchedData[0].lat);
            const newLongitude = parseFloat(fetchedData[0].lon);


            // Have to use these value because react has not updated the states at this point.
            navigation.navigate('T16OsoitekirjaMap', {
                theRegion: { latitude: newLatitude, longitude: newLongitude, latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta },
                theAddress: addressToUse
            });
        }
        catch (error) {
            console.error("Mystical error with showMapScreen/handling promise/error");
            Alert.alert("Location Not Found", "No location found for the provided address. Please try again.");
        }
    }

    return (
        <View style={styles.containerMain}>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.textInput}
                    label={"Placefinder"}
                    placeholder="Enter address here"
                    value={address}
                    onChangeText={text => setAddress(text)}
                />
                <Button
                    style={styles.buttonShowOnMap}
                    mode="contained"
                    onPress={() => showMapScreen()}>
                    Show on map
                </Button>
            </View>
            <View style={styles.containerResult}>
                <FlatList
                    style={styles.flatlist}
                    ItemSeparatorComponent={<View style={styles.separator} />}
                    data={addresses}
                    renderItem={({ item, index }) =>
                        <Pressable
                            style=
                            {[
                                styles.flatlistItem,
                                index % 2 === 0 ? styles.flatlistItemEven : styles.flatlistItemOdd
                            ]}
                            onPress={() => {
                                showMapScreen(item.address)
                                //console.log("Onpress address: ", item.address)
                            }}
                            onLongPress={() => handleDelete(item.id, item.address)}
                        >
                            <View style={styles.containerFlatlistText}>
                                <Text style={styles.textFlatlist}>
                                    {item.address}
                                </Text>
                                <Text style={styles.textFlatlistGuide}>
                                    Show on map
                                </Text>
                            </View>
                        </Pressable>}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    buttonShowOnMap: {
        marginTop: 15,
    },
    containerMain: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    containerInput: {
        alignItems: 'center',
    },
    containerResult: {
        marginTop: 40,
        alignItems: "center",
    },
    containerFlatlistText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flatlist: {
        width: '97%',
    },
    flatlistItem: {
        padding: 10,
    },
    flatlistItemEven: {
        backgroundColor: '#d4aeeb',
    },
    flatlistItemOdd: {
        backgroundColor: '#dfcaec',
    },
    separator: {
        height: 2,
        width: '100%',
        backgroundColor: '#776c7d',
        marginVertical: 2,
    },
    textFlatlist: {
        fontSize: 16,
    },
    textFlatlistGuide: {
        fontSize: 14,
    },
    textInput: {
        width: '90%',
        marginTop: 10,
    },
});

