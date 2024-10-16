import { useState, useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Button, MD3Colors, IconButton, TextInput } from 'react-native-paper';

import { appT12 } from './../firebaseConfig.js';
import { getDatabase, ref, push, remove, onValue } from "firebase/database";


export default function T15TyylikkaampiOstoslista() {

    const [product, setProduct] = useState({
        name: '',
        amount: ''
    });
    const [purchases, setPurchases] = useState([]);

    const database = getDatabase(appT12);

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
                <Appbar.Header mode='center-aligned'>
                    <Appbar.Content
                        title="SHOPPING LIST"
                        titleStyle={styles.textAppBarHeader} />
                </Appbar.Header>
                <View style={styles.containerBasic}>
                    <TextInput
                        label={"Product"}
                        placeholder={'Product name'}
                        onChangeText={text => setProduct({ ...product, name: text })}
                        value={product.name}
                        style={styles.input} />
                    <TextInput
                        label={"Amount"}
                        placeholder='Amount'
                        onChangeText={text => setProduct({ ...product, amount: text })}
                        value={product.amount}
                        style={styles.input} />
                    <Button icon={"content-save"} mode='contained' onPress={handleSave} title="Save" >
                        Save
                    </ Button>
                </View>
                <View style={styles.containerResult}>
                    <FlatList
                        style={styles.flatList}
                        ItemSeparatorComponent={<View style={styles.separator} />}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={styles.containerShoppingListItem}>
                                <View style={styles.containerShoppingListData}>
                                    <Text style={styles.textShoppingListName}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.textShoppingListAmount}>
                                        {item.amount}
                                    </Text>
                                </View>
                                <IconButton
                                    style={styles.iconButtonDelete}
                                    icon={"delete"}
                                    iconColor={MD3Colors.error50}
                                    onPress={() => handleDelete(item.id, item.name, item.amount)}
                                />
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
        marginTop: 10
    },
    containerResult: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
    },
    containerShoppingListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flatList: {
        width: '90%'
    },
    input: {
        height: 20,
        width: '70%',
        margin: 1,
        borderWidth: 1,
        padding: 8,
        margin: 5
    },
    safeArea: {
        flex: 1
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: 'grey',
        marginVertical: 8,
    },
    textFlatListHeader: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "center"
    },
    textAppBarHeader: {
        fontWeight: 'bold',
    },
    textShoppingListName: {
        fontWeight: 'bold'
    },
    textShoppingListAmount: {
        color: 'grey'
    }
});