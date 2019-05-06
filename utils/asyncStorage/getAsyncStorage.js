import { AsyncStorage } from "react-native";

export const _GetAsyncStorage = async (storage) => {
    try {
        const data = await AsyncStorage.getItem(storage);
        return data;
    } catch (error) {
        console.error(error)
        return (error)
    }
}