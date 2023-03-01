import React from 'react';

import {
    View,
    TouchableWithoutFeedback,
    Modal,
    TouchableOpacity,
} from 'react-native';

import styles from '../modals/ModalStyles';

export default class PopupModalComponent extends React.PureComponent {

    state = {
        visible: false,
        extras: {},
    }
    
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.visible}
                onRequestClose={this.close}>
                <TouchableOpacity 
                    activeOpacity={1}
                    style={styles.modalWrapper}
                    onPress={this.close}>
                    <TouchableWithoutFeedback>
                        {this.state.visible ? this.renderContent(this.state.extras) : <View/> }
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }

    // renderContent = () => <View /> // Overload this when inheriting this Component

    show = (extras = {}) => {
        this.setState({visible: true, extras: extras});
    }

    close = () => {
        this.setState({visible: false});
    }

}

