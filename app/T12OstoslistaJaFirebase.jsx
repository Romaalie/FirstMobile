import { useState, useEffect } from 'react';
import { Alert, Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { app } from './../firebaseConfig.js';
import { getDatabase, ref, push, remove, onValue } from "firebase/database";
import { Audio, Video } from 'expo-av';

export default function T12OstoslistaJaFirebase() {

    // CENAFICATION, help from ChatGPT
    const [modalVisible, setModalVisible] = useState(false);
    const [sound, setSound] = useState(null);
    const [audioInterval, setAudioInterval] = useState(null); // Track the interval

    // Function to load and play the audio
    async function playSound() {
        if (sound) {
            await stopSound(); // Stop the current sound if it exists
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
            require('../assets/audio/are-you-sure-about-that.mp3')
        );

        setSound(newSound);

        // Initial delay before playing the sound
        setTimeout(async () => {
            await newSound.playAsync(); // Play the sound after the initial delay

            // Start a loop with a specified delay
            const intervalId = setInterval(async () => {
                await newSound.stopAsync(); // Stop the current playback
                await newSound.playAsync(); // Play the sound again
            }, 6200); // Adjust this value to control the delay between loops (5 seconds)

            setAudioInterval(intervalId); // Save the interval ID
        }, 5000); // Initial delay before the first playback
    }

    // Function to stop the audio when the modal is closed
    async function stopSound() {
        if (sound) {
            await sound.stopAsync(); // Stop the sound
            await sound.unloadAsync(); // Unload the sound to clean up
            setSound(null);
        }
        if (audioInterval) {
            clearInterval(audioInterval); // Clear the audio interval
            setAudioInterval(null); // Reset the interval ID
        }
    }

    // Effect to play sound when the modal opens and stop when it closes
    useEffect(() => {
        if (modalVisible) {
            playSound(); // Play audio when modal opens
        } else {
            stopSound(); // Stop audio when modal closes
        }
    }, [modalVisible]);
    // CENAFICATION ENDS

    const [product, setProduct] = useState({
        name: '',
        amount: ''
    });
    const [purchases, setPurchases] = useState([]);

    const database = getDatabase(app);

    // Updates the purchases useState via Firebase eventlistener.
    useEffect(() => {
        const productsRef = ref(database, 'products/');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(snapshot);
            if (data) {
                const dataWithKeys = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setPurchases(dataWithKeys);
            } else {
                setPurchases([]);
            }
        })
    }, []);

    const handleSave = () => {
        if (product.amount && product.name) {
            push(ref(database, 'products/'), product);
        }
        else {
            Alert.alert('Error', 'Type product and amount first')
        }
    }

    const handleDelete = (name, amount) => {
        Alert.alert(
            `You are about to delete ${name}, ${amount}`,
            'Are you sure you want to do this',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => { setModalVisible(true); }
                    //onPress: () => remove(ref(database, `products/${id}`))
                }
            ],
            { cancelable: false }
        )
    }

    const justDelPls = (id) => {
        remove(ref(database, `products/${id}`))
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerBasic}>
                    <TextInput
                        placeholder='Product name'
                        onChangeText={text => setProduct({ ...product, name: text })}
                        value={product.name}
                        style={styles.input} />
                    <TextInput
                        placeholder='Amount'
                        onChangeText={text => setProduct({ ...product, amount: text })}
                        value={product.amount}
                        style={styles.input} />
                    <Button onPress={handleSave} title="Save" />
                </View>
                <View style={styles.containerResult}>
                    <FlatList
                        ListHeaderComponent={<Text style={styles.textFlatListHeader}>Shopping List</Text>}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={styles.containerShoppingList}>
                                <Text>
                                    {item.name}, {item.amount}
                                </Text>
                                <Text style={styles.textButtonDelete} onPress={() => handleDelete(item.name, item.amount)}>
                                    delete
                                </Text>
                                <Modal
                                    transparent={true}
                                    visible={modalVisible}
                                    animationType="fade"
                                >
                                    <View style={styles.modalBackground}>
                                        <View style={styles.modalContainer}>
                                            <Image
                                                source={require('../assets/JCenaGreenScreen.gif')}
                                                style={styles.image}
                                            />
                                            <Button title="Confirm Delete" onPress={justDelPls} />
                                            <Button title="Nope" onPress={() => setModalVisible(false)} />
                                        </View>
                                    </View>
                                </Modal>
                            </View>}
                        data={purchases}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    containerBasic: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 15
    },
    containerResult: {
        paddingTop: 8,
        alignItems: "center",
    },
    containerShoppingList: {
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '70%',
        margin: 1,
        borderWidth: 1,
        padding: 8,
        margin: 5
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#00FF00',
        borderRadius: 10,
        alignItems: 'center',
    },
    safeArea: {
        flex: 1
    },
    textFlatListHeader: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "center"
    },
    textButtonDelete: {
        color: 'blue',
        marginLeft: 8
    }
});