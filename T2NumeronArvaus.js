import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";


export default function T2NumeronArvaus() {

    /* LOGIC HERE */


    /* LOGIC HERE */

    return (
        <SafeAreaView>
            <View style={styles.containerBasic}>
                <Text style={styles.textResult}>{"Insert answer here. Add answer logic."}</Text>
                <TextInput style={styles.input} inputMode="numeric">

                </TextInput>
                <Button title="Make a guess">

                </Button>
            </View>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: "center"
    },
    buttonWrapper: {
        // Yes, this could probably be done with e.g. justifyContent: "spaced-evenly" in the buttons style.
        margin: 5,
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