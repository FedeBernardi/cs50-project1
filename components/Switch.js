import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';


/**
 * It's an animated switch that allows to set a text for both values
 */
export default class Switch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            leftPosition: new Animated.Value(this.props.value ? 0 : 115)
        };
    }

    /**
     * It triggers the animation and executes the sent callback
     */
    onSwitchToggled() {
        Animated.timing(this.state.leftPosition, {
            toValue: this.props.value ? 115 : 0,
            duration: 200
        }).start();

        this.props.callback();
    }

    render() {
        let {textTrue, textFalse, value} = this.props,
            {leftPosition} = this.state;

        return <TouchableWithoutFeedback onPress={() => this.onSwitchToggled()}>
            <View style={styles.container}>
                <Animated.View style={[styles.selector, {left: leftPosition}]}></Animated.View>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, value && styles.selectedText]}>{textTrue}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, !value && styles.selectedText]}>{textFalse}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 250,
        height: 50,
        backgroundColor: '#F8F8EF',
        borderRadius: 20,
        overflow: 'hidden'
    },
    selector: {
        width: 135,
        height: 50,
        position: 'absolute',
        backgroundColor: '#F5BE96',
        borderRadius: 20,
        borderStyle: 'solid',
        borderColor: '#291226',
        borderWidth: 2
    },
    selectorOnTrue: {
        top: 0,
        left: 0
    },
    selectorOnFalse: {},
    switchTransition: {},
    textContainer: {
        flex: 1,
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'grey'
    },
    selectedText: {
        color: 'black'
    }
});

Switch.propTypes = {
    textTrue: PropTypes.string.isRequired,
    textFalse: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired
}

