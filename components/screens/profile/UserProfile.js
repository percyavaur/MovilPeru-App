import React from "react";
import { View, Dimensions, Image, Text, TouchableHighlight, YellowBox } from "react-native";
import { Button } from "native-base";
import { ImagePicker, Permissions, Constants } from 'expo';
import RF from "react-native-responsive-fontsize";
import * as firebase from 'firebase';
import uuid from 'uuid';
const { width, height } = Dimensions.get('window');

YellowBox.ignoreWarnings(['Setting a timer']);
console.ignoredYellowBox = ['Setting a timer'];

export default class UserProfile extends React.Component {

    state = {
        image: null,
        uploading: false,
    };

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
        });
        if (!result.cancelled) {
            this._handleImagePicked(result);
            this.setState({ image: result.uri });
        }
    };

    _handleImagePicked = async pickerResult => {
        try {
            this.props.uploading(true);

            if (!pickerResult.cancelled) {
                uploadUrl = await uploadImageAsync(pickerResult.uri);
                this.props.handleImage(uploadUrl);
                // this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };


    render() {

        const { image } = this.props;
        return (
            <View style={{ width: "100%" }}>
                <TouchableHighlight style={{
                    width: width * 0.5,
                    height: width * 0.5,
                    borderRadius: width * 0.5 / 2,
                    backgroundColor: 'white',
                    zIndex: 2,
                    marginTop: -width * 0.25,
                    top: width * 0.3,
                    marginLeft: width * 0.25
                }}
                    onPress={this._pickImage}>
                    <Image
                        style={{ width: width * 0.5, height: width * 0.5, flex: 1, borderRadius: width * 0.5 / 2, }}
                        source={{ uri: image ? image : 'https://firebasestorage.googleapis.com/v0/b/movilperu.appspot.com/o/default%2Fpersona2.png?alt=media&token=185c6cec-d5ef-4d24-a8b3-9ed123d814c8' }}
                    />
                </TouchableHighlight>
                <View style={{
                    backgroundColor: "white",
                    borderRadius: 15,
                    marginHorizontal: "5%",
                    shadowColor: '#000',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                }}>
                    <View style={{ display: "flex", flexDirection: "column", paddingTop: width * 0.35 }}>
                        <View style={{ display: "flex", flexDirection: "row", position: "relative" }}>
                            <Button style={{
                                backgroundColor: "#11cdef",
                                position: "absolute",
                                left: width * 0.07,
                                width: width * 0.25,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 7,
                                height: width * 0.1,
                            }}>
                                <Text style={{ color: "white" }}>Connect</Text>
                            </Button>
                            <Button style={{
                                backgroundColor: "#172b4d",
                                position: "absolute",
                                right: width * 0.07,
                                width: width * 0.25,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 7,
                                height: width * 0.1,
                            }}>
                                <Text style={{ color: "white" }}>Message</Text>
                            </Button>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", marginTop: width * 0.175, position: "relative" }}>
                            <View style={{
                                display: "flex", flexDirection: "column",
                                left: width * 0.08,
                                alignItems: "center",
                                justifyContent: "center",
                                position: "absolute",
                            }}>
                                <Text
                                    style={{
                                        color: "#525f8b",
                                        fontFamily: "NeoSans",
                                        fontSize: RF(2.5),
                                    }}>22</Text>
                                <Text
                                    style={{
                                        color: "#b9bbd1",
                                        fontFamily: "NeoSans",
                                        fontSize: RF(2.5),
                                    }}>Friends</Text>
                            </View>
                            <View style={{
                                display: "flex", flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                left: width * 0.38,
                            }}>
                                <Text style={{
                                    color: "#525f8b",
                                    fontFamily: "NeoSans",
                                    fontSize: RF(2.5),
                                }}>100</Text>
                                <Text style={{
                                    color: "#b9bbd1",
                                    fontFamily: "NeoSans",
                                    fontSize: RF(2.5),
                                }}>Photos</Text>
                            </View>
                            <View style={{
                                display: "flex", flexDirection: "column",
                                right: width * 0.08,
                                alignItems: "center",
                                position: "absolute"
                            }}>
                                <Text style={{
                                    color: "#525f8b",
                                    fontFamily: "NeoSans",
                                    fontSize: RF(2.5),
                                }}>89</Text>
                                <Text style={{
                                    color: "#b9bbd1",
                                    fontFamily: "NeoSans",
                                    fontSize: RF(2.5),
                                }}>Comments</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: RF(2) }}>
                            <Text style={{
                                color: "#38325d",
                                fontFamily: "NeoSans",
                                fontSize: RF(2.7),
                                marginVertical: RF(2),
                                fontWeight: "bold"
                            }}>{this.props.firstname} {this.props.lastname}</Text>
                            <Text style={{
                                color: "#38325d",
                                fontFamily: "NeoSans",
                                fontSize: RF(2.7),
                                marginVertical: RF(2)
                            }}>Software Developer</Text>
                            <Text style={{
                                color: "#38325d",
                                fontFamily: "NeoSans",
                                fontSize: RF(2.7),
                                marginVertical: RF(2)
                            }}>Universidad Ricardo Palma</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: "#b9bbd1", width: width * 0.8, }} />
                            <Text style={{
                                color: "#5e8cf2",
                                fontFamily: "NeoSans",
                                fontSize: RF(3),
                                marginVertical: RF(2)
                            }}>Show More</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const ref = firebase
        .storage()
        .ref("users/")
        .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it

    return await snapshot.ref.getDownloadURL();
}