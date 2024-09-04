import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";


export default function T5LaskinHistoriallaLaskin() {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState([]);

    const navigation = useNavigation();

    const calculateResult = (operation) => {

        const number1 = parseFloat(input1);
        const number2 = parseFloat(input2);

        if (!isNaN(number1) && !isNaN(number2)) {
            let resultValue;
            let calculationForHistory;
            switch (operation) {
                case "add":
                    resultValue = number1 + number2;
                    calculationForHistory = `${number1} + ${number2} = ${resultValue}`;
                    break;
                case "subtract":
                    resultValue = number1 - number2;
                    calculationForHistory = `${number1} - ${number2} = ${resultValue}`;
                    break;
                default:
                    setResult("Invalid operation");
                    return;
            }
            setResult(resultValue.toString());
            const newHistoryItem = { id: Date.now().toString(), calculation: calculationForHistory };
            setHistory([newHistoryItem, ...history]);
            setInput1("");
            setInput2("");
        } else {
            setResult("Invalid input");
            setInput1("");
            setInput2("");
        }
    }
    console.log(history);

    const showHistory = () => {
        navigation.navigate('T5LaskinHistoriallaHistoria', { history })
    }

    return (
        < SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerBasic}>
                    <View style={styles.containerResult}>
                        <Text style={styles.textResult}>
                            Result: {result}
                        </Text>
                    </View>
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
                            <Text style={styles.textSymbolButtons}>
                                +
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => calculateResult("subtract")}
                            style={styles.buttonCalculator}>
                            <Text style={styles.textSymbolButtons}>
                                -
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => showHistory()}
                            style={styles.buttonCalculatorHistory}>
                            <Text style={styles.textHistoryButton}>
                                History
                            </Text>
                        </Pressable>
                    </View>
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
    buttonCalculatorHistory: {
        borderRadius: 5,
        height: 40,
        width: 60,
        margin: 5,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textResult: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textSymbolButtons: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textHistoryButton: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    safeArea: {
        flex: 1,
    }
});