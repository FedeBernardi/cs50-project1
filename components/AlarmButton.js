import React from 'react';
import { Text, View, TouchableWithoutFeedback, ImageBackground, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';

import images from '../utils/images';

export default class AlarmButton extends React.Component {

    render() {
        let {callback} = this.props;

        return <TouchableWithoutFeedback onPress={callback}>
            <View style={styles.container}>
                <ImageBackground source={images.timer} style={styles.background}>
                    <View style={styles.innerContainer}>    
                        <Text style={styles.text}>Stop Alarm</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>;
    }

}

AlarmButton.propTypes = {
    callback: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 200,
        borderRadius: 100
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 200
    },
    background: {
        width: '100%',
        height: '100%'
    },
    text: {
        fontSize: 30
    }
});
