import { useState, useEffect } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { app } from './../firebaseConfig.js';
import { getDatabase, ref, push, remove, onValue } from "firebase/database";

export default function T12OstoslistaJaFirebase() {

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

    const handleDelete = (id, name, amount) => {
        Alert.alert(
            `You are about to delete ${name}, ${amount}`,
            'Are you sure you want to do this',
            [{
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: () => remove(ref(database, `products/${id}`))
            }],
            { cancelable: false }
        )
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
                                <Text style={styles.textButtonDelete} onPress={() => handleDelete(item.id, item.name, item.amount)}>
                                    delete
                                </Text>
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
    input: {
        height: 40,
        width: '70%',
        margin: 1,
        borderWidth: 1,
        padding: 8,
        margin: 5
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