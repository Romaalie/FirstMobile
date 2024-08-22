import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"

export default function T1Laskin() {

    const [answer, setAnswer] = useState("");
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");



    return (
        <SafeAreaView /* apparently this is IOS only: https://reactnative.dev/docs/safeareaview */>
            <View style={styles.containerBasic}>
                <View style={styles.containerResult}>
                    <Text style={styles.textResult}>Result: {answer}</Text>
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
                        <Button title="+"></Button>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button title="-" ></Button>
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
        // Yes, this could be done with e.g. justifyContent: "spaced-evenly" in the buttons style.
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