// <a href="https://www.flaticon.com/free-icons/euro" title="euro icons">Euro icons created by Icongeek26 - Flaticon</a>

import { useState } from "react"
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import { T7ApiCaller } from "./T7ApiCaller";

export default function T7EuroMuunnin() {

    const [amount, setAmount] = useState(Number);
    const [unit, setUnit] = useState("");
    const [conversion, setConversion] = useState(Number);
    const [rates, setRates] = useState([]);
    const [selectedRate, setSelectedRate] = useState(1.5);
    const apiKey = process.env.T7_API_KEY;
    const pickertestlist = ["EUR", "GBP", "JPY"]

    const calculate = (amount, selectedRate) => {
        let conversionResult = amount * selectedRate;
        setConversion(conversionResult);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerBasic}>
                    <Text style={styles.textIconInfo}>Euro icons created by Icongeek26 - Flaticon</Text>
                    <Text style={styles.textIconInfo}>https://www.flaticon.com/free-icons/euro</Text>
                    <Image
                        source={require('../assets/euro-money.png')}
                        style={styles.image}>
                    </Image>
                    <Text>
                        {conversion}
                    </Text>
                    <View style={styles.containerInput}>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={(value) => setAmount(value)}>
                        </TextInput>
                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={unit}
                            onValueChange={(itemValue, itemIndex) =>
                                setUnit(itemValue)
                            }>
                            {pickertestlist.map((unit, index) => (
                                <Picker.Item key={index} label={unit} value={unit} />
                            ))}
                        </Picker>
                    </View>
                    <View>
                        <Pressable
                            style={styles.buttonConvert}
                            onPress={() => calculate(amount, selectedRate)}>
                            <Text
                                style={styles.textButtonConvert}>
                                Convert
                            </Text>
                        </Pressable>
                    </View>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    buttonConvert: {
        borderRadius: 5,
        height: 40,
        width: 90,
        margin: 5,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBasic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
    },
    containerInput: {
        flexDirection: "row"
    },
    containerResult: {
        paddingTop: 8,
        alignItems: "flex-start",
    },
    image: {
        width: '40%',
        height: undefined,
        aspectRatio: 1
    },
    input: {
        height: 40,
        width: 90,
        margin: 2,
        borderBottomWidth: 2,
        padding: 10,
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
    textButtonConvert: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    textResult: {
        fontSize: 17,
        fontWeight: 'normal'
    },
    textIconInfo: {
        fontSize: 10
    },
    pickerStyle: {
        width: 120
    }
});