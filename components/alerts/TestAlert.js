import React from 'react'
import {
    View,
    Button,
    StyleSheet
} from 'react-native'

import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'

export default class TestAlert extends React.Component {
    state = {
        show: false
    }

    handleOpen = () => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.props.onClose(false);
        this.setState({ show: false });
    }

    render() {

        const { show, theme, title, content } = this.props;

        return (
            <View>
                <SCLAlert
                    theme={theme}
                    show={show}
                    title={title}
                    subtitle={content}
                    overlayStyle={{ height: "150%" }}
                    subtitleContainerStyle={{}}
                    onRequestClose={() => { }}
                >
                    <SCLAlertButton theme={theme} onPress={this.handleClose}>Ok</SCLAlertButton>
                </SCLAlert>
            </View >
        )
    }
}