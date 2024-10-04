import * as Contacts from 'expo-contacts';

import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function T13Kontakti() {

    const [contacts, setContacts] = useState([]);


    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync(
                { fields: [Contacts.Fields.PhoneNumbers] }
            );
            setContacts(data);
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerBasic}>
                    <FlatList
                        data={contacts}
                        renderItem={({ item }) =>
                            <View style={styles.containerResult}>
                                <Text>
                                    {item.firstName} {item.lastName} {item.phoneNumbers[0].number}
                                </Text>
                            </View>
                        } />
                </View>
                <View style={styles.containerBasic}>
                    <Button
                        style={styles.button}
                        title='GET CONTACTS'
                        onPress={getContacts} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '50%',
    },
    containerBasic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 20
    },
    containerResult: {
        alignItems: "center"
    },
    safeArea: {
        flex: 1,
    }
});
