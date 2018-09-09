import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

export default class Timer extends React.Component {

    convertNumber(n) {
        return n.toString().length < 2 ? '0' + n : n.toString();
    }

    render() {
        let {minutes, seconds, fontSize} = this.props;

        return <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={{fontSize}}>
                    {this.convertNumber(minutes) +  ':' + this.convertNumber(seconds)}
                </Text>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 200,
        borderWidth: 10,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 200,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 10,
        borderRadius: 100
    }
});

Timer.propTypes = {
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    fontSize: PropTypes.number
}
