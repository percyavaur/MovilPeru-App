import { Notifications, Permissions } from "expo";

export const GetTokenNotifications = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        return alert("You have to enable notification permissions in settings");
    }
    const token = await Notifications.getExpoPushTokenAsync();
    return token;
};