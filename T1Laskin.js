import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"

export default function T1Laskin() {

    const [result, setResult] = useState("");
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    const calculatePlus = () => {
        const sum = Number(input1) + Number(input2);
        setResult(sum.toString());
    }

    const calculateMinus = () => {
        const difference = Number(input1) - Number(input2);
        setResult(difference.toString());
    }


    return (
        <SafeAreaView /* apparently this is IOS only: https://reactnative.dev/docs/safeareaview */>
            <View style={styles.containerBasic}>
                <View style={styles.containerResult}>
                    <Text style={styles.textResult}>Result: {result}</Text>
                </View>
                <TextInput
                    style={styles.input}
                    inputMode="numeric"
                    value={input1}
                    onChangeText={setInput1}>
                </TextInput>
                <TextInput
                    style={styles.input}
                    inputMode="numeric"
                    value={input2}
                    onChangeText={setInput2}>
                </TextInput>
                <View style={styles.buttons}>
                    <View style={styles.buttonWrapper}>
                        <Button
                            title="+"
                            onPress={calculatePlus}
                        ></Button>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button
                         title="-"
                         onPress={calculateMinus} ></Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: "center"
    },
    buttonWrapper: {
        // Yes, this could probably be done with e.g. justifyContent: "spaced-evenly" in the buttons style.
        marginHorizontal: 10,
    },
    containerBasic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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
    textResult: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});