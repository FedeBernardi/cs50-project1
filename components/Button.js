import React from 'react';
import { TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export const BUTTON_SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium'
}

export default class Button extends React.Component {

    render() {
        let {text, callback, size, extraStyles} = this.props,
            styles = size === BUTTON_SIZES.MEDIUM ? stylesMedium : stylesSmall;

        return <TouchableNativeFeedback onPress={callback}>
            <View style={[styles.container, extraStyles]}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableNativeFeedback>;
    }

}

const stylesMedium = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#F5BE96'
    },
    text: {
        fontSize: 30,
        color: '#291226'
    }
});

const stylesSmall = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 25,
        borderRadius: 50,
        backgroundColor: '#F5BE96'
    },
    text: {
        fontSize: 20,
        color: '#291226'
    }
});

Button.propTypes = {
    text: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    size: PropTypes.string.isRequired,
    extraStyles: PropTypes.node
}
