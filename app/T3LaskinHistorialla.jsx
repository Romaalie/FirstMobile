import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function T3LaskinHistorialla() {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [result, setResult] = useState("");

    const calculateResult = (operation) => {

        const number1 = parseFloat(input1);
        const number2 = parseFloat(input2);

        let result;

        if (!isNaN(number1) && !isNaN(number2)) {
            switch (operation) {
                case "add":
                    result = number1 + number2;
                    setResult(result.toString());
                    // add setHistory
                    break;
                case "subtract":
                    result = number1 - number2;
                    setResult(result.toString());
                    // add setHistory
                    break;
                default:
                    setResult("Invalid operation");
                    break;
            }
            setInput1("");
            setInput2("");
        } else {
            setResult("Invalid input");
            setInput1("");
            setInput2("");
        }
    }

    return (
        < SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerBasic}>
                    <View style={styles.containerResult}>
                        <Text style={styles.textResult}>
                            Result: {result}
                        </Text>
                        <TextInput
                            style={styles.input}
                            inputMode="numeric"
                            value={input1}
                            onChangeText={setInput1}
                        />
                        <TextInput
                            style={styles.input}
                            inputMode="numeric"
                            value={input2}
                            onChangeText={setInput2}
                        />
                        <View style={styles.containerButtons}>
                            <Pressable
                                onPress={() => calculateResult("add")}
                                style={styles.buttonCalculator}>
                                <Text style={styles.textButtons}>
                                    +
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => calculateResult("subtract")}
                                style={styles.buttonCalculator}
                            >
                                <Text style={styles.textButtons}>
                                    -
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View >
                    {/*For flatlist history*/}
                    <FlatList>

                    </FlatList>

                </View>
            </SafeAreaView>
        </ SafeAreaProvider >
    )
}

const styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
        margin: 10,
        alignContent: 'center',
        justifyContent: "space-around"
    },
    containerBasic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "top"
    },
    containerResult: {
        alignItems: "center"
    },
    input: {
        height: 40,
        width: 180,
        margin: 2,
        borderWidth: 1,
        padding: 10
    },
    buttonCalculator: {
        borderRadius: 5,
        height: 40,
        width: 40,
        margin: 5,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textResult: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textButtons: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    safeArea: {
        flex: 1,
    }
});