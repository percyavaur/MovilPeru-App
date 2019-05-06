import { AsyncStorage } from "react-native";

export const _SetAsyncStorage = async (storage, data) => {
    try {
        await AsyncStorage.setItem(storage, data);
    } catch (error) {
        console.error(error)
    }
}