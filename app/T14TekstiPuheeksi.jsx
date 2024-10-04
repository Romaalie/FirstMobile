import * as Speech from 'expo-speech';

import { useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

/* DROPDOWN MENU FUNCTIONALITY FOR LANGUAGE SELECTION CREATED WITH THE HELP OF CHATGPT */


export default function T14TekstiPuheeksi() {

    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [inputHeight, setInputHeight] = useState(45);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const languages = [
        { name: 'Arabic', code: 'ar' },
        { name: 'Arabic (Egypt)', code: 'ar-EG' },
        { name: 'Arabic (Saudi Arabia)', code: 'ar-SA' },
        { name: 'Chinese (Simplified)', code: 'zh' },
        { name: 'Chinese (Simplified, PRC)', code: 'zh-CN' },
        { name: 'Chinese (Traditional, Taiwan)', code: 'zh-TW' },
        { name: 'English', code: 'en' },
        { name: 'English (Australia)', code: 'en-AU' },
        { name: 'English (Canada)', code: 'en-CA' },
        { name: 'English (United Kingdom)', code: 'en-GB' },
        { name: 'English (United States)', code: 'en-US' },
        { name: 'Finnish', code: 'fi' },
        { name: 'French', code: 'fr' },
        { name: 'French (Canada)', code: 'fr-CA' },
        { name: 'French (France)', code: 'fr-FR' },
        { name: 'German', code: 'de' },
        { name: 'German (Germany)', code: 'de-DE' },
        { name: 'Italian', code: 'it' },
        { name: 'Italian (Italy)', code: 'it-IT' },
        { name: 'Japanese', code: 'ja' },
        { name: 'Japanese (Japan)', code: 'ja-JP' },
        { name: 'Korean', code: 'ko' },
        { name: 'Korean (South Korea)', code: 'ko-KR' },
        { name: 'Portuguese', code: 'pt' },
        { name: 'Portuguese (Brazil)', code: 'pt-BR' },
        { name: 'Portuguese (Portugal)', code: 'pt-PT' },
        { name: 'Russian', code: 'ru' },
        { name: 'Russian (Russia)', code: 'ru-RU' },
        { name: 'Spanish', code: 'es' },
        { name: 'Spanish (Argentina)', code: 'es-AR' },
        { name: 'Spanish (Mexico)', code: 'es-MX' },
        { name: 'Spanish (Spain)', code: 'es-ES' },
        { name: 'Turkish', code: 'tr' },
        { name: 'Turkish (Turkey)', code: 'tr-TR' }
    ];

    const playMeOffJohnny = () => {
        const theSongOfMyPeople = input;
        Speech.speak(theSongOfMyPeople, { language: selectedLanguage });
    };

    const stopItPlease = () => {
        Speech.stop();
    };

    const handleSelectLanguage = (language) => {
        setSelectedLanguage(language.code);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerBasic}>
                    <TextInput
                        style={[styles.inputBox, { height: inputHeight }]}
                        placeholder='Input thy text so it might be spoken'
                        value={input}
                        onChangeText={setInput}
                        multiline={true}
                        onContentSizeChange={(e) =>
                            setInputHeight(e.nativeEvent.contentSize.height)
                        }>
                    </TextInput>
                    <View style={styles.containerButtons}>
                        <View style={styles.buttonWrapper}>
                            <Button
                                style={styles.button}
                                title='Speak mine words'
                                onPress={playMeOffJohnny} />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button
                                style={styles.button}
                                title="I've heard enough..."
                                onPress={stopItPlease}
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button
                                style={styles.button}
                                title='Make way'
                                onPress={() => {
                                    setInput('')
                                    setInputHeight(45)
                                }} />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Pressable
                                style={styles.buttonLanguage}
                                onPress={toggleDropdown}
                            >
                                <Text style={styles.textButtonLanguage}>
                                    SELECT LANGUAGE
                                </Text>
                            </ Pressable>

                            {isOpen && (
                                <View style={styles.dropdown}>
                                    <ScrollView style={styles.scrollView}>
                                        {languages.map((language) => (
                                            <Pressable
                                                key={language.code}
                                                style={styles.dropdownItem}
                                                onPress={() => handleSelectLanguage(language)}
                                            >
                                                <Text style={styles.dropdownItemText}>{language.name}</Text>
                                            </Pressable>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    buttonWrapper: {
        width: '45%',
        marginHorizontal: 5,
        marginVertical: 10,
    },
    // Some quick styling help from ChatGPT.
    buttonLanguage: {
        backgroundColor: 'dodgerblue',  // Primary button color
        paddingHorizontal: 12,           // Horizontal padding for a better touch area
        paddingVertical: 8,
        borderRadius: 5,                 // Slightly increased border radius for rounded corners
        alignItems: 'center',            // Center the text inside the button
        justifyContent: 'center',        // Center the text inside the button
        elevation: 3,                    // Elevation for Android shadow effect
        shadowColor: '#000',             // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.2,              // Shadow opacity for iOS
        shadowRadius: 4,                 // Shadow blur radius for iOS
    },
    containerBasic: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
    },
    containerButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '80%',
        backgroundColor: '#fff',
        position: 'absolute',
        top: 50,  // Adjust this value to position the dropdown properly
        zIndex: 1,
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownItemText: {
        fontSize: 16,
    },
    inputBox: {
        width: '90%',
        margin: 2,
        borderWidth: 1,
        padding: 10,
    },
    scrollView: {
        maxHeight: 200, // Height limit for scrolling
    },
    safeArea: {
        flex: 1,
    },
    textButtonLanguage: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
