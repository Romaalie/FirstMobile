import { useRoute } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function T5LaskinHistoriallaHistoria() {
    const route = useRoute();
    const { history } = route.params;

    return (
        < SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerBasic}>
                    <Text style={styles.textResult}>
                        History
                    </Text>
                    <FlatList
                        data={history}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Text>{item.calculation}</Text>}
                        ListEmptyComponent={<Text>No history</Text>}
                    />
                </View>
            </SafeAreaView>
        </ SafeAreaProvider >
    )
}

const styles = StyleSheet.create({
    containerBasic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "top"
    },
    textResult: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    safeArea: {
        flex: 1,
    }
});