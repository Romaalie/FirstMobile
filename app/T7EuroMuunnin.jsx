import { useState, useEffect } from "react"
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import { T7ApiCaller } from "./T7ApiCaller";

export default function T7EuroMuunnin() {

    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("");
    const [conversion, setConversion] = useState("");
    const [rates, setRates] = useState({});
    const [selectedRate, setSelectedRate] = useState(Number);
    const apiKey = process.env.EXPO_PUBLIC_T7_API_KEY;
    console.log("Api key in main component: " + apiKey)

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const data = await T7ApiCaller(apiKey);
                console.log("Fetched data:", data);
                if (data && data.rates) {
                    setRates(data.rates)
                }
                else {
                    console.error("There is no data or data does not have rates", data)
                }
            }
            catch (error) {
                console.error("Error fetching rates (T7Euromuunnin):", error);
            }
        };
        fetchRates();
    }, []);

    const calculate = () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && selectedRate !== null) {
            let conversionResult = amount * selectedRate;
            setConversion(conversionResult);
        } else {
            setConversion("Invalid amount or rate");
        }
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
                            onValueChange={(itemValue, itemIndex) => {
                                setUnit(itemValue);
                                setSelectedRate(rates[itemValue]);
                            }}>
                            {Object.keys(rates).map((key, index) => (
                                <Picker.Item key={index} label={key} value={key} />
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