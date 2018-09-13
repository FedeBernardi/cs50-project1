import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

import images from '../utils/images';

export default class Timer extends React.Component {

    convertNumber(n) {
        return n.toString().length < 2 ? '0' + n : n.toString();
    }

    render() {
        let {minutes, seconds, fontSize, showTime} = this.props;

        return <View style={styles.container}>
            <ImageBackground source={images.timer} style={styles.background}>
                <View style={styles.innerContainer}>
                    <Text style={{fontSize}}>
                        {showTime && this.convertNumber(minutes) +  ':' + this.convertNumber(seconds)}
                        {!showTime && '-- : --'}
                    </Text>
                </View>
            </ImageBackground>
        </View>;
    }
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
    }
});

Timer.propTypes = {
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
    showTime: PropTypes.bool.isRequired
}
