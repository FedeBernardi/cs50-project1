import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, Stylesheet } from 'react-native';

const WORKING_TEXT = "Time to work buddy!",
      RESTING_TEXT = "You can relax now :)";

export default class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: {minutes: props.startingTime, seconds: 0},
            isTicking: false,
            isWork: true
        }
    }

    timerToggle() {
        let {isTicking} = this.state;
        this.setState({...this.state, isTicking: !isTicking});
        if (!isTicking) {
            this.kickInterval();
        } else {
            this.destroyInterval();
        }

        console.log(isTicking);
    }

    kickInterval() {
        this.interval = setInterval(() => {
            let {minutes, seconds} = this.state.currentTime;
            seconds--;

            if (seconds === -1) {
                seconds = 59;
                minutes--;
            }

            this.setState({...this.state, currentTime: {minutes, seconds}})

            console.log(minutes, seconds);
        }, 1000);
    }

    destroyInterval() {
        clearInterval(this.interval);
    }

    convertNumber(n) {
        return n.toString().length < 2 ? '0' + n : n.toString();
    }

    render() {
        let {minutes, seconds} = this.state.currentTime,
            {isTicking, isWork} = this.state;

        return <View>
            <View>
                {isTicking && <Text>{isWork ? WORKING_TEXT : RESTING_TEXT}</Text>}
                <Text>{this.convertNumber(minutes) +  ':' + this.convertNumber(seconds)}</Text>
            </View>
            <View>
                <Button
                    title={isTicking ? 'Stop' : 'Start'}
                    onPress={() => this.timerToggle()}>
                </Button>
            </View>
        </View>;
    }
}

Timer.propTypes = {
    startingTime: PropTypes.number
}
