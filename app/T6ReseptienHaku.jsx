import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function T6ReseptienHaku() {

    const [input, setInput] = useState("");
    const [fetchResult, setFetchResult] = useState([]);

    const fetchData = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
            .then(response => {
                if (!response.ok)
                    throw new Error(`Error fetching data: status code ${response.status} ${response.statusText}`)
                return response.json()
            })
            .then(data => {
                console.log("Fetched data:", data);
                setFetchResult(data.meals)
            })
            .catch(error => console.error(error));
    };

    // For developement, testing and debugging
    useEffect(() => {
        console.log("New fetchResult: ", fetchResult)
    }, [fetchResult])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerBasic}>
                    <TextInput
                        style={styles.input}
                        value={input}
                        keyboardType="default"
                        onChangeText={setInput} />
                    <Pressable
                        onPress={() => fetchData(input)}
                        style={styles.buttonFind}>
                        <Text style={styles.textButtonFind}>
                            FIND
                        </Text>
                    </Pressable>
                    <View style={styles.containerResult}>
                        <FlatList
                            data={fetchResult}
                            keyExtractor={(item) => item.idMeal}
                            ItemSeparatorComponent={<View style={styles.separator} />}
                            renderItem={({ item }) => (
                                <View style={styles.containerResult}>
                                    <Text style={styles.textResult}>{item.strMeal}</Text>
                                    <Image
                                        source={{
                                            uri: item.strMealThumb,
                                            method: 'POST',
                                        }}
                                        style={styles.image}></Image>
                                </ View>
                            )}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider >
    )
}

const styles = StyleSheet.create({
    buttonFind: {
        borderRadius: 5,
        height: 40,
        width: 180,
        margin: 5,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBasic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 15,
    },
    containerResult: {
        paddingTop: 8,
        alignItems: "flex-start",
    },
    image: {
        width: '30%',
        height: undefined,
        aspectRatio: 1
    },
    input: {
        height: 40,
        width: 180,
        margin: 2,
        borderWidth: 1,
        padding: 10
    },
    safeArea: {
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        width: '80%',
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 15
    },
    textButtonFind: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    textResult: {
        fontSize: 17,
        fontWeight: 'normal'
    }
});