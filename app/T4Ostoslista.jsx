import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function T4Ostoslista() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const handlePress = (buttonKey) => {

        switch (buttonKey) {
            case "add":
                if (todo.trim() !== "") {
                    let newTodoEntry = { id: Date.now().toString(), todo: todo }
                    setTodos([newTodoEntry, ...todos])
                    setTodo("");
                }
                break;
            case "clear":
                setTodos([]);
                setTodo("");
                break;
        }
    }
    console.log("Todos: ", todos);
    console.log("Todo: ", todo);


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerBasic}>
                    <TextInput
                        style={styles.input}
                        value={todo}
                        onChangeText={text => setTodo(text)} />
                    <View style={styles.containerButtons}>
                        <Pressable
                            style={styles.buttonRounded}
                            onPress={() => handlePress("add")}>
                            <Text style={styles.textButtons}>
                                Add
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.buttonRounded}
                            onPress={() => handlePress("clear")}>
                            <Text style={styles.textButtons}>
                                Clear
                            </Text>
                        </Pressable>
                    </View>
                    <View style={styles.containerList}>
                        <Text style={styles.textList}>
                            Shopping List
                        </Text>
                        <FlatList
                            data={todos}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <Text style={styles.textResult}>{item.todo}</Text>}
                            ListEmptyComponent={<Text></Text>}>
                        </FlatList>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )

}

const styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
        margin: 15,
        alignContent: 'center',
        justifyContent: "space-around"
    },
    containerBasic: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 40
    },
    containerList: {
        marginTop: 40,
        alignItems: "center"
    },
    input: {
        height: 40,
        width: 180,
        margin: 2,
        borderWidth: 1,
        padding: 10
    },
    buttonRounded: {
        borderRadius: 5,
        height: 40,
        width: 60,
        margin: 5,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textResult: {
        fontSize: 20
    },
    textButtons: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    textList: {
        color: 'blue',
        fontSize: 25,
        fontWeight: 'bold'
    },
    safeArea: {
        flex: 1,
    }
});