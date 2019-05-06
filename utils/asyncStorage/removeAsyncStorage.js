import { AsyncStorage } from "react-native";

export const _RemoveStorage = async (storage) => {
    try {
        await AsyncStorage.removeItem(storage);
    } catch (error) {
        console.error(error)
        return "error";
    }
}