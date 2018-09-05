import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Stylesheet } from 'react-native';

export default class Timer extends React.Component {

    convertNumber(n) {
        return n.toString().length < 2 ? '0' + n : n.toString();
    }

    render() {
        let {minutes, seconds} = this.props;

        return <View>
            <Text>{this.convertNumber(minutes) +  ':' + this.convertNumber(seconds)}</Text>
        </View>;
    }
}

Timer.propTypes = {
    minutes: PropTypes.number,
    seconds: PropTypes.number
}
