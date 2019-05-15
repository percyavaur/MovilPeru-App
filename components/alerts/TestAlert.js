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
        this.setState({ show: false })
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Show" onPress={this.handleOpen} />
                <SCLAlert
                    theme="danger"
                    show={this.state.show}
                    title="Lorem"
                    subtitle="Lorem ipsum dolor"
                    onRequestClose={() => { }}
                >
                    <SCLAlertButton theme="danger" onPress={this.handleClose}>Done</SCLAlertButton>
                </SCLAlert>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})