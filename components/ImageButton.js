import React from 'react';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Animated
} from 'react-native';
import PropTypes from 'prop-types';

export const BUTTON_IMAGE_SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium'
}

export default class ImageButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            color: new Animated.Value(0)
        }
    }

    onPressHandler() {
        Animated.sequence([
            Animated.timing(this.state.color, {
                delay: 1,
                duration: 100,
                toValue: 1
            }),
            Animated.timing(this.state.color, {
                delay: 1,
                duration: 100,
                toValue: 0
            })
        ]).start();

        this.props.callback();
    }

    render() {
        const interpolatedColor = this.state.color.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)']
        });

        let {imgSource, size} = this.props;
            stylesContainer = size === BUTTON_IMAGE_SIZES.MEDIUM 
                ? styles.containerMedium 
                : styles.containerSmall;

        return <TouchableWithoutFeedback onPress={() => this.onPressHandler()}>
            <View style={stylesContainer}>
                <Animated.Image style={[styles.image, {tintColor: interpolatedColor}]} source={imgSource} />
            </View>
        </TouchableWithoutFeedback>;
    }
}

ImageButton.propType = {
    imgSource: PropTypes.any.isRequired,
    size: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    containerMedium: {
        width: 200,
        height: 100
    },
    containerSmall: {
        width: 100,
        height: 50
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    }
});
