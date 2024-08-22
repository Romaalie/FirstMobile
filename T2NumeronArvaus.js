import { useEffect, useState } from "react";
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";


export default function T2NumeronArvaus() {

    /* LOGIC HERE */

    const [correctNumber, setCorrectNumber] = useState("");
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [counter, setCounter] = useState(0);
    const resetNumber = Math.floor(Math.random() * 100) + 1

    //Initialize the number on first render
    useEffect(() => {
        setCorrectNumber(resetNumber)
    }, [])

    const checkAnswer = () => {
        if (!input && counter > 20) {
            setResponse("Misclick? Tired of guessing?")
        }
        else if (!input) {
            setResponse("I won't count that one but put a bloody number in it")
        }
        else if (input == correctNumber && counter == 0) {
            Alert.alert(
                'Holy macaroni!',
                'You guessed the number on the first try! Go put in a lottery ticket right now!!',
                [{ text: 'ok' }]
            )
            setCounter(0);
            setCorrectNumber(resetNumber);
            setResponse("Care to guess again?");
            setInput("");
        }
        else if (input == correctNumber) {
            Alert.alert(
                'You did it old chap!',
                'You guessed the number in ' + counter + ' guesses',
                [{ text: 'ok' }]
            )
            setCounter(0);
            setCorrectNumber(resetNumber);
            setResponse("Care to guess again?");
            setInput("");
        }
        else if (input < correctNumber) {
            setResponse("Your guess " + input + " is too low")
            setCounter(counter + 1);
            setInput("");
        }
        else if (input > correctNumber) {
            setResponse("Your guess " + input + " is too high")
            setCounter(counter + 1);
            setInput("");
        }


    }
    /* LOGIC HERE END */

    return (
        <SafeAreaView>
            <View style={styles.containerBasic}>
                <Text style={styles.textResult}>{response}</Text>
                <TextInput
                    style={styles.input}
                    inputMode="numeric"
                    value={input}
                    onChangeText={setInput}
                >
                </TextInput>
                <Button
                    title="Make guess"
                    onPress={checkAnswer}>

                </Button>
            </View>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    containerBasic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        height: 40,
        width: 50,
        margin: 8,
        borderWidth: 1,
        padding: 10
    },
    textResult: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: 5
    }
});