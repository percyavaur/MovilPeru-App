import { Notifications, Permissions } from "expo";

export const GetTokenNotifications = async (jwt) => {
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

    await fetch('http://35.236.27.209/movilPeru/api/controller/update_Token.php', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jwt: jwt, expoToken: token })
    })
    return token;
};